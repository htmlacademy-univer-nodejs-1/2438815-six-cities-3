import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DEFAULT_CITY_OFFER_COUNT, DEFAULT_OFFER_COUNT } from './consts.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { UserEntity } from '../user/index.js';
import { SortType } from '../../../types/sort-type.enum.js';
import { HttpError } from '../../../../rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const user = await this.userModel.findById(userId);
    const favorites = user?.favorites.map((offer) => offer._id.toString());

    let favoritesFlag = false;
    if (favorites) {
      favoritesFlag = !!favorites.find((id) => id === offerId);
    }

    const [offerOrNull] = await this.offerModel
      .aggregate([{
        $match: { _id: new Types.ObjectId(offerId) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'commentsTMP',
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },

          commentsCount: { $size: '$commentsTMP' },

          favoritesFlag: favoritesFlag,

          rating: {
            $cond: {
              if: {$ne: ['$commentsCount', 0]},
              then: {
                $round:[{
                  $divide: [{
                    $reduce: {
                      input: '$commentsTMP',
                      initialValue: 0,
                      in: { $add: ['$$value', '$$this.rating'] },
                    },
                  },
                  {
                    $max: ['$commentsCount', 1]
                  }]
                }, 1]
              },
              else: 5,
            }
          },
        },
      },
      { $unset: 'commentsTMP'}]).exec();

    return offerOrNull;
  }

  public async find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId);
    const favorites = user?.favorites.map((offer) => offer._id.toString());
    console.log(favorites);
    return this.offerModel
      .aggregate([{
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },

          commentsCount: { $size: '$comments' },

          favoritesFlag: {
            $cond: {
              if: { $in: [{ $toString: '$_id' }, favorites ?? []] },
              then: true,
              else: false,
            },
          },

          rating: {
            $cond: {
              if: {$ne: ['$commentsCount', 0]},
              then: {
                $round:[{
                  $divide: [{
                    $reduce: {
                      input: '$comments',
                      initialValue: 0,
                      in: { $add: ['$$value', '$$this.rating'] },
                    },
                  },
                  {
                    $max: ['$commentsCount', 1]
                  }]
                }, 1]
              },
              else: 5,
            }
          },
        },
      },
      { $unset: 'comments', },
      { $limit: count ?? DEFAULT_OFFER_COUNT },
      {
        $sort: {
          createdAt: SortType.Down
        }
      }]).exec();
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
    this.logger.info('EEEEEEEEEEEExists started');
    return (await this.offerModel.exists({_id: documentId}) !== null);
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async findPremiumByCity(city: string) {
    const offers = await this.find(DEFAULT_CITY_OFFER_COUNT);
    return offers
      .filter((offer) => (offer.cityName === city && offer.premium));
  }

  public async checkDocumentAuthor(offerId: string, userId: string) {
    const offer = await this.offerModel.findById(offerId);
    if (!offer){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with ${offerId} not found.`);
    }
    return offer?.userId.toString() === userId;
  }
}
