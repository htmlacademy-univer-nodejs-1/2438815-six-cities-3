import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/libs/modules/user/user.container.js';
import { createOfferContainer } from './shared/libs/modules/offer/index.js';
import { createCommentContainer } from './shared/libs/modules/comment/index.js';
import { createAuthContainer } from './shared/libs/modules/auth/index.js';

async function bootstrap() {
  const appContainer = Container.merge(createApplicationContainer(), createUserContainer(), createOfferContainer(), createCommentContainer(), createAuthContainer(),);
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}
bootstrap();
