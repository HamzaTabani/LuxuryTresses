import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
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
import { getNearbyStylists } from '../../redux/slices/StylistSlice';
import GetLocation from 'react-native-get-location'

const Nearby = () => {
  const [changeTab, setChangeTab] = useState(1);
  const [selectKilometers, setSelectKilometers] = useState('');
  const [currentRegion, setCurrentregion] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [cardStates, setCardStates] = useState(Array().fill(false));
  const flatListRef = useRef(null);

  const dispatch = useDispatch();
  const { nearbyStylists } = useSelector(state => state.stylistReducer);

  console.log('imageUrls: ', imageUrls)


  let circleRadius = 1500;

  useEffect(() => {
    getCurrentLocation()
    fetchNearbyStylists();
  }, []);

  const fetchNearbyStylists = async () => {
    await dispatch(
      getNearbyStylists({
        lat: currentRegion.latitude,
        long: currentRegion.longitude,
      }),
    );
  };

  const onIconPress = index => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
    // setIsDetailOpen(!isDetailOpen);
    setCardStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleRegionChange = region => {
    setCurrentregion(region);
    console.log('currentRegion: ', currentRegion);
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('location: ', location);
        setCurrentregion({
          latitude: location.latitude,
          longitude: location.longitude,
          // latitudeDelta: 0.012,
          // longitudeDelta: 0.045
          latitudeDelta: 0.060,
          longitudeDelta: 0.008 * (15 / 20),
        });
      })
      .catch(error => {
        console.log('object')
        const { code, message } = error;
        console.warn(code, message);
      })

  }

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

  }
  useEffect(() => {

    PreLoadImages();
  }, [nearbyStylists]);

  const renderMarkers = () => {
    if (!imageUrls || imageUrls.length === 0) return null;
    return nearbyStylists.map((item, index) => (
      <Marker
        key={item.id}
        coordinate={{
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lng)
        }}
      >
        <Image
          source={imageUrls[index] ? { uri: imageUrls[index] } : images.stylist1}
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: 'white'
          }}
        />
      </Marker>
    ));
  };



  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.screen}>
        {/* MapView Container */}
        <View style={styles.mapContainer}>
          {currentRegion != null ? (
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
          ) : (
            <MapView
              initialRegion={currentRegion}
              mapType="terrain"
              style={styles.mapStyle} />
          )}
          {/* Top Component */}
          <View style={styles.topComponent}>
            <View style={styles.tabView}>
              {tabs.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => setChangeTab(item.id)}
                  // onPress={() => console.log('changeTabcd:', item.id)}
                  style={changeTab == item.id && styles.background}>
                  <Image source={item.icon} style={changeTab != item.id && { marginHorizontal: 10 }} />
                </TouchableOpacity>
              ))}
            </View>
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
                    style={{ color: colors.black }}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.locationView}>
              <Image source={images.locationIcon} />
            </View>
          </View>
          {/* Bottom Component */}
          {currentRegion != null ? (
            <View style={styles.bottomComponent}>
              <FlatList
                ref={flatListRef}
                data={nearbyStylists}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                pagingEnabled={true}
                renderItem={({ item, index }) => (
                  <StylistInfo
                    image={item.profile_pic}
                    isActive={cardStates[index]}
                    onArrowPress={() => onIconPress(index)}
                    flatListRef={flatListRef}
                    name={item.first_name + item.last_name}
                    address={item.address}
                    distance={item.distance}
                  />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    </PageWrapper>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
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
    width: 130
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
