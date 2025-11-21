import { Router } from "express";
import { homePage, loginPage, loginUser, logoutUser, makePost, profileLogged, registerUsers } from "../controllers/userController";
import { isLogIn } from "../middleware/isLoginMiddleware";

export const userRouter = Router();

userRouter.get("/" , homePage);
userRouter.post("/register" , registerUsers);
userRouter.get("/login" , loginPage);
userRouter.post("/login" , loginUser);
userRouter.get("/logout" , logoutUser);
userRouter.get("/profile", isLogIn, profileLogged);
userRouter.post("/post" , isLogIn , makePost);