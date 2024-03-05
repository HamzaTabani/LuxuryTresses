import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import MapView from 'react-native-maps';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {tabs} from '../../dummyData';

const Nearby = () => {
  const [changeTab, setChangeTab] = useState(1);

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.screen}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="terrain"
          style={styles.mapStyle}
        />
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
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
    marginTop: hp('4%'),
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
    padding: hp('0.6%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: hp('1%'),
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 50,
    alignItems: 'center',
    width: hp('20%'),
    top: 20,
    left: 10,
    backgroundColor: colors.white2,
  },
  background: {
    backgroundColor: '#ffffff',
    paddingHorizontal: hp('4%'),
    borderRadius: 50,
    padding: hp('1.7%'),
  },
});
