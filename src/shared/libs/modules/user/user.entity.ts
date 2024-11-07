import { User } from '../../../types/user.type.js';
import { UserType } from '../../../types/user-type.enum.js';
import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    type: String,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],})
  public userName = '';

  @prop({
    type: String,
    match: [/\.+(jpg|png)$/, 'Path must end to "jpg" or "png"'],
  })
  public avatarPath = '';

  @prop({
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,})
  public email = '';

  @prop({
    type: String,
    required: true,
    minlength: [6, 'Min length for pasword is 1'],
    maxlength: [12, 'Max length for password is 15'],
  })
  private password = '';

  @prop({
    required: true,
  })
  public userType!: UserType;

  constructor(userData: User) {
    super();
    this.userName = userData.userName;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
