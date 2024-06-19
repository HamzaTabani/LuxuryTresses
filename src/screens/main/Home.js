import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Subheading from '../../components/Subheading';
import Card from '../../components/Card';
import ProductCard from '../../components/ProductCard';
import ShortcutBox from '../../components/ShortcutBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecentProducts } from '../../redux/slices/ECommerceSlice';
import Loader from '../../components/Loader';
import colors from '../../assets/colors';
import { getTopStylists } from '../../redux/slices/StylistSlice';
import { SvgArrowUPRighSmalltIcon, SvgBottomLineIcon } from '../../components/SvgImages';
import GetLocation from 'react-native-get-location';
import { postLatLng } from '../../redux/slices/AuthSlice';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';

const Home = ({ navigation }) => {
  const { user } = useSelector(state => state.userData);
  const { recentProducts, recent_error } = useSelector(state => state.ecommerceReducer);
  const { loading, topStylist_error } = useSelector(state => state.stylistReducer);

  const dispatch = useDispatch();
  const [stylistData, setStylistData] = useState([]);

  useEffect(() => {
    getRecentProducts();
    getTopStylistsProfile();
    getCurrentLocation();
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
        if (location) {
          dispatch(postLatLng(location));
        }
      })
      .catch(error => {
        const { code, message } = error;
        console.log(code, message);
      });
  };

  const imageData = [
    require('../../assets/images/homeB.png'),
    require('../../assets/images/homeB.png'),
    require('../../assets/images/homeB.png'),
  ];

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.bg_home}>
        <ScrollView style={{ flex: 1 }}>
          <ProfileHeader />
          <View style={{ paddingHorizontal: wp('8%') }}>
            <Text style={styles.home_heading}>
              Hi {user?.first_name + user?.last_name},
            </Text>
            <Text style={styles.home_title}>Lets make a new style!</Text>
          </View>
          {loading ? (
            <View style={{ paddingTop: hp('30%') }}>
              <Loader size={'large'} />
            </View>
          ) : topStylist_error !== '' ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.errorText}>{topStylist_error}</Text>
            </View>
          ) : (
            <>
              <View style={styles.shortcutsBoxContainer}>
                <Pressable onPress={() => navigation.navigate('trendings')}>
                  <ShortcutBox title={'Trends'} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Nearby')}>
                  <ShortcutBox title={'Nearby'} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('recents')}>
                  <ShortcutBox title={'Recents'} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('populars')}>
                  <ShortcutBox title={'Popular'} />
                </Pressable>
              </View>
              <View style={styles.topStylesContainer}>
                <View>
                  <View style={{ paddingHorizontal: wp('7%') }}>
                    <Subheading title={'Top stylists'} expandIcon={true} nav={'stylist'} />
                  </View>
                  <ScrollView
                    style={{ marginTop: 20, marginHorizontal: hp('-3%') }}
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: hp('5%') }}
                    showsHorizontalScrollIndicator={false}>
                    {stylistData.map(item => {
                      return (
                        <TouchableOpacity
                          style={{ marginRight: 10 }}
                          activeOpacity={0.9}
                          key={item?.id}
                          onPress={() => onStylistDetail(item)}>
                          <Card
                            allTopStylist={true}
                            rating={item.average_rating}
                            stylist_name={item.first_name + item.last_name}
                            stylist_email={
                              item.address != 'null' &&
                                item.address != null &&
                                item.address != 'undefined'
                                ? item.address
                                : 'address'
                            }
                            image={item.profile_pic}
                            serviceIcon={item.service}
                            productIcon={item.product}
                          />
                        </TouchableOpacity>
                      );
                    }).slice(0, 4)}
                  </ScrollView>
                </View>
              </View>
              <View style={styles.recentContainer}>
                {recentProducts.length > 0 ? (
                  <View>
                    <View style={{ paddingHorizontal: wp('8%') }}>
                      <Subheading title={'Recent products'} expandIcon={true} />
                    </View>
                    <FlatList
                      data={recentProducts.slice(0, 4)}
                      contentContainerStyle={{ paddingHorizontal: hp('5%') }}
                      style={{ marginTop: 20, marginHorizontal: hp('-3%') }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('SingleProduct', { productID: item.id })}>
                            <ProductCard
                              username={item?.user.first_name + item?.user.last_name}
                              productName={item.product_name}
                              price={item.regular_price}
                              avatar={item?.user.profile_pic}
                              rating={item?.average_rating}
                              productImage={item.product_image}
                              productFromdetail={true}
                              home={true}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                ) : (
                  recent_error !== '' && (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.errorText}>{recent_error}</Text>
                    </View>
                  )
                )}
              </View>
              <SliderBox
                ImageComponent={FastImage}
                images={imageData}
                sliderBoxHeight={200}
                // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor="#CD8A1A"
                inactiveDotColor="#CD8A1A"
                resizeMethod={'resize'}
                // renderDots={renderDots}
                resizeMode={'cover'}
                paginationBoxStyle={{
                  position: "absolute",
                  top: -hp(20),
                  left: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(256, 256, 256, 0.6)"
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: wp(90),
                  borderWidth: 1,
                  borderColor: '#D89C24',
                  overflow: 'hidden',
                }}
              />
              <ImageBackground
                resizeMode="contain"
                style={{
                  height: hp('30%'),
                  width: wp('90%'),
                  alignSelf: 'center',
                }}
                source={require('../../assets/images/homeA.png')}>
                <View style={{ marginLeft: wp('3%') }}>
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
              <View style={{ marginBottom: hp(5), alignItems: 'center' }}>
                <SvgBottomLineIcon />
              </View>
            </>
          )}
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
  errorText: {
    color: colors.orange,
    fontSize: hp('2%'),
  },
});
