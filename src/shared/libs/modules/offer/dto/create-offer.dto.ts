import { CityNames, Facilities, Coordinates, HousingType } from '../../../../types/index.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public publicationDate!: Date;
  public cityName!: CityNames;
  public preview!: string;
  public photos!: string[];
  public premium!: boolean;
  public favorites!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public roomsCount!: number;
  public guestsCount!: number;
  public rentCost!: number;
  public facilities!: Facilities[];
  public author!: string;
  public coordinates!: Coordinates;
  public commentsCount!: number;
}
