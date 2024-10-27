import 'reflect-metadata';
import { Container } from 'inversify';
import { PinoLogger } from './shared/libs/logger/index.js';
import { Application } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application);
  container.bind<PinoLogger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig);
  const application = container.get<Application>(Component.Application);
  await application.init();
}
bootstrap();
