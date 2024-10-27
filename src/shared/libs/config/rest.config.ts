import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { RestSchema, configRestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps it doesn\'t exists.');
    }

    configRestSchema.load({});
    try {
      configRestSchema.validate({allowed: 'strict', output: this.logger.info});
    } catch {
      this.logger.error('.env file parsed with error...', new Error('.env file parsing error'));
    }
    this.config = configRestSchema.getProperties();
    this.logger.info('.env file successfully parsed.');

  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
