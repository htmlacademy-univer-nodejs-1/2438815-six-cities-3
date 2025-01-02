import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { HousingType } from '../../../../types/housing-type.enum.js';

export class ListItemOfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public cityName!: string;

  @Expose()
  public preview!: number;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favoritesFlag!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;


  @Expose()
  public rentCost!: number;


  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public commentsCount!: number;
}
