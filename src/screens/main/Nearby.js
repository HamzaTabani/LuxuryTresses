import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import MapView, {Marker, Circle} from 'react-native-maps';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {
  imageUrl,
  initialRegion,
  kilometers,
  markerImages,
  stylistInformations,
  tabs,
} from '../../dummyData';
import {Picker} from '@react-native-picker/picker';
import images from '../../assets/images';
import StylistInfo from '../../components/StylistInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllServices,
  getNearbyStylists,
} from '../../redux/slices/StylistSlice';
import GetLocation from 'react-native-get-location';
import {ShowToast, requestLocationPermission} from '../../utils';
import Loader from '../../components/Loader';
import ServiceDropdown from '../../components/ServiceDropdown';
import {useIsFocused} from '@react-navigation/native';

const Nearby = () => {
  const focused = useIsFocused();
  const mapRef = useRef(null);
  const [changeTab, setChangeTab] = useState(1);
  const [selectKilometers, setSelectKilometers] = useState('');
  const [currentRegion, setCurrentregion] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [cardStates, setCardStates] = useState(Array().fill(false));
  const flatListRef = useRef(null);
  const [load, setLoad] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  // console.log('selectKilometers: ', selectKilometers);
  const dispatch = useDispatch();
  const {nearbyStylists, nearbyStylists_loader} = useSelector(
    state => state.stylistReducer,
  );
  const [nearbyStylistsProfile, setNearbyStylistsProfile] = useState([]);
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [serviceLabel, setServiceLabel] = useState('');
  const [delayedEmpty, setDelayedEmpty] = useState(true);
  console.log('nearbyStylistsProfile===>', nearbyStylistsProfile);

  console.log('delayedEmpty-=-=->', delayedEmpty);

  // useEffect(() => {
  // //   // Delay rendering of empty component
  //   if (serviceId && nearbyStylistsProfile.length < 1) {
  //     alert('from if');
  //       setDelayedEmpty(false);
  //   } else {
  //     alert('from else');
  //     setDelayedEmpty(true)
  //   } // Adjust the delay time as needed (in milliseconds)

  // //   // if(serviceId && nearbyStylistsProfile.length > 0) {
  // //   //   setDelayedEmpty(true)
  // //   // } else {
  // //   //   setDelayedEmpty(false)
  // //   // }
  // }, [nearbyStylistsProfile]);

  console.log('load===>', load);
  // console.log('stylistServices0-0-0-0-', stylistServices);
  console.log('serviceId0-0-0-', serviceId);

  // console.log('serviceLabel0-0-0-', serviceLabel);

  const handleServiceId = data => {
    console.log('data=--==>', data);
    // if (data != null && data != undefined) {
    //   console.log('data53483=--==>', data);
    // setServiceId(data != null ? data[0].value : '0');
    if (!data) {
      setServiceId(null);
    } else {
      setServiceId(data.value);
    }
    // const label = data.label.replace(/^\s+/, '');
    // setServiceLabel(data != null ? data[0].label : 'Stylist');
    // setServiceLabel(
    //   data.label != undefined && data.label != null
    //     ? data.label.replace(/^\s+/, '')
    //     : null,
    // );
    // } else {
    //   setServiceId('');
    //   setServiceLabel('');
    // }
  };

  const regionLat = useSelector(state => state.userData.latLng);

  console.log(
    'nearbyStylistsProfile.length-0-0-OUTSIDE----',
    nearbyStylistsProfile.length,
  );

  console.log('regionLat=-=>', regionLat);

  // const [nearByImageError, setNearByImageError] = useState(false);

  // const handleNearByImageError = () => {
  //   setNearByImageError(true);
  // };
  // console.log('currentRegion: ', currentRegion);

  // useEffect(() => {
  //   setCurrentregion(regionLat);
  //   // console.log('defLat: ', regionLat);
  // }, [regionLat]);
  // console.log('currentRegion:', currentRegion);
  // console.log('imageUrls: ', imageUrls);

  let circleRadius = 1500;

  useEffect(() => {
    getAllStylistProfileServices();
  }, [serviceId]);

  useEffect(() => {
    if (regionLat != null) {
      // Alert.alert('abcds')
      getLatLngState();
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    } else {
      getCurrentLocation();
    }
  }, [regionLat, serviceId]);

  const getLatLngState = async () => {
    const data = {
      latitude: regionLat.latitude,
      longitude: regionLat.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.008 * (15 / 20),
    };
    // Alert.alert('dffdhbg');
    setCurrentregion(data);
    await dispatch(
      getNearbyStylists({
        lat: regionLat.latitude,
        // lat: 24.8800505,
        long: regionLat.longitude,
        // long: 67.0796143,
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

  // useEffect(() => {
  //   fetchNearbyStylists
  // }, [nearbyStylistsProfile])

  // const fetchNearbyStylists = async () => {
  //   await dispatch(
  //     getNearbyStylists({
  //       lat: currentRegion.latitude,
  //       // lat: 24.8800505,
  //       long: currentRegion.longitude,
  //       // long: 67.0796143,
  //       setNearbyStylistsProfile
  //     }),
  //   );
  // };

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
    flatListRef.current.setNativeProps({scrollEnabled: true});
    setCardStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleRegionChange = region => {
    setCurrentregion(region);
    // console.log('currentRegion: ', currentRegion);
  };

  const PreLoadImages = async () => {
    const urls = [];
    for (const item of nearbyStylistsProfile) {
      if (item.profile_pic) {
        const uri = imageUrl + item.profile_pic;
        await Image.prefetch(uri);
        urls.push(uri);
      }
    }
    setImageUrls(urls);
  };
  useEffect(() => {
    PreLoadImages();
  }, [nearbyStylistsProfile]);

  const renderMarkers = () => {
    if (!imageUrls || imageUrls.length === 0) return null;
    return nearbyStylistsProfile.map((item, index) => {
      // console.log('render markers item=->', item);
      // console.log('imageUrls[index]=-=>', imageUrls[index]);
      return (
        <Marker
          key={item.id}
          coordinate={{
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lng),
          }}>
          <Image
            source={imageUrls[index] ? {uri: imageUrls[index]} : images.profile}
            // source={
            // nearByImageError
            //   ? images.profile
            //   : item.profile_pic == 'null' &&
            //     item.profile_pic == null &&
            //     item.profile_pic == 'undefined'
            //   ? // &&
            //     // item.profile_pic
            //     images.profile
            //   :
            //     {uri: imageUrl + item.profile_pic}
            // }
            style={{
              height: 30,
              width: 30,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: 'white',
            }}
            // onError={handleNearByImageError}
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
            // lat: 24.8800505,
            long: location.longitude,
            // long: 67.0796143,
            serviceId: serviceId,
            setNearbyStylistsProfile,
            setLoad,
          }),
        );
        // await dispatch(
        //   getNearbyStylists({
        //     lat: location.latitude,
        //     // lat: 24.8800505,
        //     long: location.longitude,
        //     // long: 67.0796143,
        //     serviceId: serviceId,
        //     setNearbyStylistsProfile,
        //     setLoad,
        //   }),
        // );

        // reigions(currentRegion);
        // moveToLocation(location.latitude, location.longitude);
        // console.log('location: ', location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const emptyData = () => {
    // const delayTimeout =
    setTimeout(() => {
      // return ShowToast('No stylist found!');
      if (nearbyStylistsProfile.length < 1) {
        console.log(
          'nearbyStylistsProfile.length-0-0-',
          nearbyStylistsProfile.length,
        );
        return ShowToast('No stylist found!');
      }
    }, 4000);
    // clearTimeout(delayTimeout);
  };

  return (
    <PageWrapper>
      <ProfileHeader
        username={true}
        filter={true}
        filterActive={filterActive}
        setFilterActive={setFilterActive}
        // text={serviceLabel ? 'Nearby ' + serviceLabel : 'Nearby stylists'}
      />
      {filterActive ? (
        <View style={styles.topComponent}>
          {/* <View style={styles.pickerStyle}>
                  <Picker
                    selectedValue={selectKilometers}
                    dropdownIconColor={colors.orange}
                    dropdownIconRippleColor={colors.orange}
                    onValueChange={itemValue =>
                      setSelectKilometers(itemValue)
                    }>
                    {kilometers.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.text}
                        value={item.text}
                        style={{color: colors.black}}
                      />
                    ))}
                  </Picker>
                </View> */}
          <ServiceDropdown
            services={stylistServices}
            serviceValue={handleServiceId}
          />
        </View>
      ) : null}
      {load ? (
        <>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Loader size={'large'} />
          </View>
        </>
      ) : (
        // <View style={{flex: 1}}>
        <View style={styles.screen}>
          <View style={styles.mapContainer}>
            {
              currentRegion != null ? (
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
                      // pagingEnabled={true}
                      renderItem={({item, index}) => {
                        // console.log('itemitem534=-=-=->', item);
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
                      // ListEmptyComponent={() => {
                      //   setTimeout(() => {
                      //     console.log(
                      //       'nearbyStylistsProfile.length-0-0-',
                      //       nearbyStylistsProfile.length,
                      //     );
                      //     return ShowToast('No stylist found!');
                      //   }, 4000);
                      //   // const delayTimeout =
                      //   // setTimeout(() => {
                      //   //   if (nearbyStylistsProfile.length === null) {
                      //   //     Alert.alert('empty');
                      //   //     return ShowToast('No stylist found!');
                      //   //   } else {
                      //   //     Alert.alert('not empty ');
                      //   //   }
                      //   // }, 4000);

                      //   // clearTimeout(delayTimeout);
                      //   // Don'trender the empty component until the delay is over
                      // }}
                      ListEmptyComponent={emptyData}
                    />
                  </View>
                  {/* // ) : (
                  //   ShowToast('No stylist found!')
                  // )
                )} */}
                </>
              ) : null
              // <Text
              //   style={{
              //     color: 'white',
              //     backgroundColor: 'red',
              //     alignSelf: 'center',
              //   }}>
              //   abc
              // </Text>
              // <Text>abc</Text>
              // <TouchableOpacity onPress={() => requestLocationPermission()}>
              //   <Text
              //     style={{
              //       color: 'white',
              //       // backgroundColor: 'red',
              //       alignSelf: 'center',
              //     }}>
              //     Allow Location
              //   </Text>
              // </TouchableOpacity>
              // <MapView
              //   initialRegion={currentRegion}
              //   mapType="terrain"
              //   style={styles.mapStyle}
              // />
            }
            {/* <View style={styles.topComponent}>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={selectKilometers}
                  dropdownIconColor={colors.orange}
                  dropdownIconRippleColor={colors.orange}
                  onValueChange={itemValue => setSelectKilometers(itemValue)}>
                  {kilometers.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={item.text}
                      value={item.text}
                      style={{color: colors.black}}
                    />
                  ))}
                </Picker>
              </View>
            </View> */}
            {/* {currentRegion != null ? (
              <View style={styles.bottomComponent}>
                <FlatList
                  ref={flatListRef}
                  data={nearbyStylistsProfile}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled
                  pagingEnabled={true}
                  renderItem={({item, index}) => {
                    console.log('itemitem=-=-=->',item)
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
                      />
                    );
                  }}
                />
              </View>
            ) : null} */}
          </View>
        </View>
        // </View>
        // <Text style={{color:'white',backgroundColor:'red',alignSelf:'center'}}>abc</Text>
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
    // backgroundColor:'red'
  },
  mapContainer: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  topComponent: {
    // position: 'absolute',
    // top: 0,
    left: 5,
    // right: 0,
    // zIndex: 1,
    // alignSelf: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginHorizontal: 20,
    // paddingTop: 10,
    // backgroundColor: 'transparent',
    // paddingBottom:50
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
    // paddingHorizontal:50
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
    // backgroundColor: 'red',
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
    // marginTop:10
  },
});
