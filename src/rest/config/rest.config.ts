import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { RestSchema, configRestSchema } from './rest.schema.js';
import { Component } from '../../shared/types/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps it doesn\'t exists.');
    }

    configRestSchema.load({});

    configRestSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configRestSchema.getProperties();
    this.logger.info('.env file successfully parsed.');

  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
