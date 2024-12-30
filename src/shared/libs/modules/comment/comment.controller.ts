import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod } from '../../../../rest/index.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './request-types/create-comment-request.type.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
