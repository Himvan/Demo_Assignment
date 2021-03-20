import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import {_} from 'lodash';

@inject('ListingStore')
@observer
class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {listingData, currentLocality} = this.props.ListingStore;
    console.log(listingData.splice(0, 1));
    return (
      <View style={{flex: 1}}>
        <View
          style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.textStyle}>{currentLocality}</Text>
          <Text style={{fontSize: 19, marginTop: 10}}>
            {listingData?.[0]?.clouds}
          </Text>
        </View>
        <View style={{flex: 0.4}}>
          {_.map(listingData.splice(1, listingData.length - 1), (items) => {
            return (
              <View style={styles.otherForecast}>
                <Text style={styles.otherForecastText}>
                  {items.dayNameForecast}
                </Text>
                <Text style={styles.otherForecastText}>{items.clouds}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 35,
  },
  otherForecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderColor: '#000000',
  },
  otherForecastText: {
    fontSize: 22,
  },
});

export default Listing;
