import { CityNames} from './city-names.enum.js';

export type City = {
  name: CityNames;
  latitude: number;
  longitude: number;
}

export const Cities: Array<City> = [
  {
    name: CityNames.Paris,
    latitude: 48.85661,
    longitude: 2.351499
  },
  {
    name: CityNames.Cologne,
    latitude: 50.938361,
    longitude: 6.959974
  },
  {
    name: CityNames.Brussels,
    latitude: 50.846557,
    longitude: 4.351697
  },
  {
    name: CityNames.Amsterdam,
    latitude: 52.370216,
    longitude: 4.895168
  },
  {
    name: CityNames.Hamburg,
    latitude: 53.550341,
    longitude: 10.000654
  },
  {
    name: CityNames.Dusseldorf,
    latitude: 51.225402,
    longitude: 6.776314
  }
];
