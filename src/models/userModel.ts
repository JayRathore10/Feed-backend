import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName : String , 
  name:String  , 
  email : String , 
  age : Number , 
  password : String ,
  posts : [
    {
      type : mongoose.Schema.Types.ObjectId , 
      ref :  "post"
    }
  ]
});

export const userModel = mongoose.model("user" , userSchema);