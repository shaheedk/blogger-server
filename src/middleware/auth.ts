import jwt from 'jsonwebtoken'
import { NextFunction, Request,Response } from 'express'

const auth=(req:Request,res:Response,next:NextFunction)=>{
const token=req.headers.authorization;

try {
    jwt.verify(token as string,process.env.JWT_SECRET as string )
    next()
} catch (error) {
    res.json({success:false,message:'invalid token'})
}

}
export default auth;