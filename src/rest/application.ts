import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
export class Application {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application is initializing');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
