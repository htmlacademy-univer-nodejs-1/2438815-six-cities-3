import { PinoLogger } from './shared/libs/logger/index.js';
import { Application } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);
  const application = new Application(logger, config);
  await application.init();
}
bootstrap();
