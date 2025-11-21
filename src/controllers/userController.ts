import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { compare, encrypt } from "../middleware/authMiddleware";
import { AuthRequest } from "../types/customReq";
import { responseEncoding } from "axios";
import { postModel } from "../models/postModel";

export const homePage = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Home Page",
    })
  } catch (err) {
    return res.status(500).json(
      {
        meesage: err
      }
    )
  }
}


export const registerUsers = async (req: Request, res: Response) => {
  try {
    const { userName, name, email, age, password } = req.body;

    if (!userName || !name || !email || !age || !password) {
      return res.status(404).json({
        message: "Something went wrong"
      })
    }

    const foundUser = await userModel.findOne({ email });

    if (foundUser) {
      return res.status(500).json({
        message: "User  already found"
      })
    }

    const hashedPassword = await encrypt(password);

    const newUser = await userModel.create({
      userName,
      name,
      email,
      age,
      password: hashedPassword
    });

    const token = jwt.sign({ email, userId: newUser._id }, "secure");

    res.cookie("token", token);

    return res.status(200).json({
      message: "User Successfully registered",
      newUser
    })
  } catch (err) {
    return res.status(500).json({
      message: err
    })
  }
}

export const loginUser = async (req :Request, res : Response)=>{
  try{
    const {email  , password}  = req.body;

    const user = await userModel.findOne({email});

    if(!user){
      return res.status(500).json({
        message : "Something went wrong"
      })
    } 

    const result = compare(password , user.password);

    if(!result){
      return res.status(500).json({
        message : "Something went wrong"
      })
    }

    const token = jwt.sign({email , userId : user._id} , "secure");
    res.cookie("token" , token);

    return res.status(200).json({
      message : "Successfully Login"
    })

  }catch(err){
    return res.status(500).json({
      messgae : err
    })
  }
}

export const logoutUser = async (req : Request  , res : Response)=>{
  try{
    res.cookie("token", "");
    return res.status(200).json({
      message : "Logout Successfully"
    })
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}

export const profileLogged = async (req : AuthRequest , res : Response)=>{
  try{

    const user = await userModel.findOne({email : req.user?.email});

    if(!user){
      return res.status(401).json({
        messgae : "User not found"
      })
    }

    await user.populate("posts");

    const posts = await postModel.findOne({user: user._id})

    if(!posts){
      return res.status(401).json({
        message : "Not Found"
      })
    }

    return res.status(200).json({
      message : "Profile" ,
      user ,
      posts : user.posts
    })
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}

export const loginPage = (req : Request , res : Response)=>{
  return res.send("hello");
}

export const makePost = async (req : AuthRequest , res :Response)=>{
  try{
    const user = await userModel.findOne({email : req.user?.email});

    const {content} = req.body;

    // not needed checked through isLoginMiddleware
    if(!user && !content){
      return res.status(401).json({
        message : "Something went wrong"
      })
    }

    const post = await postModel.create({
      user : user?._id, 
      content : content
    });
    
    user?.posts.push(post._id);
    await user?.save();

    return res.status(200).json({
      message : "New post created"  , 
      content 
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}