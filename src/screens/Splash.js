import React, {Component, useEffect, useState} from 'react';
import Loader from 'Demo/src/components/Loader';
import Geolocation from '@react-native-community/geolocation';
import {inject, observer} from 'mobx-react';
import * as constants from 'Demo/src/utils/Constants';
import Geocoder from 'react-native-geocoder';

const Splash = (props) => {
  const [isLoading, isShowLoader] = useState(false)
  useEffect(() => {
    isShowLoader(true)
    Geolocation.getCurrentPosition(
      async (info) => {
        await getWeatherData(info);
      },
      (error) => {
        console.warn(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 2000},
    );
  }, []);

  const getWeatherData = async (geoData) => {
    const {latitude, longitude} = geoData.coords;
    const current = {
      lat: latitude,
      lng: longitude,
    };
    await Geocoder.geocodePosition(current).then((res) => {
      props.ListingStore.currentLocality = res?.[0]?.locality;
    });
    const url = `/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${constants.Api_Key}`;
    console.log(url);
    await props.ListingStore.getWeatherData(url);
    isShowLoader(false)
    props.navigation.navigate('listing');
  };

  return (
    <>
      <Loader loading={isLoading} />
    </>
  );
};

export default inject('ListingStore')(observer(Splash));
