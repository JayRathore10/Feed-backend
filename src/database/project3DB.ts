import mongoose from "mongoose";

export const connectDB = ()=>{
  try{
    mongoose.connect(`mongodb+srv://JayRathore10:Jay9575Rathore@blogdb.kkimp1o.mongodb.net/`);
    console.log("Database connected");
  }catch(err){
    console.log(err);
  }
}
