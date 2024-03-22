import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import images from '../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import Container from '../../components/Container';
import ReviewCard from '../../components/ReviewCard';
import {products, stylistImages} from '../../dummyData';
import TimingCard from '../../components/TimingCard';
import OutlineButton from '../../components/OutlineButton';
import MessageOption from '../../components/MessageOption';
import {useState} from 'react';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {stylistProfileById} from '../../redux/slices/StylistSlice';
import Loader from '../../components/Loader';
import {
  SvgGoldBagIcon,
  SvgGoldIcon,
  SvgGoldSeatIcon,
} from '../../components/SvgImages';

const ProfileDetail = ({route}) => {
  const [tabActive, setTabActive] = useState('');
  const [serviceIcon, setServiceIcon] = useState(false);
  const [productIcon, setProductIcon] = useState(false);
  const navigation = useNavigation();

  // console.log('seviceIcon->', serviceIcon, 'productIcon->', productIcon);

  const id = route?.params?.profile_id;
  // const moreStylist = route?.params?.stylists;
  console.log('profile_id', id);
  // console.log('moreStylist', moreStylist);
  const [profiledetail, setProfiledetail] = useState(null);
  const dispatch = useDispatch();

  const {profileDetails, profileDetails_loading, profileDetails_error} =
    useSelector(state => state.stylistReducer);

  const {pic_url} = useSelector(state => state.userData);
  console.log('profile detail from screen =========>', profiledetail);
  // console.log('profile loader =========>', profileDetails_loading);

  const [stylistProfileImageError, setStylistProfileImageError] =
    useState(false);

  const handleStylistProfileImageError = () => {
    setStylistProfileImageError(true);
  };

  useEffect(() => {
    // if (!profileDetails) {
    fetchProfileDetailss();
    // }
  }, []);

  const fetchProfileDetailss = async () => {
    // if (profileDetails?.id !== id) {
    const res = await dispatch(stylistProfileById(id));
    setProfiledetail(res.payload.data);
    // }
  };

  useEffect(() => {
    if (profiledetail != null) {
      if (
        profiledetail?.services.length < 1 &&
        profiledetail?.products.length >= 1 &&
        !profileDetails_loading
      ) {
        setTabActive('product');
        setProductIcon(true);
      } else if (
        profiledetail?.products.length < 1 &&
        profiledetail?.services.length >= 1 &&
        !profileDetails_loading
      ) {
        setTabActive('service');
        setServiceIcon(true);
      }
    }
  }, [profiledetail]);

  return (
    <Container>
      {profiledetail == null ? (
        <>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Loader size={'large'} />
          </View>
        </>
      ) : (
        //  : profileDetails_error != '' ? (
        //   <>
        //     <View
        //       style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        //       <Text style={{color:'white'}}>No record Found</Text>
        //     </View>
        //   </>
        // )
        <>
          <ProfileHeader
            username={true}
            icon={true}
            text={profiledetail?.first_name + ' ' + profiledetail?.last_name}
          />
          <ScrollView
            contentContainerStyle={styles.screen}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <Image
                source={
                  stylistProfileImageError
                    ? images.profile
                    : profiledetail?.profile_pic == 'null' &&
                      profiledetail?.profile_pic == null &&
                      profiledetail?.profile_pic == 'undefined'
                    ? images.profile
                    : {uri: pic_url + profiledetail?.profile_pic}
                  // profiledetail?.profile_pic == null
                  //   ? images.stylist1
                  //   : {uri: pic_url + profiledetail?.profile_pic}
                }
                style={styles.imageStyle}
                resizeMode="cover"
                borderRadius={20}
                onError={handleStylistProfileImageError}
              />
              <View style={styles.textWrapper}>
                <Text style={styles.name}>
                  {profiledetail?.first_name + ' ' + profiledetail?.last_name}
                </Text>
                <Text style={styles.location}>
                  {profiledetail?.email === 'undefined'
                    ? 'test123@gmail.com'
                    : profiledetail?.email}
                  {/* <Text style={{color: colors.white, fontWeight: 'bold'}}>
                (2km)
              </Text> */}
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  {serviceIcon ? (
                    <View style={styles.iconView}>
                      <SvgGoldSeatIcon />
                    </View>
                  ) : null}
                  {productIcon ? (
                    <View style={[styles.iconView]}>
                      <SvgGoldBagIcon />
                    </View>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                style={{marginTop: hp('7%')}}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Nearby')}>
                <Image
                  source={images.stylist2}
                  style={styles.exploreImage}
                  borderRadius={10}
                />
                <Text style={styles.exploreText}>Explore</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: hp('4%')}}>
              <ReviewCard
                onPress={() =>
                  navigation.navigate('Reviews', {
                    name: profiledetail?.first_name + profiledetail?.last_name,
                    email:
                      profiledetail?.address != 'null' &&
                      profiledetail?.address != null &&
                      profiledetail?.address != 'undefined'
                        ? profiledetail?.address
                        : 'address',
                    img:
                      profiledetail?.profile_pic != null
                        ? {uri: pic_url + profiledetail?.profile_pic}
                        : images.cart1,
                    id: profiledetail?.id,
                    ratings: profiledetail?.average_rating,
                  })
                }
                averageRating={profiledetail?.average_rating}
                totalCustomerRating={profiledetail?.customer_rating}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>
                About{' '}
                {profiledetail?.first_name + ' ' + profiledetail?.last_name}
              </Text>
              <Text style={styles.message}>
                {profiledetail?.about != null ? profiledetail?.about : 'about'}
              </Text>
            </View>
            {tabActive === 'product' ? (
              <View style={[styles.btn_wrapperA, {marginTop: hp('4%')}]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Products</Text>
                </View>
              </View>
            ) : tabActive === 'service' ? (
              <View style={[styles.btn_wrapperA, {marginTop: hp('4%')}]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Services</Text>
                </View>
              </View>
            ) : profiledetail?.services?.length < 1 &&
              profiledetail?.products?.length < 1 ? null : (
              <View style={{paddingTop: hp('4%')}}>
                <View style={styles.btn_wrapper}>
                  <TouchableOpacity
                    style={
                      tabActive === 'service' ? styles.btns_active : styles.btns
                    }
                    onPress={() => setTabActive('service')}>
                    <Text
                      style={
                        tabActive == 'service'
                          ? styles.btns_active_text
                          : styles.btns_text
                      }>
                      Services
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      tabActive !== 'service' ? styles.btns_active : styles.btns
                    }
                    onPress={() => setTabActive('product')}>
                    <Text
                      style={
                        tabActive !== 'service'
                          ? styles.btns_active_text
                          : styles.btns_text
                      }>
                      Products
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* {tabActive === 'product' ? (
              <View style={[styles.btn_wrapperA, {marginTop: hp('4%')}]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Products</Text>
                </View>
              </View>
            ) : tabActive === 'service' ? (
              <View style={[styles.btn_wrapperA, {marginTop: hp('4%')}]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Services</Text>
                </View>
              </View>
            ) : profileDetails.services.length < 1 &&
              profileDetails.products.length < 1 ? null : (
              <View style={{paddingTop: hp('4%')}}>
                <View style={styles.btn_wrapper}>
                  <TouchableOpacity
                    style={
                      tabActive === 'service' ? styles.btns_active : styles.btns
                    }
                    onPress={() => setTabActive('service')}>
                    <Text
                      style={
                        tabActive == 'service'
                          ? styles.btns_active_text
                          : styles.btns_text
                      }>
                      Services
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      tabActive !== 'service' ? styles.btns_active : styles.btns
                    }
                    onPress={() => setTabActive('product')}>
                    <Text
                      style={
                        tabActive !== 'service'
                          ? styles.btns_active_text
                          : styles.btns_text
                      }>
                      Products
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )} */}

            {tabActive === 'service' ? (
              <View style={{paddingTop: hp('4%')}}>
                {/* <View style={styles.imageWrapper}>
                  {moreStylist?.slice(20, 24).map((item, i) => {
                    // console.log(item.profile_pic)
                    return (
                      <View key={i}>
                        <Image
                          key={item.id}
                          source={{uri: pic_url + item.stylist_image}}
                          borderRadius={15}
                          blurRadius={i == 3 ? 25 : 0}
                          style={styles.image}
                        />
                        <View style={styles.absoluteText}>
                          <Text style={styles.moreText}>
                            {i == 3 && 'More'}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View> */}
                <View style={{paddingTop: hp('4%'), marginTop: hp('4%')}}>
                  <TimingCard />
                  <View style={{paddingTop: hp('5%'), flexDirection: 'row'}}>
                    <OutlineButton
                      title={'BOOK NOW'}
                      buttonStyle={{width: '80%'}}
                      textStyle={{color: colors.white}}
                      onPress={() =>
                        navigation.navigate('Booking', {
                          bookingData: profiledetail,
                        })
                      }
                    />
                    <View style={{marginLeft: hp('2%')}}>
                      <MessageOption />
                    </View>
                  </View>
                </View>
              </View>
            ) : tabActive === 'product' ? (
              <View style={{paddingTop: hp('4%')}}>
                <FlatList
                  data={profiledetail?.products}
                  keyExtractor={(item, ind) => ind}
                  renderItem={({item}) => {
                    console.log('profileDetails.products items==>', item.id);
                    return (
                      <TouchableOpacity
                        style={{marginBottom: hp('3.5%')}}
                        activeOpacity={0.9}
                        onPress={() =>
                          navigation.navigate('SingleProduct', {
                            productID: item.id,
                          })
                        }>
                        <ProductCard
                          avatar={images.profile2}
                          username={'username'}
                          title={item.product_name}
                          price={item.regular_price}
                          rating={3}
                          item={item}
                          product={true}
                          productImage={item.product_image}
                          productFromdetail={false}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  columnWrapperStyle={{justifyContent: 'space-evenly'}}
                  numColumns={2}
                />
              </View>
            ) : null}
          </ScrollView>
        </>
        // null
      )}
    </Container>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
    paddingBottom: hp('22%'),
    paddingTop: hp('4%'),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: hp('18%'),
    width: '38%',
  },
  textWrapper: {
    paddingTop: hp('5%'),
  },
  name: {
    color: colors.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  location: {
    color: colors.white,
    fontSize: hp('1.6%'),
    marginTop: hp('1%'),
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: hp('1.4%'),
    height: hp('4%'),
    width: hp('4%'),
    borderRadius: 50,
  },
  exploreImage: {
    height: hp('8%'),
    width: hp('9%'),
  },
  exploreText: {
    marginTop: hp('1%'),
    color: colors.white,
    fontSize: hp('2%'),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  textContainer: {
    paddingTop: hp('3%'),
    marginLeft: hp('1%'),
  },
  message: {
    marginTop: hp('2%'),
    color: colors.white,
    fontSize: 12,
    lineHeight: 25,
  },
  image: {
    height: 75,
    width: 75,
  },
  imageWrapper: {
    paddingTop: hp('5%'),
    // marginRight: hp()
    height: '19%',
    width: '19%',
    flexDirection: 'row',
    gap: 12,
  },
  moreText: {
    color: colors.white,
    position: 'absolute',
    right: hp('3.7%'),
    fontWeight: 'bold',
    top: hp('3.5%'),
    fontSize: hp('2%'),
  },
  btn_wrapper: {
    borderWidth: 1.2,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    // backgroundColor:'red'
  },
  btn_wrapperA: {
    borderWidth: 1.2,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 4,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // gap: 5,
    // backgroundColor:'red'
  },
  btns_active: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 50,
    width: hp('20%'),
    alignItems: 'center',
  },
  btns_activeA: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 50,
    width: hp('45%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  btns: {
    backgroundColor: 'transparent',
    paddingHorizontal: wp(16),
    paddingVertical: 10,
    borderRadius: 50,
  },
  btns_active_text: {
    color: '#000',
  },
  btns_active_textA: {
    color: '#000',
    textAlign: 'center',
  },
  btns_text: {
    color: '#fff',
  },
  absoluteText: {
    // position: 'absolute',
    // right: 32,
    // bottom: 29
  },
});
