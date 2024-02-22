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
  // const [currentLatitude, setCurrentLatitude] = useState('');
  // const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentRegion, setCurrentregion] = useState(null);
  // const [currentRegion, setCurrentregion] = useState({
  //   latitude: 36.778261,
  //   latitudeDelta: 0.015,
  //   longitude: -119.4179324,
  //   longitudeDelta: 0.0121
  // });
  // const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [cardStates, setCardStates] = useState(Array().fill(false));
  const flatListRef = useRef(null);

  const dispatch = useDispatch();
  const { nearbyStylists } = useSelector(state => state.stylistReducer);

  // console.log('nearbyStylists: ',nearbyStylists.length)

  // console.log(
  //   'nearbyStylists from screeen ==================>',
  //   initialRegion.latitude,
  //   initialRegion.longitude,
  // );

  // console.log('currentLongitude: ',currentLongitude)

  let circleRadius = 1500;

  useEffect(() => {
    fetchNearbyStylists();
  });

  const fetchNearbyStylists = async () => {
    const res = await dispatch(
      getNearbyStylists({
        lat: currentRegion.latitude,
        long: currentRegion.longitude,
      }),
    );
    // console.log('from screen', res.payload.data)
  };

  const onIconPress = index => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
    // setIsDetailOpen(!isDetailOpen);
    setCardStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      // console.log('hui hui', newState[index])
      return newState;
    });
  };

  const handleRegionChange = region => {
    setCurrentregion(region);
    // console.log('moye moye', region);
    console.log('currentRegion: ', currentRegion);
  };


  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('location: ', location);
        setCurrentregion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.045
        });
      })
      .catch(error => {
        console.log('object')
        const { code, message } = error;
        console.warn(code, message);
      })
  }, []);


  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.screen}>
        {currentRegion != null ? (

          <MapView
            // onRegionChange={handleRegionChange}
            initialRegion={currentRegion}
            mapType="terrain"
            style={styles.mapStyle}>
            {nearbyStylists.map(item => {
              // console.log('objectssssss',item.profile_pic)
              return (
              <Marker
                key={item.id}

                // image={imageUrl + item.profile_pic}
                // image={imageUrl + item.profile_pic ? imageUrl + item.profile_pic : images.star}
                // style={{backgroundColor:'red',height:10,width:10}}
                coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }}
              >
                <Image
                  source={item.profile_pic != null ? { uri: imageUrl + item.profile_pic } : images.stylist1}
                  style={{ height: 30, width: 30, borderRadius: 20, borderWidth: 2, borderColor: 'white' }}
                />
              </Marker>
              )
            })}
            <Circle
              center={currentRegion}
              radius={circleRadius}
              strokeWidth={0.5}
              fillColor="rgba(239, 229, 204, 0.3)"
              strokeColor={colors.orange}
            />
          </MapView>
        ) : null}
        <View style={styles.workingmapView}>
          <View style={styles.mapHeaderWrapper}>
            <View style={styles.tabView}>
              {tabs.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => setChangeTab(item.id)}
                  style={changeTab == item.id && styles.background}>
                  <Image source={item.icon} />
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
        </View>
        <View style={[styles.barStyle, { bottom: hp('28%') }]}>
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
      </View>
    </PageWrapper>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  mapStyle: {
    height: '100%',
    width: '100%',
  },
  workingmapView: {
    position: 'absolute',
  },
  mapHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabView: {
    padding: hp('0.1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: hp('1%'),
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 50,
    alignItems: 'center',
    width: hp('16%'),
    top: 20,
    left: 10,
    backgroundColor: colors.white2,
  },
  background: {
    backgroundColor: '#ffffff',
    paddingHorizontal: hp('3%'),
    borderRadius: 50,
    padding: hp('1.7%'),
  },
  pickerStyle: {
    backgroundColor: colors.white2,
    borderWidth: 2,
    borderColor: 'lightgrey',
    left: 10,
    borderRadius: 50,
    top: 20,
    width: '40%',
    padding: hp('0.4%'),
  },
  locationView: {
    backgroundColor: colors.darkblue,
    top: 24,
    left: 40,
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: hp('7%'),
  },
  radiusWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    bottom: 160,
    top: 0,
  },
  mapRadius: {
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.orange,
    position: 'absolute',
    padding: hp('15%'),
    // height: 200,
    // width: 200,
    backgroundColor: 'rgba(239, 229, 204, 0.3)',
  },
  barStyle: {
    flexDirection: 'row',
    position: 'absolute',
    // bottom: 0,
    // right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // height: hp("50%"),
    width: '100%',
    left: 0,
  },
});
