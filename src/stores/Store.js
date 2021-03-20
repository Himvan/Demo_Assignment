import ListingStore from './ListingStore';

class Store {
  constructor() {
    this.ListingStore = new ListingStore(this);
  }
}

export default new Store();
