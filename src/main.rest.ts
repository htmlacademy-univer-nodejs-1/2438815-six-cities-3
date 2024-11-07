import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/libs/modules/user/user.container.js';

async function bootstrap() {
  const appContainer = Container.merge(createApplicationContainer(), createUserContainer());
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}
bootstrap();
