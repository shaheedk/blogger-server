import mongoose, { Document, Schema } from "mongoose";

export interface Blog extends Document {
  title: string;
  subTitle?: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
}


const blogSchema: Schema<Blog> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// 3. Create the model
const Blog = mongoose.model<Blog>("Blog", blogSchema);

export default Blog;
