import { Request, Response } from "express";
import fs from "fs";
import imagekit from "../configs/imageKit";
import Blog from "../models/Blog";

export const addBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog

    );
    const imageFile = req.file;

    // chack if all fields are present
    if (!title || !description || !category ||!imageFile) {
      res.json({ success: false, message: "missing required fields" });
      return
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
      transformation: [{ quality: "auto" },//Auto compression 
         { format: "webp" },//convert to modern format 
         {width:'1280'} //width resizing
        ],
    });
    const image=optimizedImageUrl;
    await Blog.create({title,subTitle,description,category,image,isPublished})
    res.json({success:true,message:'Blog added successfully'})
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
  
};
export default addBlog;
