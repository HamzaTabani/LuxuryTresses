import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputField from './InputField';
import images from '../assets/images';
import OutlineButton from './OutlineButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector, useDispatch} from 'react-redux';
import { postLatLng } from '../redux/slices/AuthSlice';


const LocationCard = ({reigions, moveToLocation}) => {
  const [currentRegion, setCurrentregion] = useState(null);
  const [moveTo, setMoveTo] = useState('');
  const dispatch = useDispatch();
  dispatch(postLatLng({currentRegion}));
//   const {latLng} = useSelector(state => state.userData);

//   console.log('latLng: ',latLng)
  //   const mapRef = useRef(null);
  console.log('currentRegion: ', currentRegion);
  useEffect(() => {
    reigions(currentRegion);
  }, [currentRegion]);
  console.log('moveToLocation: ', moveToLocation);

  //   function moveToLocation(latitude, longitude) {
  //     mapRef?.current?.animateToRegion(
  //       {
  //         latitude,
  //         longitude,
  //         latitudeDelta: 0.06,
  //         longitudeDelta: 0.008 * (15 / 20),
  //       },
  //       2000,
  //     );
  //   }

  return (
    <View style={styles.cardStyle}>
      <Text style={styles.addressText}>Your Address</Text>
      <View style={{paddingTop: hp('2%'), flexDirection: 'row'}}>
        {/* <InputField /> */}
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
            // returnKeyType: "search"
          }}
          fetchDetails={true}
          placeholder="Address"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
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
        <View style={styles.locationStyle}>
          <Image source={images.locationIcon} />
        </View>
      </View>
      <OutlineButton
        //   onPress={}
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
