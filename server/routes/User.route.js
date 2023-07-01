import { Router } from "express";
import { createUser, getAllUsers, getUser, getUsersByQuery, handleFollowUser, updateUser } from "../controllers/User.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/query', getUsersByQuery)
router.get('/:username', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.put('/follow', handleFollowUser)
export default router