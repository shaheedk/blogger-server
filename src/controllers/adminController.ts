import { Response,Request } from "express"
import  jwt  from "jsonwebtoken";


export const adminLogin=async(req:Request,res:Response)=>{
try {
    const {email,password}=req.body;
    if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD){
        res.json({success:false,message:"Invalid Credentials"})
    }

    const token=jwt.sign({email}, process.env.JWT_SECRET)
    res.json({success:true,token})

} catch (error) {
     console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }

}
