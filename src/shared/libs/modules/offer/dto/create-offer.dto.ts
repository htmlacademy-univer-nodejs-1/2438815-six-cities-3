import { ArrayMaxSize, ArrayMinSize, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CityNames, Facilities, HousingType } from '../../../../types/index.js';
import { OfferValidationMessage } from './offer-validation.messages.js';

export class CreateOfferDto {
  @MinLength(10, {message: OfferValidationMessage.name.minLength})
  @MaxLength(100, {message: OfferValidationMessage.name.maxLength})
  public name!: string;

  @MinLength(20, {message: OfferValidationMessage.name.minLength})
  @MaxLength(1024, {message: OfferValidationMessage.name.maxLength})
  public description!: string;

  @IsDateString({}, {message: OfferValidationMessage.publicationDate.invalidFormat})
  public publicationDate!: Date;

  @IsEnum(CityNames, {message: OfferValidationMessage.cityName.invalid})
  public cityName!: string;

  public preview!: string;

  @ArrayMaxSize(6, {message: OfferValidationMessage.photos.invalidCount})
  @ArrayMinSize(6, {message: OfferValidationMessage.photos.invalidCount})
  public photos!: string[];

  @IsBoolean({message: OfferValidationMessage.premium.invalidFormat})
  public premium!: boolean;

  @IsEnum(HousingType, {message: OfferValidationMessage.housingType.invalid})
  public housingType!: HousingType;

  @IsInt({message: OfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.roomsCount.minValue})
  @Max(8, {message: OfferValidationMessage.roomsCount.maxValue})
  public roomsCount!: number;

  @IsInt({message: OfferValidationMessage.guestsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.guestsCount.minValue})
  @Max(10, {message: OfferValidationMessage.guestsCount.maxValue})
  public guestsCount!: number;

  @IsInt({message: OfferValidationMessage.rentCost.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentCost.minValue})
  @Max(100000, {message: OfferValidationMessage.rentCost.maxValue})
  public rentCost!: number;

  @IsEnum(Facilities, {each: true, message: OfferValidationMessage.facilities.invalid})
  public facilities!: Facilities[];

  public userId!: string;

  @IsLatitude({ message: OfferValidationMessage.latitude.invalidFormat })
  public latitude!: number;

  @IsLongitude({ message: OfferValidationMessage.longitude.invalidFormat })
  public longitude!: number;

  @IsInt({message: OfferValidationMessage.commentsCount.invalidFormat})
  @Min(0, {message: OfferValidationMessage.commentsCount.minValue})
  public commentsCount!: number;
}
