import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/libs/modules/user/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/libs/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger, PinoLogger } from '../../shared/libs/logger/index.js';
import {DEFAULT_DB_PORT} from './consts.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {

  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel, UserModel);
    this.userService = new DefaultUserService(this.logger, UserModel, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
    }, this.salt);


    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      publicationDate: offer.publicationDate,
      cityName: offer.cityName,
      preview: offer.preview,
      photos: offer.photos,
      premium: offer.premium,
      housingType: offer.housingType,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      rentCost: offer.rentCost,
      facilities: offer.facilities,
      userId: user.id
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.magenta(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
