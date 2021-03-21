import React, {Component, useEffect, useState} from 'react';
import Loader from 'Demo/src/components/Loader';
import {inject, observer} from 'mobx-react';
import * as Permissions from '../utils/PermissionsHandler';
import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';

const Splash = (props) => {
  const [isLoading, setShowLoading] = useState(false);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    Permissions.requestPermission(Permissions.TypeNum.LOCATION, {
      rationale: {
        title: 'Location Access',
        message: 'This app needs to access your Location',
      },
    }).then(async (res) => {
      console.log(res);
      if (res === Permissions.StatusEnum.AUTHORIZED) {
        Geolocation.getCurrentPosition(
          async (info) => {
            const {latitude, longitude} = info.coords;
            const current = {
              lat: latitude,
              lng: longitude,
            };
            console.log(info);
            setShowLoading(true);
            await props.ListingStore.checkGeoLocation(current, info);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'listing'}],
            });
            setShowLoading(false);
          },
          (error) => {
            console.warn(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000},
        );
      } else {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'listing'}],
        });
      }
    });
  };

  return (
    <>
      <Loader loading={isLoading} />
    </>
  );
};

export default inject('ListingStore')(observer(Splash));
