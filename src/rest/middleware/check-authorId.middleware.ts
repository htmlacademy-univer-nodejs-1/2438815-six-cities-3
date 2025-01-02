import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import { HttpError } from '../errors/http-error.js';
import {Middleware} from './middleware.interface.js';
import { OffersAuthorChecks } from '../../shared/types/author-checks.interface.js';

export class CheckAuthorIdMiddleware implements Middleware {
  constructor(
    private readonly service: OffersAuthorChecks,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params, tokenPayload: {id}}: Request, _res: Response, next: NextFunction) {
    const offerId = params[this.paramName];

    if(!(await this.service.checkDocumentAuthor(offerId, id))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User is not author of ${this.entityName} with id ${offerId}. User can't update or delete it.`,
        'ValidateAuthorMiddleware'
      );
    }
    next();
  }
}
