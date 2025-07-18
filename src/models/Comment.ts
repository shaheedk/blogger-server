import mongoose, { Document, Schema, model } from 'mongoose';

interface IComment extends Document {
  blog: mongoose.Types.ObjectId;
  name: string;
  content: string;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: 'blog', required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
