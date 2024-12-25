import { Facilities, HousingType } from '../../../../types/index.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public cityName?: string;
  public preview?: string;
  public photos?: string[];
  public premium?: boolean;
  public housingType?: HousingType;
  public roomsCount?: number;
  public guestsCount?: number;
  public rentCost?: number;
  public facilities?: Facilities[];
  public userId!: string;
  public latitude?: number;
  public longitude?: number;
  public isFavorite?: boolean;
}
