import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { DocumentExists } from '../../../types/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OffersAuthorChecks } from '../../../types/author-checks.interface.js';

export interface OfferService extends DocumentExists, OffersAuthorChecks {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>
}
