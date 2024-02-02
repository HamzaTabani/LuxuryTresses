import React, {useEffect} from 'react';
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

const Home = ({navigation}) => {
  const {user, pic_url} = useSelector(state => state.userData);
  const {recentProducts, recent_error, productDetails} = useSelector(
    state => state.ecommerceReducer,
  );
  const {topStylists, loading, topStylist_error} = useSelector(
    state => state.stylistReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (recentProducts.length < 1 || topStylists.length < 1) {
      getRecentProducts();
      getTopStylistsProfile();
    }
  }, []);

  const getRecentProducts = async () => {
    await dispatch(fetchRecentProducts());
  };

  const getTopStylistsProfile = async () => {
    await dispatch(getTopStylists());
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
                    <View style={{paddingHorizontal: wp('8%')}}>
                      {/* <TouchableOpacity
                        onPress={() => navigation.navigate('TopStylists')}> */}
                      <Subheading title={'Top stylists'} />
                      {/* </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      style={{marginTop: 20, marginHorizontal: hp('-3%')}}
                      horizontal
                      contentContainerStyle={{paddingHorizontal: hp('5%')}}
                      showsHorizontalScrollIndicator={false}>
                      {topStylists.map(item => {
                        // console.log(
                        //   'stylist profile image ==============>',
                        //   item.profile_pic,
                        // );
                        return (
                          <TouchableOpacity
                            activeOpacity={0.9}
                            key={item?.id}
                            onPress={() =>
                              navigation.navigate('ProfileDetail', {
                                profile_id: item.id,
                              })
                            }>
                            <Card
                              rating={3}
                              stylist_name={item.first_name + item.last_name}
                              stylist_email={
                                item.email === 'undefined'
                                  ? 'test123@gmail.com'
                                  : item.email
                              }
                              image={
                                item.profile_pic == null
                                  ? images.cart1
                                  : {uri: pic_url + item.profile_pic}
                              }
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
                {/* Recent */}
                <View style={styles.recentContainer}>
                  {recentProducts.length > 0 ? (
                    <View>
                      <View style={{paddingHorizontal: wp('8%')}}>
                        <Subheading title={'Recent products'} />
                      </View>
                      {/* <ScrollView
                  style={{ marginTop: 20, marginHorizontal: hp('-3%') }}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: hp('5%') }}
                  horizontal> */}
                      {/* {cartData2.map(item => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={item?.id}
                      onPress={() => navigation.navigate('RecentProducts')}>
                      <ProductCard rating={3} item={item} />
                    </TouchableOpacity>
                  ))} */}
                      <FlatList
                        data={recentProducts}
                        contentContainerStyle={{paddingHorizontal: hp('5%')}}
                        style={{marginTop: 20, marginHorizontal: hp('-3%')}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          //  console.log('hululu', item)
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
                                avatar={{uri: pic_url + item?.user.profile_pic}}
                                rating={3}
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
            <View style={{paddingHorizontal: wp('8%'), marginBottom: 8}}>
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
            </View>
            {/* banner 2 */}
            <View style={{paddingHorizontal: wp('8%'), marginBottom: 80}}>
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
            </View>
            {/* bottom lines */}
            <View
              style={{
                paddingHorizontal: wp('8%'),
                marginBottom: 150,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/bottom_lines.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                }}
              />
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
