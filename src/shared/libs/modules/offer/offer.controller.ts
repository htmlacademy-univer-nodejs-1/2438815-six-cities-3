import { BaseController, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware, DocumentExistsMiddleware, CheckAuthorIdMiddleware, PrivateRouteMiddleware } from '../../../../rest/index.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/logger.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Request, Response } from 'express';
import { ParamCityName, ParamOfferId} from './inner-params-types/params.js';
import { OfferService } from './index.js';
import { fillDTO } from '../../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ListItemOfferRdo } from './rdo/list-item-offer.rdo.js';
import { CreateOfferRequest } from './request-types/create-offer-request.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { CommentService } from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findOne,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.findAll });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new PrivateRouteMiddleware(),
        new CheckAuthorIdMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new PrivateRouteMiddleware(),
        new CheckAuthorIdMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({ path: '/premium/:cityName', method: HttpMethod.Get, handler: this.findPremiumToCity });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.findComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),]
    });
  }

  public async findOne({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = tokenPayload ? await this.offerService.findById(offerId, tokenPayload.id) : await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findAll({query, tokenPayload}: Request, res: Response) {

    const count = query.count ? Number(query.count) : undefined;
    const offers = tokenPayload ? await this.offerService.find(count, tokenPayload.id) : await this.offerService.find(count);
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async findPremiumToCity({ params }: Request<ParamCityName>, res: Response) {
    const offers = await this.offerService.findPremiumByCity(params.cityName);
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }

  public async findComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
