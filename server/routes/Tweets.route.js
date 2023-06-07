import { Router } from 'express'
import { createTweet, getTweet, getTweets } from '../controllers/Tweets.controller.js'

const router = Router()

router.post('/', createTweet)
router.get('/', getTweets)
router.get('/:id', getTweet)

export default router