import { IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CityNames, HousingType } from '../../../../types/index.js';
import { OfferValidationMessage } from './offer-validation.messages.js';


export class ListItemOfferDto {
  public id!: string;

  @MinLength(10, {message: OfferValidationMessage.name.minLength})
  @MaxLength(100, {message: OfferValidationMessage.name.maxLength})
  public name!: string;

  @IsDateString({}, {message: OfferValidationMessage.publicationDate.invalidFormat})
  public publicationDate!: Date;

  @IsEnum(CityNames, {message: OfferValidationMessage.cityName.invalid})
  public cityName!: CityNames;

  public preview!: string;

  @IsBoolean({message: OfferValidationMessage.premium.invalidFormat})
  public premium!: boolean;

  @IsBoolean({message: OfferValidationMessage.favorites.invalidFormat})
  public favorites!: boolean;

  @IsNumber({}, {message: OfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: OfferValidationMessage.rating.minValue})
  @Max(5, {message: OfferValidationMessage.rating.maxValue})
  public rating!: number;

  @IsEnum(HousingType, {message: OfferValidationMessage.housingType.invalid})
  public housingType!: HousingType;

  @IsInt({message: OfferValidationMessage.rentCost.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentCost.minValue})
  @Max(100000, {message: OfferValidationMessage.rentCost.maxValue})
  public rentCost!: number;

  @IsMongoId({ message: OfferValidationMessage.userId.invalidFormat })
  public userId!: string;

  @IsInt({message: OfferValidationMessage.commentsCount.invalidFormat})
  @Min(0, {message: OfferValidationMessage.commentsCount.minValue})
  public commentsCount!: number;
}
