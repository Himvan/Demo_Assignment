import {observable} from 'mobx';
import NetworkOps from 'Demo/src/network/NetworkOps';
import {ListingModel} from './models/ListingModel';
import {_} from 'lodash';
export default class ListingStore {
  @observable listingData: Array<ListingModel> = [];
  @observable currentLocality = '';

  async getWeatherData(url) {
    const res = await NetworkOps.get(url);
    console.log(res);
    if (res.status == 200) {
      this.listingData = _.map(res.data.daily, (items) => {
        return new ListingModel(items);
      });
    }
  }
}
