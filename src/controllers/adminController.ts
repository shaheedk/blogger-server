import { Response,Request } from "express"
import  jwt  from "jsonwebtoken";
import Blog from "../models/Blog";
import Comment from '../models/Comment';

export const adminLogin=async(req:Request,res:Response)=>{
try {
    const {email,password}=req.body;
    if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD){
        res.json({success:false,message:"Invalid Credentials"})
    }

    const token=jwt.sign({email}, process.env.JWT_SECRET!)
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

export const getAllBlogsAdmin=async (req: Request, res: Response) =>{
  try {
    const blogs=await Blog.find({}).sort({createdAt:-1})
    res.json({success:true,blogs})
  } catch (error) {
      if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  
  }
}


export const getAllComments=async (req: Request, res: Response) =>{
  try {
    const comments=await Comment.find({}).populate('blog').sort({createdAt:-1})
    res.json({success:true,comments})

  } catch (error) {
      if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
}



export const getDashboard=async (req: Request, res: Response)=>{
  try {
    const recentBlogs=await Blog.find({}).sort({createdAt:-1}).limit(5)
    const blogs=await Blog.countDocuments()
    const comments=await Comment.countDocuments()

    const drafts=await Blog.countDocuments({isPublished:false})
    const dashboardData={
      blogs,comments,drafts,recentBlogs
    }
    res.json({success:true,dashboardData})

  } catch (error) {
     if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
}



export const deleteCommentById=async (req: Request, res: Response)=>{
  try {
    const {id}=req.body;
    await Comment.findByIdAndDelete(id)
        res.json({success:true,message:"Comment deleted successfully"})

  } catch (error) {
     if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
}

export const approveCommentById=async (req: Request, res: Response)=>{
  try {
    const {id}=req.body;
    await Comment.findByIdAndUpdate(id,{isApproved:true})
        res.json({success:true,message:"Comment updated successfully"})

  } catch (error) {
     if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
}
