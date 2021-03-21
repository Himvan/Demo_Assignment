import {PERMISSIONS, request, check} from 'react-native-permissions';
import {Platform} from 'react-native';

export const StatusEnum = {
  UNDETERMINED: 'unavailable',
  AUTHORIZED: 'granted',
  DENIED: 'denied',
  RESTRICTED: 'blocked',
};
export type StatusEnumValue = $Values<typeof StatusEnum>;

export const TypeNum = {
  LOCATION:
    Platform.OS == 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};

export const checkRequest = async (type, ...options) => {
  let status = StatusEnum.UNDETERMINED;
  try {
    status = await check(type, {type: 'always'}, ...options);
  } catch (err) {
    console.log(err);
  }
  return status;
};

export const requestPermission = async (type, ...options) => {
  let status = StatusEnum.UNDETERMINED;
  try {
    status = await checkRequest(type, ...options);
    if (status !== StatusEnum.AUTHORIZED) {
      status = await request(type, {type: 'always'}, ...options);
    }
  } catch (err) {
    console.log(err);
  }
  return status;
};
