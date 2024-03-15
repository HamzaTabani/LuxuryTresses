import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VenderCardBox from '../../components/VenderCardBox';
import ProductCardBox from '../../components/ProductCardBox';
import {getPopularStylists} from '../../redux/slices/StylistSlice';
import {useDispatch, useSelector} from 'react-redux';
import {SvgGoldBagIcon, SvgGoldSeatIcon} from '../../components/SvgImages';
import images from '../../assets/images';

const cartData = [
  {
    id: 1,
    name: 'Omnis iste',
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 2,
    name: 'Omnis iste',
    img: require('../../assets/images/cart2.png'),
  },
  {
    id: 3,
    name: 'Omnis iste',
    img: require('../../assets/images/cart3.png'),
  },
  {
    id: 4,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 5,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 6,
    name: 'Omnis iste',
    img: require('../../assets/images/cart6.png'),
  },
];

const cartData2 = [
  {
    id: 1,
    name: 'Omnis iste',
    img: require('../../assets/images/cart6.png'),
  },
  {
    id: 2,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 3,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 4,
    name: 'Omnis iste',
    img: require('../../assets/images/cart3.png'),
  },
  {
    id: 5,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 6,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
];

const Popular = () => {
  const [filterTab, setFilterTab] = useState('tab1');

  const {popularStylists} = useSelector(state => state.stylistReducer);
  const {user, pic_url} = useSelector(state => state.userData);

  const getPopularStylistsProfile = async () => {
    await dispatch(getPopularStylists());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (popularStylists.length < 1) {
      getPopularStylistsProfile();
    }
  }, []);

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Popular</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            {/* filter tab */}
            <View style={styles.filterTabs}>
              <Pressable onPress={() => setFilterTab('tab1')}>
                <View
                  style={
                    filterTab === 'tab1'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <SvgGoldSeatIcon />
                </View>
              </Pressable>
              <Pressable onPress={() => setFilterTab('tab2')}>
                <View
                  style={
                    filterTab === 'tab2'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <SvgGoldBagIcon />
                </View>
              </Pressable>
            </View>
            {/* filter icon */}
            <View style={styles.filterButton}>
              <Image source={require('../../assets/images/filtericon.png')} />
            </View>
          </View>
        </View>

        {/*/////////////  filter items container ////////////// */}
        {/* venders listing */}
        {filterTab === 'tab1' ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            {popularStylists?.map(item => (
              <VenderCardBox
                key={item.id}
                itemId={item.id}
                name={item.first_name + ' ' + item.last_name}
                img={
                  item.profile_pic != null
                    ? {uri: pic_url + item.profile_pic}
                    : images.cart1
                }
                email={
                  item.address != 'null' &&
                  item.address != null &&
                  item.address != 'undefined'
                    ? item.address
                    : 'address'
                }
                ratings={item.average_rating != null ? item.average_rating : 3}
              />
            ))}
            <View
              style={{
                paddingHorizontal: wp('8%'),
                marginTop: 50,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/bottom_linesA.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                }}
              />
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            {cartData2?.map(item => (
              <ProductCardBox key={item.id} name={item.name} img={item.img} />
            ))}
            <View
              style={{
                paddingHorizontal: wp('8%'),
                marginTop: 50,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/bottom_linesA.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  trendingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hp('1.2%'),
  },
  mainTitleText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  filterTabs: {
    height: 50,
    width: 120,
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },
  filterButton: {
    height: 50,
    width: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter_tab_active: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  filter_tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Popular;
