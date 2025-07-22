import { Request, Response } from "express";
import fs from "fs";
import imagekit from "../configs/imageKit";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import main from "../configs/gemini";

export const addBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // chack if all fields are present
    if (!title || !description || !category || !imageFile) {
      res.json({ success: false, message: "missing required fields" });
      return;
    }

    // const fileBuffer = fs.readFileSync(imageFile);
    const fileBuffer = imageFile.buffer;

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto compression
        { format: "webp" }, //convert to modern format
        { width: "1280" }, //width resizing
      ],
    });
    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
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
};

// get blogs function

export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    if(!blogs){
      res.json({success:false,message:"blogs are not available "})
    }
    res.json({ success: true, blogs });
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
};

// get blogs in id base

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
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
};

// delete blogs function

export const deleteBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    const blog = await Blog.findByIdAndDelete(id);


    // Delete all comments associated with the blog 
    await Comment.deleteMany({blog:id})

    res.json({ success: true, message: "Blog deleted successfully" });
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
};

export const togglePublish = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;
    const blog: any = await Blog.findById(id);
    blog.isPublished = !blog?.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
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
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({blog,name,content});
    res.json({ success: true, message: "Comment added for review" });

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
};

export const getBlogComments = async (req: Request, res: Response) =>{
 try {
    const { blogId } = req.body;
    const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})
    
    res.json({ success: true, comments });

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



export const generateContent=async(req:Request,res:Response)=>{
  try {
    const {prompt}=req.body;
  const content=await main(`${prompt} Generate a blog content for this topix in simple text format`)
  res.json({success:true,content})
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