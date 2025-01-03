import { CreateUserDto } from '../libs/modules/user/dto/create-user.dto.js';
import { CityNames } from './city-names.enum.js';
import { Facilities } from './facilities.enum.js';
import { HousingType } from './housing-type.enum.js';

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  cityName: CityNames;
  preview: string;
  photos: string[];
  premium: boolean;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentCost: number;
  facilities: Facilities[];
  latitude: number;
  longitude: number;
  author: CreateUserDto;
}
