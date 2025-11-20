import express from "express";
import { connectDB } from "./database/project3DB";
import { userRouter } from "./routes/userRoutes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// connect database 
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
 
app.use("/user" , userRouter);

app.listen(PORT , ()=>{
  console.log(`http://localhost:${PORT}`);
})