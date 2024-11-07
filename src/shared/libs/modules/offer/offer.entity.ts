import dayjs from 'dayjs';
import { Offer, CityNames, HousingType, Facilities, Coordinates } from '../../../types/index.js';
import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Max length for name is 100'],})
  public name = '';

  @prop({
    required: true,
    minlength: [20, 'Min length for descripton is 10'],
    maxlength: [1024, 'Max length for description is 1024'],})
  public description = '';

  @prop({
    required: true,
  })
  public publicationDate = dayjs().toDate();

  @prop({
    required: true,
    enum: CityNames,
    type: String,
  })
  public cityName = '';

  @prop({
    required: true,
  })
  public preview = '';

  @prop({
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 6,
      message: 'Offer must have exactly 6 photos exclude preview'
    }
  })
  public photos!: string[];

  @prop({
    required: true,
  })
  public premium = false;

  @prop({
    required: true,
  })
  public favorites = false;

  @prop({
    required: true,
    min: 1,
    max: 5,
  })
  public rating!: number;

  @prop({
    required: true,
  })
  public housingType!: HousingType;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public roomsCount!: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public guestsCount!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public rentCost!: number;

  @prop({
    required: true,
    type: [Facilities],
  })
  public facilities!: Facilities[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public author!: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public commentsCount = 0;

  @prop({
    required: true,
  })
  public coordinates!: Coordinates;

  constructor(offerData: Offer) {
    super();
    this.name = offerData.name;
    this.description = offerData.description;
    this.publicationDate = offerData.publicationDate;
    this.cityName = offerData.cityName;
    this.preview = offerData.preview;
    this.photos = offerData.photos;
    this.premium = offerData.premium;
    this.favorites = offerData.favorites;
    this.rating = offerData.rating;
    this.housingType = offerData.housingType;
    this.roomsCount = offerData.roomsCount;
    this.guestsCount = offerData.guestsCount;
    this.rentCost = offerData.rentCost;
    this.facilities = offerData.facilities;
    this.coordinates = offerData.coordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
