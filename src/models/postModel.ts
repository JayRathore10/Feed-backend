import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "user"
  } , 
  date :{
    type : Date, 
    default : Date.now
  } , 
  content : String , 
  likes : [
    {
      type : mongoose.Schema.Types.ObjectId , 
      ref : "user"
    }
  ]
});


export const postModel = mongoose.model("post" , postSchema);