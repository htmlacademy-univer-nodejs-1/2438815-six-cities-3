import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/user.rdo.js';

export class CommentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt'})
  public publicationDate!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public userId!: UserRdo;
}
