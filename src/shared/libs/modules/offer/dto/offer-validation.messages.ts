export const OfferValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  cityName: {
    invalid: 'cityName must be from names of elements from City array',
  },
  photos: {
    invalidCount: 'offer must always contains 6 photos exclude preview',
  },
  premium: {
    invalidFormat: 'premium flag must be a boolean'
  },
  favorites: {
    invalidFormat: 'favorites flag must be a boolean'
  },
  rating: {
    invalidFormat: 'rating must be a number',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  housingType: {
    invalid: 'housingType must be from HousingType array',
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'Minimum roomsCount is 1',
    maxValue: 'Maximum roomsCount is 8',
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount is 1',
    maxValue: 'Maximum guestsCount is 10',
  },
  rentCost: {
    invalidFormat: 'rentCost must be an integer',
    minValue: 'Minimum rentCost is 100',
    maxValue: 'Maximum rentCost is 100000',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 200000',
  },
  facilities: {
    invalid: 'facilities must be from Facilities array',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
  latitude: {
    invalidFormat: 'latitude must be a valid latitude',
  },
  longitude: {
    invalidFormat: 'longitude must be a valid latitude',
  },
  commentsCount: {
    invalidFormat: 'commentsCount must be an integer',
    minValue: 'Minimum price is 0',
  }
} as const;
