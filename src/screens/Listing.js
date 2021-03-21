import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
    console.log(listingData);
    if (listingData.length) {
      return (
        <View style={{flex: 1}}>
          <View
            style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.textStyle}>{currentLocality}</Text>
            <Text style={{fontSize: 19, marginTop: 10}}>
              {listingData?.[0]?.clouds}
            </Text>
          </View>
          <View style={{flex: 0.4, justifyContent: 'flex-end'}}>
            {_.map(listingData.splice(1, listingData.length - 1), (items) => {
              return (
                <View style={styles.otherForecast} key={items.dayNameForecast}>
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
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{justifyContent: 'flex-end', flex: 0.6}}>
            <Text style={styles.errorText}>
              {' '}
              {'Something \n Went Wrong \n At Our End'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => {
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'splash'}],
              });
            }}>
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
    paddingVertical: 8,
    borderColor: '#000000',
  },
  otherForecastText: {
    fontSize: 22,
  },
  errorText: {
    fontSize: 50,
    bottom: 30,
    marginLeft: 30,
  },
  errorButton: {
    height: 40,
    width: 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 30,
  },
});

export default Listing;
