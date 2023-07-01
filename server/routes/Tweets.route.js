import { Router } from 'express'
import multer from 'multer'
import {
    LikeTweet,
    createReply,
    createTweet,
    getTweet,
    getTweets,
    getTweetsByUser
} from '../controllers/Tweets.controller.js'

const upload = multer({ dest: './uploads' })
const router = Router()

router.post('/', upload.single(`post_content[post_image]`), createTweet)
router.get('/', getTweets)
router.get('/:id', getTweet)
router.put('/reply', createReply)
router.put('/like', LikeTweet)
router.get('/user/:id', getTweetsByUser)

export default router