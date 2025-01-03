import { inject, injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import { Controller } from './controller.interface.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { Route } from '../types/route.interface.js';
import { Component } from '../../shared/types/index.js';
import { PathTransformer } from '../../shared/libs/transform/path-transformer.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  @inject(Component.PathTransformer)
  private pathTranformer!: PathTransformer;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTranformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public notFoundError<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NOT_FOUND, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public forbiddenError<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.FORBIDDEN, data);
  }
}
