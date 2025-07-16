import {Request, Response } from "express"

export const addBlog=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {title,subTitle,description,category,isPublished}=JSON.parse(req.body.blog);
        const imageFile=req.file;

        // chack if all fields are present 

        if(!title||!description||!category||imageFile){
            res.json({success:false,message:"missing required fields"})
        }

    } catch (error) {
        
    }
}