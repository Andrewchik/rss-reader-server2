import mongoose, { Document } from 'mongoose';

export interface AuthUser extends Document {
  login: string;
  password: string;
}

const authUserSchema = new mongoose.Schema({
  login: String,
  password: String,
});

export default mongoose.model<AuthUser>('AuthUser', authUserSchema);