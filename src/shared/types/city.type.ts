import { CityNames} from './city-names.enum.js';
import {Coordinates} from './coordinates.type.js';

export type City = {
  name: CityNames;
  coordinates: Coordinates;
}
