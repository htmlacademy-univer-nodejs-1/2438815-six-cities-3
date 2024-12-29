import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../../../rest/index.js';
import { FullOfferDto } from '../dto/full-offer.dto.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, FullOfferDto>;
