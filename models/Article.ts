import mongoose, { Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  content: string;
}

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.model<Article>('Article', articleSchema);