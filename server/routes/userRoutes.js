import express from "express";
import { register, setAvatar } from "../controllers/usersController.js";
import { login } from "../controllers/usersController.js";
import { getAllUsers } from "../controllers/usersController.js";




const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);
export default router;