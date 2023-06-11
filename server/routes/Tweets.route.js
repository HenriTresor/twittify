import { Router } from 'express'
import {
    LikeTweet,
    createReply,
    createTweet,
    getTweet,
    getTweets
} from '../controllers/Tweets.controller.js'

const router = Router()

router.post('/', createTweet)
router.get('/', getTweets)
router.get('/:id', getTweet)
router.put('/reply', createReply)
router.put('/like', LikeTweet)

export default router