import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { compare, encrypt } from "../middleware/authMiddleware";
import { AuthRequest } from "../types/customReq";

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

export const profileLogged = (req : AuthRequest , res : Response)=>{
  try{
    return res.status(200).json({
      message : "Profile" ,
      user : req.user
    })
  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}