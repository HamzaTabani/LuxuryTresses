import {Alert, StyleSheet, Platform, View} from 'react-native';
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
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import Loader from '../../components/Loader';

const SelectLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentRegion, setCurrentregion] = useState(null);
  const mapRef = useRef(null);
  const {latLng} = useSelector(state => state.userData);
  const [renderScreen, setRenderScreen] = useState(false);
  const [load, setLoad] = useState(true);
  console.log('Latcd=--=-> ', latLng);
  console.log('latLng.length >0', Object.keys(latLng).length > 0);
  console.log('renderScreen-=-=>', renderScreen);

  useEffect(() => {
    handleCheckPressed();
  }, [renderScreen]);

  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      console.log('checkEnabled=-=->', checkEnabled);

      if (!checkEnabled) {
        handleEnabledPressed();
        // setRenderScreen(false);
        setLoad(true);
      } else {
        setRenderScreen(true);
        setLoad(false);
      }
    }
  }

  async function handleEnabledPressed() {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        getCurrentLocation(false);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      } catch (error) {
        // if (error instanceof Error) {
        console.error(error.message);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
        // }
      }
    }
  }

  const getCurrentLocation = abc => {
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
        console.log('location: ', location);
        setLoad(false);
        setRenderScreen(true);

        if (abc) {
          moveToLocation(location.latitude, location.longitude);
          setTimeout(() => {
            navigation.goBack();
            return ShowToast('Location has been saved.');
          }, 3000);
        }
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
      {load ? (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Loader size={'large'} />
          </View>
        </>
      ) : (
        <>
          {renderScreen && (
            <>
              {
                Object.keys(latLng).length > 0 && (
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
          )}
        </>
      )}
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
