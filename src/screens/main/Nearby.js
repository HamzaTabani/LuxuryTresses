import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
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
import {getNearbyStylists} from '../../redux/slices/StylistSlice';
import GetLocation from 'react-native-get-location';
import {requestLocationPermission} from '../../utils';
import Loader from '../../components/Loader';

const Nearby = () => {
  const [changeTab, setChangeTab] = useState(1);
  const [selectKilometers, setSelectKilometers] = useState('');
  const [currentRegion, setCurrentregion] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [cardStates, setCardStates] = useState(Array().fill(false));
  const flatListRef = useRef(null);
  // console.log('selectKilometers: ', selectKilometers);
  const dispatch = useDispatch();
  const {nearbyStylists, nearbyStylists_loader} = useSelector(
    state => state.stylistReducer,
  );
  console.log('nearbyStylists===>', nearbyStylists);
  // console.log('nearbyStylists_loader===>', nearbyStylists_loader);

  const regionLat = useSelector(state => state.userData.latLng);

  const [nearByImageError, setNearByImageError] = useState(false);

  const handleNearByImageError = () => {
    setNearByImageError(true);
  };
  // console.log('defLatcd: ', regionLat);

  // useEffect(() => {
  //   setCurrentregion(regionLat);
  //   // console.log('defLat: ', regionLat);
  // }, [regionLat]);
  // console.log('currentRegion:', currentRegion);
  // console.log('imageUrls: ', imageUrls);

  let circleRadius = 1500;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // const fetchNearbyStylists = async () => {
  //   await dispatch(
  //     getNearbyStylists({
  //       lat: currentRegion.latitude,
  //       // lat: 24.8800505,
  //       long: currentRegion.longitude,
  //       // long: 67.0796143,
  //     }),
  //   );
  // };

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
    for (const item of nearbyStylists) {
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
  }, [nearbyStylists]);

  const renderMarkers = () => {
    if (!imageUrls || imageUrls.length === 0) return null;
    return nearbyStylists.map((item, index) => {
      console.log('render markers item=->', item);
      console.log('imageUrls[index]=-=>', imageUrls[index]);
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
        setCurrentregion(data);
        await dispatch(
          getNearbyStylists({
            lat: location.latitude,
            // lat: 24.8800505,
            long: location.longitude,
            // long: 67.0796143,
          }),
        );
        // reigions(currentRegion);
        // moveToLocation(location.latitude, location.longitude);
        // console.log('location: ', location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      {nearbyStylists_loader ? (
        <>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Loader size={'large'} />
          </View>
        </>
      ) : (
        <View style={styles.screen}>
          <View style={styles.mapContainer}>
            {
              currentRegion != null ? (
                <>
                  <MapView
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
                  <View style={styles.topComponent}>
                    <View style={styles.pickerStyle}>
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
                    </View>
                  </View>
                  <View style={styles.bottomComponent}>
                    <FlatList
                      ref={flatListRef}
                      data={nearbyStylists}
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
                    />
                  </View>
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
                  data={nearbyStylists}
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
  },
  mapContainer: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
  topComponent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
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
