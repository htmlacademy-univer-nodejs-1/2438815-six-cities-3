import { Schema, Document, model } from 'mongoose';
import { User } from '../../../types/user.type.js';
import { UserType } from '../../../types/user-type.enum.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarPath: {
    type: String,
    match: [/\.+(jpg|png)$/, 'Path must end to "jpg" or "png"'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for pasword is 1'],
    maxlength: [12, 'Max length for password is 15'],
  },
  userType: {
    type: UserType,
    required: true,
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
