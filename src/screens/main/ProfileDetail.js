import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import images from '../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import Container from '../../components/Container';
import ReviewCard from '../../components/ReviewCard';
import { products, stylistImages } from '../../dummyData';
import TimingCard from '../../components/TimingCard';
import OutlineButton from '../../components/OutlineButton';
import MessageOption from '../../components/MessageOption';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { stylistProfileById } from '../../redux/slices/StylistSlice';
import Loader from '../../components/Loader';
import {
  SvgGoldBagIcon,
  SvgGoldIcon,
  SvgGoldSeatIcon,
} from '../../components/SvgImages';

const ProfileDetail = ({ route }) => {
  const [tabActive, setTabActive] = useState('');
  const [tabBothActive, setTabBothActive] = useState(false);
  const [serviceIcon, setServiceIcon] = useState(false);
  const [productIcon, setProductIcon] = useState(false);
  const navigation = useNavigation();
  const id = route?.params?.profile_id;
  const [profiledetail, setProfiledetail] = useState(null);
  const dispatch = useDispatch();
  const { profileDetails, profileDetails_loading, profileDetails_error } = useSelector(state => state.stylistReducer);
  const { pic_url } = useSelector(state => state.userData);
  const [stylistProfileImageError, setStylistProfileImageError] = useState(false);

  const handleStylistProfileImageError = () => {
    setStylistProfileImageError(true);
  };

  useEffect(() => {
    fetchProfileDetailss();
  }, []);

  const fetchProfileDetailss = async () => {
    const res = await dispatch(stylistProfileById(id));
    setProfiledetail(res.payload.data);
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
      } else if (
        profiledetail?.products.length >= 1 &&
        profiledetail?.services.length >= 1 &&
        !profileDetails_loading
      ) {
        setTabBothActive(true);
        setTabActive('service');
        setProductIcon(true);
        setServiceIcon(true);
      }
    }
  }, [profiledetail]);

  return (
    <Container>
      {profiledetail == null ? (
        <>
          <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Loader size={'large'} />
          </View>
        </>
      ) : (
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
                    : profiledetail?.profile_pic == 'null' ||
                      profiledetail?.profile_pic == null ||
                      profiledetail?.profile_pic == 'undefined'
                      ? images.profile
                      : { uri: profiledetail?.profile_pic }
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
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
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
                style={{ marginTop: hp('7%') }}
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
            <View style={{ paddingTop: hp('4%') }}>
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
                        ? profiledetail?.profile_pic
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
            {profiledetail?.services.length < 1 &&
              profiledetail?.products.length >= 1 ? (
              <View style={[styles.btn_wrapperA, { marginTop: hp('4%') }]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Products</Text>
                </View>
              </View>
            ) : profiledetail?.products.length < 1 && profiledetail?.services.length >= 1 ? (
              <View style={[styles.btn_wrapperA, { marginTop: hp('4%') }]}>
                <View style={styles.btns_activeA}>
                  <Text style={styles.btns_active_textA}>Services</Text>
                </View>
              </View>
            ) : tabBothActive ? (
              <View style={styles.btn_wrapper}>
                <TouchableOpacity
                  style={tabActive === 'service' ? styles.btns_active : styles.btns}
                  onPress={() => setTabActive('service')}>
                  <Text style={tabActive == 'service' ? styles.btns_active_text : styles.btns_text}>
                    Services
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tabActive !== 'service' ? styles.btns_active : styles.btns}
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
            ) : null}
            {tabActive === 'service' ? (
              <View style={{ paddingTop: hp('4%'), marginTop: hp('4%') }}>
                <TimingCard />
                <View style={{ paddingTop: hp('5%'), flexDirection: 'row' }}>
                  <OutlineButton
                    title={'BOOK NOW'}
                    buttonStyle={{ width: '80%' }}
                    textStyle={{ color: colors.white }}
                    onPress={() =>
                      navigation.navigate('Booking', {
                        bookingData: profiledetail,
                      })
                    }
                  />
                  <View style={{ marginLeft: hp('2%') }}>
                    <MessageOption />
                  </View>
                </View>
              </View>
            ) : tabActive === 'product' ? (
              <View style={{ paddingTop: hp('4%') }}>
                <FlatList
                  data={profiledetail?.products}
                  keyExtractor={(item, ind) => ind}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={{ marginBottom: hp('3.5%') }}
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
                  columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                  numColumns={2}
                />
              </View>
            ) : null}
          </ScrollView>
        </>
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
  btn_wrapper: {
    borderWidth: 1.2,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  btn_wrapperA: {
    borderWidth: 1.2,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 4,
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
    padding: 10,
    borderRadius: 50,
    width: '100%',
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
});