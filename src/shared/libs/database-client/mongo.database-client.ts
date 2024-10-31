import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { RETRY_COUNT, RETRY_TIMEOUT } from './consts.js';


@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose!: typeof Mongoose;
  private isConnected: boolean;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('Database connection already exists.');
    }
    this.logger.info('Trying to connect to database...');

    let currentRetryCount = 0;
    while (currentRetryCount < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        currentRetryCount++;
        this.logger.error(`Database connection failed - ${currentRetryCount}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Database disconnection error.');
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}

