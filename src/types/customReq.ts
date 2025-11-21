import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface userPlayload extends JwtPayload{
  userId : string , 
  email : string , 
}

export interface AuthRequest extends Request {
  user?: userPlayload;
}
