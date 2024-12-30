import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly model: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    const result = await (this.model.create(user) as Promise<DocumentType<UserEntity>>);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.model.findOne({email}).exec() as Promise<DocumentType<UserEntity>>;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.model.findById(userId).exec() as Promise<DocumentType<UserEntity>>;
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.model
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec() as Promise<DocumentType<UserEntity>>;
  }

  public async exists(documentId: string): Promise<boolean> {
    this.logger.info('EEEEEEEEEEEExists started');
    return (await this.model.exists({_id: documentId}) !== null);
  }
}
