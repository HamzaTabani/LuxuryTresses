import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useRef, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import MapView, { Marker, Circle } from 'react-native-maps';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {
  initialRegion,
  kilometers,
  markerImages,
  stylistInformations,
  tabs,
} from '../../dummyData';
import { Picker } from '@react-native-picker/picker';
import images from '../../assets/images';
import StylistInfo from '../../components/StylistInfo';

const Nearby = () => {
  const [changeTab, setChangeTab] = useState(1);
  const [selectKilometers, setSelectKilometers] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // const [cardStates, setCardStates] = useState(Array().fill(false))
  const flatListRef = useRef(null);

  let circleRadius = 1500;

  const onIconPress = (index) => {
    flatListRef.current.setNativeProps({ scrollEnabled: true });
    setIsDetailOpen(!isDetailOpen)
    // setCardStates(prevState => {
    //   const newState = [...prevState]
    //   newState[index] = !newState[index]
    //   console.log('hui hui', newState[index])
    //   return newState
    // })
  };

  const handleRegionChange = (region) => {
    console.log('moye moye', region)
  };

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.screen}>
        <MapView
          onRegionChange={(region) => handleRegionChange(region)}
          initialRegion={initialRegion}
          mapType="terrain"
          style={styles.mapStyle}>
          {markerImages.map(item => (
            <Marker
              key={item.id}
              image={item.image}
              coordinate={{ latitude: item.lat, longitude: item.long }}
            />
          ))}
          <Circle
            center={{ latitude: 44.474621, longitude: -70.250395 }}
            radius={circleRadius}
            strokeWidth={0.5}
            fillColor='rgba(239, 229, 204, 0.3)'
            strokeColor={colors.orange}
          />
        </MapView>
        <View style={styles.workingmapView}>
          <View style={styles.mapHeaderWrapper}>
            <View style={styles.tabView}>
              {tabs.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => setChangeTab(item.id)}
                  style={changeTab == item.id && styles.background}>
                  <Image
                    source={item.icon}
                  />
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
        <View style={[styles.barStyle, { bottom: hp("28%") }]}>
          <FlatList
            ref={flatListRef}
            data={stylistInformations}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            pagingEnabled={true}
            renderItem={({ item, index }) => (
              <StylistInfo
                image={item.image}
                isActive={isDetailOpen}
                onArrowPress={() => onIconPress(index)}
                flatListRef={flatListRef}
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
    justifyContent: 'space-between'
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
    justifyContent: "center",
    alignItems: "center",
    // height: hp("50%"),
    width: "100%",
    left: 0

  },
});
