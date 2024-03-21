import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Subheading from '../../components/Subheading';
import Card from '../../components/Card';
import ProductCard from '../../components/ProductCard';
import ShortcutBox from '../../components/ShortcutBox';
import images from '../../assets/images';
import {useSelector, useDispatch} from 'react-redux';
import {fetchRecentProducts} from '../../redux/slices/ECommerceSlice';
import Loader from '../../components/Loader';
import colors from '../../assets/colors';
import {getTopStylists} from '../../redux/slices/StylistSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SvgArrowUPRighSmalltIcon,
  SvgArrowUPRightIcon,
  SvgBottomLineIcon,
  SvgarrowUpLeftIcon,
} from '../../components/SvgImages';
import GetLocation from 'react-native-get-location';
import {postLatLng} from '../../redux/slices/AuthSlice';

const Home = ({navigation}) => {
  const {user, pic_url, latLng} = useSelector(state => state.userData);
  const {recentProducts, recent_error, pic_baseUrl} = useSelector(
    state => state.ecommerceReducer,
  );
  const {topStylists, loading, topStylist_error} = useSelector(
    state => state.stylistReducer,
  );
  // const [currentRegion, setCurrentregion] = useState(null);

  const dispatch = useDispatch();
  const [stylistData, setStylistData] = useState([]);

  // console.log('stylistData=-=>', stylistData);

  // console.log('currentRegion=-=->', latLng);

  // console.log('topStylists====>>', topStylists);
  // console.log('recentProducts from screen====>>', recentProducts);

  useEffect(() => {
    // if (recentProducts.length < 1 || topStylists.length < 1) {
    getRecentProducts();
    getTopStylistsProfile();
    getCurrentLocation();
    // }
  }, []);

  const getRecentProducts = async () => {
    await dispatch(fetchRecentProducts());
  };

  const getTopStylistsProfile = async () => {
    await dispatch(getTopStylists(setStylistData));
  };

  const onStylistDetail = item => {
    const stylistImages = stylistData.map(item => ({
      stylist_image: item.profile_pic,
    }));

    // console.log('stylistImages==-=-=-=->',stylistImages)

    navigation.navigate('ProfileDetail', {
      profile_id: item.id,
      stylists: stylistImages,
    });
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        // setCurrentregion({
        //   latitude: location.latitude,
        //   longitude: location.longitude,
        //   latitudeDelta: 0.06,
        //   longitudeDelta: 0.008 * (15 / 20),
        // });
        if (location) {
          // console.log('currentRegion=-=-=>', currentRegion);
          dispatch(postLatLng(location));
        }
        // reigions(currentRegion);
        // moveToLocation(location.latitude, location.longitude);
        // console.log('location: ', location);
        // console.log('currentRegion6464576=-=-==>', currentRegion);
        // dispatch(postLatLng(currentRegion));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../../assets/images/homebg.png')}
          resizeMode="cover"
          style={styles.bg_home}>
          {/* home header */}
          <ScrollView style={{flex: 1}}>
            <ProfileHeader />
            {/* home title */}
            <View style={{paddingHorizontal: wp('8%')}}>
              <Text style={styles.home_heading}>
                Hi {user?.first_name + user?.last_name},
              </Text>
              <Text style={styles.home_title}>Lets make a new style!</Text>
            </View>
            {/* home shorcuts boxes */}
            <View style={styles.shortcutsBoxContainer}>
              <Pressable onPress={() => navigation.navigate('trendings')}>
                <ShortcutBox
                  title={'Trends'}
                  img={require('../../assets/images/trend.png')}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Nearby')}>
                <ShortcutBox
                  title={'Nearby'}
                  img={require('../../assets/images/near.png')}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('recents')}>
                <ShortcutBox
                  title={'Recents'}
                  img={require('../../assets/images/recent.png')}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('populars')}>
                <ShortcutBox
                  title={'Popular'}
                  img={require('../../assets/images/popular.png')}
                />
              </Pressable>
            </View>
            {/* Top Style */}
            {loading ? (
              <>
                <View style={{paddingTop: hp('2%')}}>
                  <Loader size={'large'} />
                </View>
              </>
            ) : topStylist_error !== '' ? (
              <>
                (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.errorText}>{topStylist_error}</Text>
                </View>
                )
              </>
            ) : (
              <>
                <View style={styles.topStylesContainer}>
                  <View>
                    <View
                      style={{
                        paddingHorizontal: wp('7%'),
                      }}>
                      <Subheading
                        title={'Top stylists'}
                        expandIcon={true}
                        nav={'stylist'}
                      />
                    </View>
                    <ScrollView
                      style={{marginTop: 20, marginHorizontal: hp('-3%')}}
                      horizontal
                      contentContainerStyle={{paddingHorizontal: hp('5%')}}
                      showsHorizontalScrollIndicator={false}>
                      {stylistData
                        .map(item => {
                          // console.log('stylist data item=-=->', item.product);
                          // const [
                          //   stylistProfileImageError,
                          //   setStylistProfileImageError,
                          // ] = useState(false);

                          // const handleStylistProfileImageError = () => {
                          //   setStylistProfileImageError(true);
                          // };
                          return (
                            <TouchableOpacity
                              activeOpacity={0.9}
                              key={item?.id}
                              onPress={() => onStylistDetail(item)}>
                              <Card
                                allTopStylist={true}
                                rating={
                                  item.average_rating != null
                                    ? item.average_rating
                                    : 3
                                }
                                stylist_name={item.first_name + item.last_name}
                                stylist_email={
                                  item.address != 'null' &&
                                  item.address != null &&
                                  item.address != 'undefined'
                                    ? item.address
                                    : 'address'
                                }
                                image={
                                  // stylistProfileImageError
                                  //   ? images.profile
                                  //   : item.profile_pic == 'null' &&
                                  //     item.profile_pic == null &&
                                  //     item.profile_pic == 'undefined'
                                  //   ? images.profile
                                  //   : {uri: pic_url + item.profile_pic}
                                  // item.profile_pic == null
                                  //   ? images.profile
                                  //   :
                                  item.profile_pic
                                }
                                serviceIcon={item.service}
                                productIcon={item.product}
                                // handleStylistProfileImageError={
                                //   handleStylistProfileImageError
                                // }
                              />
                            </TouchableOpacity>
                          );
                        })
                        .slice(0, 4)}
                    </ScrollView>
                  </View>
                </View>
                {/* Recent */}
                <View style={styles.recentContainer}>
                  {recentProducts.length > 0 ? (
                    <View>
                      <View style={{paddingHorizontal: wp('8%')}}>
                        <Subheading
                          title={'Recent products'}
                          expandIcon={true}
                        />
                      </View>
                      <FlatList
                        data={recentProducts.slice(0, 4)}
                        contentContainerStyle={{paddingHorizontal: hp('5%')}}
                        style={{marginTop: 20, marginHorizontal: hp('-3%')}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          // console.log(
                          //   'recentProducts items=-=-->',
                          //   item?.user.first_name + item?.user.last_name,
                          // );
                          return (
                            <TouchableOpacity
                              activeOpacity={0.9}
                              onPress={() =>
                                navigation.navigate('SingleProduct', {
                                  productID: item.id,
                                })
                              }>
                              <ProductCard
                                username={
                                  item?.user.first_name + item?.user.last_name
                                }
                                productName={item.product_name}
                                price={item.regular_price}
                                avatar={item?.user.profile_pic}
                                rating={3}
                                productImage={item.product_image}
                                productFromdetail={true}
                              />
                            </TouchableOpacity>
                          );
                        }}
                      />
                      {/* </ScrollView> */}
                    </View>
                  ) : (
                    recent_error !== '' && (
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.errorText}>{recent_error}</Text>
                      </View>
                    )
                  )}
                </View>
              </>
            )}
            {/* banner 1 */}
            {/* <View style={{paddingHorizontal: wp('8%'), marginBottom: 8}}>
              <View style={styles.bannerOneContainer}>
                <Image
                  source={require('../../assets/images/homebanner1.png')}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                  }}
                />
                <View style={styles.bannerImageView}>
                  <Image
                    source={require('../../assets/images/topleftarrow.png')}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                    }}
                  />
                </View>
                <View style={styles.bannerTitleView}>
                  <Text style={styles.bannerOneText}>Let your hair</Text>
                  <Text style={styles.bannerOneText}>Speak for itself</Text>
                </View>
              </View>
            </View> */}
            <ImageBackground
              resizeMode="contain"
              style={{
                height: hp('30%'),
                width: wp('90%'),
                alignSelf: 'center',
              }}
              source={require('../../assets/images/homeB.png')}>
              <View
                style={{
                  width: wp('40%'),
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  paddingBottom: hp(7),
                  marginRight: wp(5),
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                  }}>
                  <SvgArrowUPRightIcon />
                </View>
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#fff',
                    fontSize: hp('2.5%'),
                    fontFamily: 'Lora-Medium',
                    textAlign: 'right',
                    marginTop: hp('8%'),
                  }}>
                  Let your hair, Speak for itself
                </Text>
              </View>
            </ImageBackground>
            {/* banner 2 */}
            {/* <View style={{paddingHorizontal: wp('8%'), marginBottom: 80}}>
              <View style={styles.bannerOneContainer}>
                <Image
                  source={require('../../assets/images/homebanner2.png')}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                  }}
                />
                <View style={styles.bannerTwoImageView}>
                  <Image
                    source={require('../../assets/images/banner2support.png')}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                    }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: 12,
                  }}>
                  <Text style={styles.bannerTwoText}>Start your</Text>
                  <Text style={styles.bannerTwoText}>hair journey</Text>
                  <Text
                    style={{
                      color: 'grey',
                      marginTop: 10,
                    }}>
                    Explore stylists
                  </Text>
                  <Pressable>
                    <View style={styles.bannerButton}>
                      <Image
                        source={require('../../assets/images/topleftarrow.png')}
                        resizeMode="contain"
                        style={{
                          width: 20,
                        }}
                      />
                      <Text style={styles.bannerButtonText}>START NOW</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View> */}
            <ImageBackground
              resizeMode="contain"
              style={{
                height: hp('30%'),
                width: wp('90%'),
                alignSelf: 'center',
              }}
              source={require('../../assets/images/homeA.png')}>
              <View style={{marginLeft: wp('3%')}}>
                <Text
                  style={{
                    width: wp('40%'),
                    fontWeight: '400',
                    color: '#000',
                    fontSize: hp('3%'),
                    fontFamily: 'Lora-Medium',
                    marginTop: hp('4%'),
                  }}>
                  Start your hair journey
                </Text>
                <Text
                  style={{
                    width: wp('40%'),
                    fontWeight: '400',
                    color: '#715B1D',
                    fontSize: hp('1.8%'),
                    fontFamily: 'Lora-Medium',
                    marginTop: hp('2%'),
                  }}>
                  Explore stylists
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: '#111649',
                    width: wp('35%'),
                    height: hp('5%'),
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: hp('3%'),
                  }}>
                  <SvgArrowUPRighSmalltIcon />
                  <Text
                    style={{
                      color: '#EDBA1B',
                      fontSize: hp('1.8%'),
                      fontFamily: 'Lora-Medium',
                    }}>
                    START NOW
                  </Text>
                </View>
              </View>
            </ImageBackground>
            {/* bottom lines */}
            <View
              style={{
                paddingHorizontal: wp('8%'),
                marginBottom: 150,
                alignItems: 'center',
              }}>
              {/* <Image
                source={require('../../assets/images/bottom_lines.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                }}
              /> */}
              <SvgBottomLineIcon />
            </View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
    </>
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
    fontFamily: 'Lora-Medium',
  },
  home_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginTop: 10,
  },
  shortcutsBoxContainer: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('8%'),
  },
  topStylesContainer: {
    marginVertical: 30,
    paddingBottom: 40,
    paddingTop: 30,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#D49621',
    // backgroundColor: 'red',
  },
  recentContainer: {
    marginBottom: 40,
    paddingBottom: 40,
    borderBottomWidth: 0.5,
    borderColor: '#D49621',
  },
  bannerOneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 200,
    width: '100%',
  },
  bannerImageView: {
    position: 'absolute',
    top: 35,
    right: 12,
    height: 50,
    width: 50,
  },
  bannerTitleView: {
    position: 'absolute',
    bottom: 35,
    right: 12,
    height: 50,
  },
  bannerOneText: {
    fontWeight: '400',
    color: '#fff',
    textAlign: 'right',
    fontSize: hp('2.5%'),
    fontFamily: 'Lora-Medium',
  },
  bannerTwoImageView: {
    position: 'absolute',
    top: 18,
    right: 20,
    height: hp('35%'),
    width: wp('35%'),
  },
  bannerTwoText: {
    fontWeight: '400',
    color: '#000',
    fontSize: hp('2.5%'),
    fontFamily: 'Lora-Medium',
  },
  bannerButton: {
    height: 40,
    width: 120,
    backgroundColor: '#111649',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginTop: 10,
  },
  bannerButtonText: {
    fontWeight: '400',
    color: '#EDBA1B',
    fontSize: hp('1.5%'),
  },
  errorText: {
    color: colors.orange,
    fontSize: hp('2%'),
  },
});
