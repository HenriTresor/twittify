import { Router } from "express";
import { createUser, getAllUsers, getUser } from "../controllers/User.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/:username', getUser)
router.post('/', createUser)
export default router