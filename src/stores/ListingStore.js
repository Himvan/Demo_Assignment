import {observable} from 'mobx';
import NetworkOps from 'Demo/src/network/NetworkOps';
import {ListingModel} from './models/ListingModel';
import {_} from 'lodash';
import * as constants from 'Demo/src/utils/Constants';
import Geocoder from 'react-native-geocoder';
export default class ListingStore {
  @observable listingData: Array<ListingModel> = [];
  @observable currentLocality = '';

  async checkGeoLocation(current, info) {
    await Geocoder.geocodePosition(current).then((res) => {
      console.log(res)
      this.currentLocality = res?.[0]?.locality;
    });
    await this.getWeatherData(info);
  }

  async getWeatherData(geoData) {
    const {latitude, longitude} = geoData.coords;
    const url = `/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${constants.Api_Key}`;
    console.log(url);
    const res = await NetworkOps.get(url);
    console.log(res);
    if (res.status == 200) {
      this.listingData = _.map(res.data.daily, (items) => {
        return new ListingModel(items);
      });
    }
    return res;
  }
}
