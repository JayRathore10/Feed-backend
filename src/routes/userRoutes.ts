import { Router } from "express";
import { homePage, loginUser, logoutUser, profileLogged, registerUsers } from "../controllers/userController";
import { isLogIn } from "../middleware/isLoginMiddleware";

export const userRouter = Router();

userRouter.get("/" , homePage);
userRouter.post("/register" , registerUsers);
userRouter.post("/login" , loginUser);
userRouter.get("/logout" , logoutUser);
userRouter.get("/profile", isLogIn, profileLogged);