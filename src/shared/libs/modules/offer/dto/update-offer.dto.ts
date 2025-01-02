import { ArrayMaxSize, ArrayMinSize, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CityNames, Facilities, HousingType } from '../../../../types/index.js';
import { OfferValidationMessage } from './offer-validation.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: OfferValidationMessage.name.minLength})
  @MaxLength(100, {message: OfferValidationMessage.name.maxLength})
  public name!: string;

  @IsOptional()
  @MinLength(20, {message: OfferValidationMessage.name.minLength})
  @MaxLength(1024, {message: OfferValidationMessage.name.maxLength})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: OfferValidationMessage.publicationDate.invalidFormat})
  public publicationDate!: Date;

  @IsOptional()
  @IsEnum(CityNames, {message: OfferValidationMessage.cityName.invalid})
  public cityName!: CityNames;

  @IsOptional()
  public preview!: string;

  @IsOptional()
  @ArrayMaxSize(6, {message: OfferValidationMessage.photos.invalidCount})
  @ArrayMinSize(6, {message: OfferValidationMessage.photos.invalidCount})
  public photos!: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.premium.invalidFormat})
  public premium!: boolean;

  @IsOptional()
  @IsEnum(HousingType, {message: OfferValidationMessage.housingType.invalid})
  public housingType!: HousingType;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.roomsCount.minValue})
  @Max(8, {message: OfferValidationMessage.roomsCount.maxValue})
  public roomsCount!: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.guestsCount.invalidFormat})
  @Min(1, {message: OfferValidationMessage.guestsCount.minValue})
  @Max(10, {message: OfferValidationMessage.guestsCount.maxValue})
  public guestsCount!: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.rentCost.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentCost.minValue})
  @Max(100000, {message: OfferValidationMessage.rentCost.maxValue})
  public rentCost!: number;

  @IsOptional()
  @IsEnum(Facilities, {message: OfferValidationMessage.facilities.invalid})
  public facilities!: Facilities[];

  @IsOptional()
  @IsLatitude({ message: OfferValidationMessage.latitude.invalidFormat })
  public latitude!: number;

  @IsOptional()
  @IsLongitude({ message: OfferValidationMessage.longitude.invalidFormat })
  public longitude!: number;
}
