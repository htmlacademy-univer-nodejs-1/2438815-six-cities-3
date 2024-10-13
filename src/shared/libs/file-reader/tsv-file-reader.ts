import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HousingType, UserType, Facilities } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, publicationDate, cityName, preview, photos, premium,
        favorites, rating, housingType, roomsCount, guestsCount, rentCost, facilities,
        userName, email, avatarPath, password, userType, commentsCount, latitude, longitude]) => ({
        name,
        description,
        publicationDate: new Date(publicationDate),
        cityName,
        preview,
        photos: photos.split(';'),
        premium: premium !== 'false',
        favorites: favorites !== 'false',
        rating: Number.parseInt(rating, 10),
        housingType: HousingType[housingType as 'Apartment'| 'House'|'Room' | 'Hotel'],
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        rentCost: Number.parseInt(rentCost, 10),
        facilities: facilities.split(';').map((title) => title as Facilities),
        author: {
          userName,
          email,
          avatarPath,
          password,
          userType: UserType[userType as 'Standart' | 'Pro'],
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        }
      }));
  }
}
