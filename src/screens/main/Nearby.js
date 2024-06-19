import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import MapView, { Marker, Circle } from 'react-native-maps';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {
  imageUrl,
  initialRegion,
  kilometers,
  markerImages,
  stylistInformations,
  tabs,
} from '../../dummyData';
import { Picker } from '@react-native-picker/picker';
import images from '../../assets/images';
import StylistInfo from '../../components/StylistInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllServices,
  getNearbyStylists,
} from '../../redux/slices/StylistSlice';
import GetLocation from 'react-native-get-location';
import { ShowToast, requestLocationPermission } from '../../utils';
import Loader from '../../components/Loader';
import ServiceDropdown from '../../components/ServiceDropdown';
import { useIsFocused } from '@react-navigation/native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';

const Nearby = () => {
  const mapRef = useRef(null);
  const [currentRegion, setCurrentregion] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [cardStates, setCardStates] = useState(Array().fill(false));
  const flatListRef = useRef(null);
  const [load, setLoad] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const dispatch = useDispatch();
  const [nearbyStylistsProfile, setNearbyStylistsProfile] = useState([]);
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [renderScreen, setRenderScreen] = useState(true);

  async function handleCheckPressed() {
    if (Platform.OS === 'android') {
      const checkEnabled = await isLocationEnabled();
      if (!checkEnabled) {
        handleEnabledPressed();
        setRenderScreen(false);
      } else {
        setRenderScreen(true);
      };
    };
  };

  async function handleEnabledPressed() {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        setLoad(true);
        getCurrentLocation();
      } catch (error) {
        console.error(error.message);
      };
    };
  };

  const handleServiceId = data => {
    if (!data) {
      setServiceId(null);
    } else {
      setServiceId(data.value);
    };
  };

  const regionLat = useSelector(state => state.userData.latLng);
  const [nearByImageError, setNearByImageError] = useState(false);

  const handleNearByImageError = () => {
    setNearByImageError(true);
  };

  let circleRadius = 1500;

  useEffect(() => {
    handleCheckPressed();
  }, [renderScreen]);

  useEffect(() => {
    getAllStylistProfileServices();
  }, [serviceId]);

  useEffect(() => {
    getLatLngSecondory();
  }, [regionLat, serviceId]);

  const getLatLngSecondory = () => {
    if (regionLat.length > 0) {
      getLatLngState();
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    } else {
      getCurrentLocation();
    }
  };

  const getLatLngState = async () => {
    const data = {
      latitude: regionLat.latitude,
      longitude: regionLat.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.008 * (15 / 20),
    };
    setCurrentregion(data);
    await dispatch(
      getNearbyStylists({
        lat: regionLat.latitude,
        long: regionLat.longitude,
        serviceId: serviceId,
        setNearbyStylistsProfile,
        setLoad,
      }),
    );
  };

  const getAllStylistProfileServices = async () => {
    await dispatch(getAllServices(setStylistServices));
    setLoad(false);
  };

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

  const onIconPress = index => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
    setCardStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const renderMarkers = () => {
    return nearbyStylistsProfile.map((item, index) => {
      return (
        <Marker
          key={item.id}
          coordinate={{
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lng),
          }}>
          <Image
            source={
              nearByImageError
                ? images.profile
                : item.profile_pic == 'null' ||
                  item.profile_pic == null ||
                  item.profile_pic == 'undefined'
                  ? images.profile
                  : { uri: item.profile_pic }
            }
            style={{
              height: 30,
              width: 30,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: 'white',
            }}
            onError={handleNearByImageError}
          />
        </Marker>
      );
    });
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async location => {
        const data = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.008 * (15 / 20),
        };
        moveToLocation(location.latitude, location.longitude);
        setCurrentregion(data);
        await dispatch(
          getNearbyStylists({
            lat: location.latitude,
            long: location.longitude,
            serviceId: serviceId,
            setNearbyStylistsProfile,
            setLoad,
          }),
        );
        setTimeout(() => {
          setRenderScreen(true);
        }, 1000);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const emptyData = () => {
    return (
      <View style={{ width: hp(30), marginHorizontal: hp(10) }}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Stylist Found!</Text>
        </View>
      </View>
    );
  };

  return (
    <PageWrapper>
      <ProfileHeader
        username={true}
        filter={true}
        filterActive={filterActive}
        setFilterActive={setFilterActive}
      />
      {filterActive ? (
        <View style={styles.topComponent}>
          <ServiceDropdown
            services={stylistServices}
            serviceValue={handleServiceId}
          />
        </View>
      ) : null}
      {load && !renderScreen ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Loader size={'large'} />
        </View>
      ) : (
        <View style={styles.screen}>
          <View style={styles.mapContainer}>
            {currentRegion != null ? (
              <>
                <MapView
                  ref={mapRef}
                  initialRegion={currentRegion}
                  mapType="terrain"
                  style={styles.mapStyle}>
                  {renderMarkers()}
                  <Circle
                    center={currentRegion}
                    radius={circleRadius}
                    strokeWidth={0.5}
                    fillColor="rgba(239, 229, 204, 0.3)"
                    strokeColor={colors.orange}
                  />
                </MapView>

                <View style={styles.bottomComponent}>
                  <FlatList
                    ref={flatListRef}
                    data={nearbyStylistsProfile}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    renderItem={({ item, index }) => {
                      return (
                        <StylistInfo
                          image={item.profile_pic}
                          isActive={cardStates[index]}
                          onArrowPress={() => onIconPress(index)}
                          flatListRef={flatListRef}
                          name={item.first_name + item.last_name}
                          address={item.address}
                          distance={item.distance}
                          description={item.about}
                          rating={item.average_rating}
                          serviceIcon={item.service}
                          productIcon={item.product}
                          profileId={item.id}
                        />
                      );
                    }}
                    ListEmptyComponent={emptyData}
                  />
                </View>
              </>
            ) : null}
          </View>
        </View>
      )}
    </PageWrapper>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  mapContainer: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  topComponent: {
    left: 5,
  },
  bottomComponent: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: colors.white2,
    width: 130,
  },
  background: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    borderRadius: 50,
    paddingVertical: 15,
  },
  pickerStyle: {
    backgroundColor: colors.white2,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 50,
    width: '40%',
    paddingVertical: 5,
  },
  locationView: {
    backgroundColor: colors.darkblue,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  emptyContainer: {
    backgroundColor: '#D49621',
    width: hp(28),
    height: hp(5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emptyText: {
    color: colors.white,
    fontSize: hp(2),
    fontWeight: 'bold',
  },
});