import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import ProfileHeader from '../../components/Headers/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Subheading from '../../components/Subheading';
import ShortcutBox from '../../components/ShortcutBox';
import Card from '../../components/Card';

const shortcutBoxContent = [
  {
    id: 1,
    title: 'Trends',
    img: require('../../assets/images/trend.png'),
  },
  {
    id: 2,
    title: 'Nearby',
    img: require('../../assets/images/near.png'),
  },
  {
    id: 3,
    title: 'Recents',
    img: require('../../assets/images/recent.png'),
  },
  {
    id: 4,
    title: 'Popular',
    img: require('../../assets/images/popular.png'),
  },
];

const cartData = [
  {
    id: 1,
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 2,
    img: require('../../assets/images/cart2.png'),
  },
  {
    id: 3,
    img: require('../../assets/images/cart3.png'),
  },
];
const cartData2 = [
  {
    id: 1,
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 2,
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 3,
    img: require('../../assets/images/cart6.png'),
  },
];

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.bg_home}>
        {/* home header */}
        <ProfileHeader />
        <ScrollView style={{flex: 1}}>
          {/* home title */}
          <View>
            <View style={{paddingHorizontal: wp('8%')}}>
              <Text style={styles.home_heading}>Hi Sarah,</Text>
              <Text style={styles.home_title}>Lets make a new style!</Text>
            </View>

            {/* home shorcuts boxes */}
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp('8%'),
              }}>
              {shortcutBoxContent?.map(item => (
                <ShortcutBox key={item?.id} item={item} />
              ))}
            </View>
            {/* Top Style */}
            <View
              style={{
                marginVertical: 40,
                paddingVertical: 25,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: '#D49621',
              }}>
              <View>
                <View style={{paddingHorizontal: wp('8%')}}>
                  <Subheading title={'Top stylists'} />
                </View>

                <ScrollView style={{marginTop: 20, marginLeft: 30}} horizontal>
                  {cartData.map(item => (
                    <Card key={item?.id} rating={3} item={item} />
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Recent */}
            <View
              style={{
                marginBottom: 40,
                paddingVertical: 30,
                borderBottomWidth: 0.5,
                borderColor: '#D49621',
              }}>
              <View>
                <View style={{paddingHorizontal: wp('8%')}}>
                  <Subheading title={'Recent products'} />
                </View>

                <ScrollView style={{marginTop: 20, marginLeft: 30}} horizontal>
                  {cartData2.map(item => (
                    <Card key={item?.id} rating={3} item={item} />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg_home: {
    flex: 1,
    justifyContent: 'space-between',
  },
  home_heading: {
    fontSize: hp('5.5%'),
    color: '#fff',
  },
  home_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginTop: 10,
  },
});
