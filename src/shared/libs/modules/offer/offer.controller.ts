import { BaseController, HttpError, HttpMethod } from '../../../../rest/index.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/logger.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamCityName, ParamOfferId, ParamUserId } from './inner-params-types/params.js';
import { OfferService } from './index.js';
import { fillDTO } from '../../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ListItemOfferRdo } from './rdo/list-item-offer.rdo.js';
import { CreateOfferRequest } from './request-types/create-offer-request.type.js';
import { FullOfferDto } from './dto/full-offer.dto.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.findOne });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.findAll });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/premium/:cityName', method: HttpMethod.Get, handler: this.findPremiumToCity });
    this.addRoute({ path: '/:userId/favorites', method: HttpMethod.Get, handler: this.findFavorites });
  }

  public async findOne({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findAll(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, FullOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.noContent(res, offer);
  }

  public async findPremiumToCity({ params }: Request<ParamCityName>, res: Response) {
    const offers = await this.offerService.findPremiumByCity(params.cityName);
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }

  public async findFavorites({ params }: Request<ParamUserId>, res: Response) {
    const offers = await this.offerService.findFavorites(params.userId);
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }
}
