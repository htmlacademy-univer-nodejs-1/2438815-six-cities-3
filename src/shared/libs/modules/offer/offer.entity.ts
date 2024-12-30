import dayjs from 'dayjs';
import { Offer, CityNames, HousingType, Facilities } from '../../../types/index.js';
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
    type: String,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Max length for name is 100'],})
  public name = '';

  @prop({
    required: true,
    type: String,
    minlength: [20, 'Min length for descripton is 10'],
    maxlength: [1024, 'Max length for description is 1024'],})
  public description = '';

  @prop({
    type: Date,
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
    type: String,
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
    type: Boolean,
    required: true,
  })
  public premium = false;

  @prop({
    type: Boolean,
    required: true,
  })
  public favorites = false;

  @prop({
    type: Number,
    required: true,
  })
  public rating!: number;

  @prop({
    type: String,
    enum: HousingType,
    required: true,
  })
  public housingType!: HousingType;

  @prop({
    type: Number,
    required: true,
    min: 1,
    max: 8,
  })
  public roomsCount!: number;

  @prop({
    type: Number,
    required: true,
    min: 1,
    max: 10,
  })
  public guestsCount!: number;

  @prop({
    type: Number,
    required: true,
    min: 100,
    max: 100000,
  })
  public rentCost!: number;

  @prop({
    type: () => String,
    enum: Facilities,
    required: true,
  })
  public facilities!: Facilities[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    type: Number,
    required: true,
  })
  public commentsCount = 0;

  @prop({
    required: true,
    type: Number,
  })
  public latitude!: number;

  @prop({
    required: true,
    type: Number,
  })
  public longitude!: number;

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
    this.latitude = offerData.latitude;
    this.longitude = offerData.longitude;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
