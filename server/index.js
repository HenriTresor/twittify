import express from 'express'
import http from 'http'
import connectDB from './configs/db.config.js'
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routes/User.route.js'
import AuthRouter from './routes/Auth.route.js'
import TweetRouter from './routes/Tweets.route.js'
import cors from 'cors'
import { config } from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import { Server } from 'socket.io'

config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const client_uri = 'http://localhost:5173'
const app = express()
app.use(cookieParser())
app.use(session({
    name: 'my-session',
    secret: 'my-secret'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: `*`,
    credentials: true
}))
const server = http.createServer(app)
const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/twitter'

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

app.use(express.json())
connectDB(mongoURI)
    .then(() => {
        console.log('connected to db')
    }).then(() => {
        server.listen(PORT, () => {
            try {

                console.log(`listening on port ${PORT}`)
            } catch (error) {
                console.log('error starting server', err.message);
            }
        })
    }).catch((err) => console.log('error connecting to database', err.message))


const rootRoute = '/api/v1'
app.use(`${rootRoute}/users`, userRouter)
app.use(`${rootRoute}/auth`, AuthRouter)
app.use(`${rootRoute}/tweets`, TweetRouter)

app.all('*', (req, res) => {
    res.status(400).json({ message: 'resource not found', status: false })
})
app.use(() => errorHandler())



global.onlineUsers = []
io.on('connection', socket => {
    console.log('connection established:', socket.id)

    socket.on('add user', (user) => {
        onlineUsers = [...onlineUsers, { ...user, socketId: socket.id }]
        console.log('user added')
    })

    socket.on('add new like', (tweet, liker) => {
        // console.log(tweet, liker)
        const author = onlineUsers.find(user => user._id === tweet?.author?._id)
        if (author) socket.to(author.socketId).emit('new like', tweet, liker)
    })

    socket.on('add new comment', (tweet, commentor, reply) => {
        const author = onlineUsers.find(user => user._id === tweet?.author?._id)
        if (author) socket.to(author.socketId).emit('new comment', tweet, commentor, reply)
    })
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        console.log('disconnect:', socket.id)
    })
})