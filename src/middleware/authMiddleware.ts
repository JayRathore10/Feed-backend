import bcrypt from "bcrypt";

export const encrypt = async (password : string)=>{
  const  salt = await  bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password , salt);
  return hashedPassword;
}

export const compare = async (password : string , userPassword : string | null | undefined )=>{
  if(userPassword && password){
    return await bcrypt.compare(password , userPassword);
  }
  return false ;
}