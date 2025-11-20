import mongoose from "mongoose";

export const connectDB = ()=>{
  try{
    mongoose.connect(`mongodb://localhost:27017/project3`);
    console.log("Database connected");
  }catch(err){
    console.log(err);
  }
}
