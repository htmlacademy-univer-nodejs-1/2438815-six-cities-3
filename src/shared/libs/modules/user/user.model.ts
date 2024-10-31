import { Schema, Document, model } from 'mongoose';
import { User } from '../../../types/user.type.js';
import { UserType } from '../../../types/user-type.enum.js';

export interface UserDocument extends User, Document {}
const userSchema = new Schema({
  name: String,
  email: String,
  avatarPath: String,
  password: String,
  userType: UserType,
});
export const UserModel = model<UserDocument>('User', userSchema);
