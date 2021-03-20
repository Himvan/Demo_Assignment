import {get} from 'lodash';

const allDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export class ListingModel {
  constructor(listingModel) {
    this.getForecastDayName = get(listingModel, 'dt');
    this.clouds = get(listingModel, 'clouds');
  }

  set getForecastDayName(dt) {
    this.dayNameForecast = allDays[new Date(dt * 1000).getDay()];
    console.log(this.dayNameForecast);
  }
}
