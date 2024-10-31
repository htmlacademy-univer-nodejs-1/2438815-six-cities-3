import { Schema, Document, model } from 'mongoose';
import { Offer } from '../../../types/offer.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export interface OfferDocument extends Offer, Document {}
const offerSchema = new Schema({
  name: String,
  description: String,
  publicationDate: Date,
  cityName: String,
  preview: String,
  photos: String[],
  premium: Boolean,
  favorites: Boolean,
  rating: Number,
  housingType: HousingType,
  roomsCount: Number,
  guestsCount: Number,
  rentCost: Number,
  facilities: Facilities[];
  author: User;
  commentsCount: Number,
  coordinates: Coordinates,
});
export const OfferModel = model<OfferDocument>('User', offerSchema);
