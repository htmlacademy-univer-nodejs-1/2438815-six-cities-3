import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { HousingType } from '../../../../types/housing-type.enum.js';
import { Facilities } from '../../../../types/facilities.enum.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public cityName!: string;

  @Expose()
  public preview!: number;

  @Expose()
  public photos!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public favoritesFlag!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public rentCost!: number;

  @Expose()
  public facilities!: Facilities[];

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
