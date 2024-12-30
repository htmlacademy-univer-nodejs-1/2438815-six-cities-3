import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpError, HttpMethod, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../../../rest/index.js';
import { Logger } from '../../logger/logger.interface.js';
import { Component } from '../../../types/component.enum.js';
import { CreateUserRequest } from './request-types/create-user-request.type.js';
import { UserService } from './index.js';
import { Config, RestSchema } from '../../config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './request-types/login-user-request.type.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
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
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
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
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
