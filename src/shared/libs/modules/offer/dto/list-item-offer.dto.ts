import { CityNames, HousingType } from '../../../../types/index.js';


export class ListItemOfferDto {
  public id!: string;
  public name!: string;
  public publicationDate!: Date;
  public cityName!: CityNames;
  public preview!: string;
  public premium!: boolean;
  public favorites!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public rentCost!: number;
  public userId!: string;
  public commentsCount!: number;
}
