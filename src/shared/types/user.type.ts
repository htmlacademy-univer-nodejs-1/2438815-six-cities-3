import { UserType } from './user-type.enum.js';

export type User = {
  userName: string;
  email: string;
  avatarPath: string;
  userType: UserType;
  password: string;
}
