import { Facilities } from './facilities.enum.js';
import { HousingType } from './housing-type.enum.js';
import { UserType } from './user-type.enum.js';

export type MockServerData = {
  names: string [],
    descriptions: string[],
    previews: string[],
    photos: string[],
    housingTypes: HousingType[],
    facilities: Facilities[],
    userNames: string[],
    emails: string[],
    passwords: string[],
    userTypes: UserType[],
    cities: string[],
  }
