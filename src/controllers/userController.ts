import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { compare, encrypt } from "../middleware/authMiddleware";
import { AuthRequest } from '../types/customReq';
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

export const giveLike =  async (req : AuthRequest, res : Response)=>{
  try{
    const post = await postModel.findOne({_id : req.params.id}).populate("user");

    
    if(!post){
      return res.status(401).json({
        message : "Not Found"
      })
    }
    
    if(post.likes.indexOf(req.user?.userId) === -1){
      post.likes.push(req.user?.userId);
    }else{
      post.likes.splice(post.likes.indexOf(req.user?.id) , 1);
    }

    await post.save();

    return res.status(200).json({
      message : "Post Liked" , 
      likes : post.likes ,
      length : post.likes.length
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}

export const editPost = async (req : Request,  res : Response)=>{
  try{
    const post = await postModel.findOne({_id : req.params.id }).populate("user");

    if(!post){
      return res.status(401).json({
        message : "Not Found"
      })
    }

    res.send("Edit Page");

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}

export const updatePost = async (req: Request , res : Response) =>{
  try{

    const {content} = req.body;

    if(!content){
      return res.status(300).json({
        message : "Not new data to change"
      })
    }

    const post = await postModel.findOneAndUpdate({_id : req.params.id}, {content : content} , {new : true}).populate("user");

    if(!post){
      return res.status(500).json({
        message : "Something went wrong"
      })
    }

    return res.status(200).json({
      message : "Post updated" , 
      post : post
    })

  }catch(err){
    return res.status(500).json({
      message : err
    })
  }
}