import { Expose } from 'class-transformer';
import { UserType } from '../../../../types/index.js';

export class LoggedUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public userName!: string;

  @Expose()
  public userType!: UserType;
}
