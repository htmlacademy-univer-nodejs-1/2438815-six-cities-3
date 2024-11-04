import { UserType } from '../../../../types/index.js';

export class CreateUserDto {
  public userName!: string;
  public email!: string;
  public avatarPath!: string;
  public userType!: UserType;
  public password!: string;
}
