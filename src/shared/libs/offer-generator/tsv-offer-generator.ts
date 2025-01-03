import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { getRandomItem, getRandomItems, generateRandomValue, getTSVString } from '../../helpers/index.js';
import { PHOTOS_COUNT, RoomsCount, GuestsCount, RentCost, DateRange} from './consts.js';
import { DEFAULT_AVATAR_FILE_NAME } from '../modules/user/index.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) { }

  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomValue(DateRange.Min, DateRange.Max), 'day')
      .toISOString();
    const cityName = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getTSVString(getRandomItems(this.mockData.photos, PHOTOS_COUNT));
    const premium = Boolean(generateRandomValue(0, 1));
    const placeType = getRandomItem(this.mockData.housingTypes);
    const roomsCount = generateRandomValue(RoomsCount.Min, RoomsCount.Max);
    const guestsCount = generateRandomValue(GuestsCount.Min, GuestsCount.Max);
    const rentCost = generateRandomValue(RentCost.Min, RentCost.Max);
    const facilities = getTSVString(getRandomItems(this.mockData.facilities));
    const userName = getRandomItem(this.mockData.userNames);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = DEFAULT_AVATAR_FILE_NAME;
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);

    return [
      name, description, publicationDate, cityName,
      preview, photos, premium, placeType,
      roomsCount, guestsCount, rentCost,
      facilities, userName, email,
      avatarPath, password, userType
    ].join('\t');
  }
}
