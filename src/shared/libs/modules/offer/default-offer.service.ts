import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { CityNames, Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_CITY_OFFER_COUNT, DEFAULT_OFFER_COUNT } from './consts.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    if (userId) {
      return this.offerModel
        .find({userId: userId}, {limit})
        .populate(['userId'])
        .exec();
    }
    return this.offerModel
      .find({limit})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findFavorites(userId: string) {
    const offers = await this.find(undefined, userId);
    return offers.filter((offer) => offer.favorites);
  }

  public async updateFavorites(userId: string, offerId: string,) {
    const favorites = await this.findFavorites(userId);
    return favorites.find((offer) => offer.id === offerId);
  }

  public async findPremiumByCity(city: CityNames) {
    const offers = await this.find(DEFAULT_CITY_OFFER_COUNT);
    return offers
      .filter((offer) => (offer.cityName === city && offer.premium));
  }
}
