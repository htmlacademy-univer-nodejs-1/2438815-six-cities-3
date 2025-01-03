import { Expose } from 'class-transformer';
import { UserType } from '../../../../types/user-type.enum.js';

export class UserRdo {
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public userName!: string;

  @Expose()
  public userType!: UserType;
}
