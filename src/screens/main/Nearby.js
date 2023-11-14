import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import MapView, {Marker} from 'react-native-maps';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {
  kilometers,
  markerImages,
  stylistInformations,
  tabs,
} from '../../dummyData';
import {Picker} from '@react-native-picker/picker';
import images from '../../assets/images';
import StylistInfo from '../../components/StylistInfo';

const Nearby = () => {
  const [changeTab, setChangeTab] = useState(1);
  const [selectKilometers, setSelectKilometers] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const flatListRef = useRef(null);

  const onIconPress = () => {
    flatListRef.current.setNativeProps({scrollEnabled: true});
    isDetailOpen;
    setIsDetailOpen(!isDetailOpen);
  };

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.screen}>
        <MapView
          initialRegion={{
            latitude: 44.466621,
            longitude: -70.250395,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="terrain"
          style={styles.mapStyle}>
          {markerImages.map(item => (
            <Marker
              key={item.id}
              image={item.image}
              coordinate={{latitude: item.lat, longitude: item.long}}
            />
          ))}
        </MapView>
        <View style={styles.radiusWrapper}>
          <View style={styles.mapRadius} />
        </View>
        <View style={styles.workingmapView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.tabView}>
              {tabs.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => setChangeTab(item.id)}
                  style={changeTab == item.id && styles.background}>
                  <Image
                    source={item.icon}
                    style={{height: hp('2.2%'), width: hp('2.2%')}}
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
                    style={{color: colors.black}}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.locationView}>
              <Image source={images.locationIcon} />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.barStyle,
            isDetailOpen == false
              ? {
                  top: hp('30%'),
                  left: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : {top: hp('11%'), bottom: hp('25%'), left: hp('2%')},
          ]}>
          <FlatList
            ref={flatListRef}
            data={stylistInformations}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            renderItem={({item}) => (
              <StylistInfo
                image={images.stylist3}
                isActive={isDetailOpen}
                onArrowPress={() => onIconPress()}
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
    bottom: 0,
    right: 0,
  },
});
