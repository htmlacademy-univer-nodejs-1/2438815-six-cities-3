import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { OfferEntity } from '../offer/index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  pushFavoriteOffer(offerId: string, userId: string): Promise<DocumentType<UserEntity>>;
  pullFavoriteOffer(offerId: string, userId: string): Promise<DocumentType<UserEntity>>;
}
