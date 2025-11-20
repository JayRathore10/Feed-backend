import { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Experess {
    interface Request{
      user?: string | JwtPayload;
    }
  }
}