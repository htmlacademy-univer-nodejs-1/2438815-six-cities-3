import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpError, HttpMethod, PrivateRouteMiddleware, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../../../rest/index.js';
import { Logger } from '../../logger/logger.interface.js';
import { Component } from '../../../types/component.enum.js';
import { CreateUserRequest } from './request-types/create-user-request.type.js';
import { DEFAULT_AVATAR_FILE_NAME, UserService } from './index.js';
import { Config, RestSchema } from '../../../../rest/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './request-types/login-user-request.type.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { ParamOfferId } from '../offer/inner-params-types/params.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { ListItemOfferRdo } from '../offer/rdo/list-item-offer.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });


    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.findFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Patch,
      handler: this.pushFavoriteOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.pullFavoriteOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/avatar',
      method: HttpMethod.Patch,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async uploadAvatar({ tokenPayload, file }: Request, res: Response) {
    const avatarPath = file?.filename ?? DEFAULT_AVATAR_FILE_NAME;
    const uploadFile = { avatarPath: avatarPath };
    await this.userService.updateById(tokenPayload.id, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatarPath }));
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async pushFavoriteOffer({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    await this.userService.pushFavoriteOffer(params.offerId, tokenPayload.id);
    const user = await this.userService.findByEmail(tokenPayload.email);
    this.ok(res, fillDTO(UserRdo, user));
  }

  public async pullFavoriteOffer({ params, tokenPayload }: Request<ParamOfferId>, res: Response) {
    await this.userService.pullFavoriteOffer(params.offerId, tokenPayload.id);
    const user = await this.userService.findByEmail(tokenPayload.email);
    this.ok(res, fillDTO(UserRdo, user));
  }

  public async findFavorites({tokenPayload}: Request, res: Response) {
    const offers = await this.userService.findFavorites(tokenPayload.id);
    this.ok(res, fillDTO(ListItemOfferRdo, offers));
  }
}
