import { Router } from "express";
import { loginUser, logoutUser, registerUsers } from "../controllers/authController";


export const authRouter = Router();

authRouter.post("/register", registerUsers);
authRouter.post("/login" , loginUser);
authRouter.get("/logout" , logoutUser);