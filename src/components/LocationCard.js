import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputField from './InputField';
import images from '../assets/images';
import OutlineButton from './OutlineButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector, useDispatch} from 'react-redux';
import {postLatLng} from '../redux/slices/AuthSlice';
import GetLocation from 'react-native-get-location';
import { ShowToast } from '../utils';
import { useNavigation } from '@react-navigation/native';

const LocationCard = ({reigions, moveToLocation}) => {
  const [currentRegion, setCurrentregion] = useState(null);
  const [moveTo, setMoveTo] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();


  useEffect(() => {
    reigions(currentRegion);
  }, [currentRegion]);

  const onSubmit = () => {
    dispatch(postLatLng(currentRegion));
    ShowToast('Location has been saved.');
    navigation.navigate('profile');
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentregion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.008 * (15 / 20),
        });
        reigions(currentRegion);
        moveToLocation(location.latitude, location.longitude);
        console.log('location: ', location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  console.log('-=-=-=-=-=', currentRegion);

  return (
    <View style={styles.cardStyle}>
      <Text style={styles.addressText}>Your Address</Text>
      <View style={{paddingTop: hp('2%'), flexDirection: 'row'}}>
        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              borderRadius: 20,
              borderColor: '#E6C07A',
              borderWidth: 1,
              backgroundColor: 'transparent',
              color: '#fff',
              fontSize: 16,
            },
            row: {
              backgroundColor: '#111649',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#E6C07A',
            },
            description: {
              color: '#fff',
            },
          }}
          enablePoweredByContainer={false}
          textInputProps={{
            placeholderTextColor: '#E6C07A',
          }}
          fetchDetails={true}
          placeholder="Address"
          onPress={(data, details = null) => {
            console.log(details.geometry.location.lng);
            moveToLocation(
              details?.geometry?.location.lat,
              details?.geometry?.location.lng,
            );
            setCurrentregion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.06,
              longitudeDelta: 0.008 * (15 / 20),
            });
          }}
          query={{
            key: 'AIzaSyAEMqsHw9Qkg8nUj8gU7Ijhu0i2fu9y1tg',
            language: 'en',
          }}
        />
        <TouchableOpacity
          onPress={() => getCurrentLocation()}
          style={styles.locationStyle}>
          <Image source={images.locationIcon} />
        </TouchableOpacity>
      </View>
      <OutlineButton
        onPress={() => onSubmit()}
        buttonStyle={styles.button}
        title={'SET UP YOUR LOCATION'}
      />
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: colors.orange,
    bottom: hp('5%'),
    alignSelf: 'center',
    padding: hp('2%'),
  },
  addressText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  locationStyle: {
    backgroundColor: colors.darkblue,
    borderRadius: 100,
    marginLeft: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('7%'),
    width: hp('7%'),
  },
  button: {
    backgroundColor: colors.darkblue,
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
});
