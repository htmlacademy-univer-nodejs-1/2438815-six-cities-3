import { Offer, HousingType, UserType, Facilities } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    publicationDate,
    cityName,
    preview,
    photos,
    premium,
    housingType,
    roomsCount,
    guestsCount,
    rentCost,
    facilities,
    userName,
    email,
    avatarPath,
    password,
    userType,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    userName,
    email,
    avatarPath,
    password,
    userType: UserType[userType as 'Standart' | 'Pro'],
  };

  return {
    name,
    description,
    publicationDate: new Date(publicationDate),
    cityName,
    preview,
    photos: photos.split(';'),
    premium: premium !== 'false',
    housingType: HousingType[housingType as 'Apartment'| 'House'|'Room' | 'Hotel'],
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    rentCost: Number.parseInt(rentCost, 10),
    facilities: facilities.split(';').map((title) => title as Facilities),
    author,
    commentsCount: Number.parseInt(commentsCount, 10),
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
