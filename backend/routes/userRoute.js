import express from "express";
import { getUserInfo, loginUser, registerUser, updateUserInfo } from "../controllers/userController.js";

const userRouter = express.Router()
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/info", getUserInfo);
userRouter.put("/update", updateUserInfo);

export default userRouter;