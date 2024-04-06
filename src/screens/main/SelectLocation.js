import {Alert, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import MapHeader from '../../components/MapHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LocationCard from '../../components/LocationCard';
import colors from '../../assets/colors';
import {initialRegion} from '../../dummyData';
import images from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import GetLocation from 'react-native-get-location';
import {postLatLng} from '../../redux/slices/AuthSlice';
import {ShowToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SelectLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentRegion, setCurrentregion] = useState(null);
  const mapRef = useRef(null);
  const {latLng} = useSelector(state => state.userData);
  console.log('defLatcd: ', latLng);

  // useEffect(() => {
  //   // setCurrentregion(regionLat);
  //   // console.log('fgffgff: ', regionLat);
  //   getCurrentLocation();
  // }, []);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // Alert.alert('hello');
        dispatch(
          postLatLng({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.008 * (15 / 20),
          }),
        );
        // reigions(currentRegion);
        moveToLocation(location.latitude, location.longitude);
        navigation.goBack();
        console.log('location: ', location);
        return ShowToast('Location has been saved.');
      })
      .catch(error => {
        const {code, message} = error;
        console.log(code, message);
      });
  };

  let circleRadius = 1500;
  // console.log('initialRegion: ', initialRegion);
  // console.log('currentRegion---: ', currentRegion);

  useEffect(() => {
    mapRef.current = mapRef.current || {};
  }, []);

  function moveToLocation(latitude, longitude) {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.008 * (15 / 20),
      },
      2000,
    );
  }

  // const dataReigions = data => {
  //   console.log('data6546=-=-', data);
  //   setCurrentregion(data);
  // };

  // console.log('dataReigions656546=-==-',dataReigions)

  return (
    <>
      {
        latLng != null && (
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: latLng?.latitude,
              longitude: latLng?.longitude,
              latitudeDelta: 0.06,
              longitudeDelta: 0.008 * (15 / 20),
            }}
            mapType="terrain"
            style={styles.mapStyle}>
            <Marker
              coordinate={{
                latitude: latLng?.latitude,
                longitude: latLng?.longitude,
              }}
              image={images.locationMarker}
            />
            <Circle
              center={latLng}
              strokeWidth={0.5}
              radius={circleRadius}
              fillColor="rgba(239, 229, 204, 0.3)"
              strokeColor={colors.orange}
            />
          </MapView>
        )
        //  : (
        //   <MapView
        //     ref={mapRef}
        //     initialRegion={currentRegion}
        //     mapType="terrain"
        //     style={styles.mapStyle}></MapView>
        // )
      }
      <MapHeader />
      <LocationCard
        mapRef={mapRef}
        moveToLocation={(lat, long) => moveToLocation(lat, long)}
        getCurrentLocation={getCurrentLocation}
      />
    </>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  mapStyle: {
    height: '100%',
    width: '100%',
  },
  workingmapView: {
    position: 'absolute',
  },
  radiusWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  mapRadius: {
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.orange,
    position: 'absolute',
    padding: hp('15%'),
    backgroundColor: 'rgba(239, 229, 204, 0.3)',
  },
});
