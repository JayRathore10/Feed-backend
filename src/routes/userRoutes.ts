import { Router } from "express";
import { editPost, giveLike, homePage, loginPage, loginUser, logoutUser, makePost, profileLogged, registerUsers, updatePost } from "../controllers/userController";
import { isLogIn } from "../middleware/isLoginMiddleware";

export const userRouter = Router();

userRouter.get("/" , homePage);
userRouter.get("/profile", isLogIn, profileLogged);
userRouter.post("/post" , isLogIn , makePost);
userRouter.get("/like/:id" , isLogIn , giveLike);
userRouter.get("/edit/:id" , editPost);
userRouter.post("/update/:id"  , updatePost);