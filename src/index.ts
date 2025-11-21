import express from "express";
import { connectDB } from "./database/project3DB";
import { userRouter } from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRoutes";

const app = express();
const PORT =  process.env.PORT || 3000;

// connect database 
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
 
app.use("/user" , userRouter);
app.use("/auth" , authRouter);

app.listen(PORT , ()=>{
  console.log(`http://localhost:${PORT}`);
})