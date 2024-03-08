import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

export const ShowToast = message => {
  return Toast.show({
    type: 'success',
    text1: message,
  });
};

export const ErrorToast = message => {
  return Toast.show({
    type: 'success',
    text1: message || 'Some Problem Occured',
  });
};

export const addSpacesInString = str => {
  return str.replace(/(.{6})/g, ' $1');
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
