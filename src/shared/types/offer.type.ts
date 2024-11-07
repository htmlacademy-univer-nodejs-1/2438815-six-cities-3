import { Coordinates } from './coordinates.type.js';
import { Facilities } from './facilities.enum.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  cityName: string;
  preview: string;
  photos: string[];
  premium: boolean;
  favorites: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentCost: number;
  facilities: Facilities[];
  coordinates: Coordinates;
  author: User;
  commentsCount: number;
}
