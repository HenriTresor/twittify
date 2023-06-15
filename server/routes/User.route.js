import { Router } from "express";
import { createUser, getAllUsers, getUser, handleFollowUser } from "../controllers/User.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/:username', getUser)
router.post('/', createUser)
router.put('/follow', handleFollowUser)
export default router