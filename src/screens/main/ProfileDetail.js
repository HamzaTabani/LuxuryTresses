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
  const [tabActive, setTabActive] = useState('order');
  const navigation = useNavigation();

  const id = route?.params?.profile_id;
  const moreStylist = route?.params?.stylists;
  // console.log('profile_id', moreStylist.length);

  const dispatch = useDispatch();

  const {profileDetails, profileDetails_loading, profileDetails_error} =
    useSelector(state => state.stylistReducer);

  const {pic_url} = useSelector(state => state.userData);
  console.log('profile rev from screen =========>', profileDetails);

  useEffect(() => {
    // if (!profileDetails) {
    fetchProfileDetailss();
    // }
  }, []);

  const fetchProfileDetailss = async () => {
    if (profileDetails?.id !== id) {
      await dispatch(stylistProfileById(id));
    }
  };

  return (
    <Container>
      {profileDetails_loading ? (
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
            text={profileDetails?.first_name + ' ' + profileDetails?.last_name}
          />
          <ScrollView
            contentContainerStyle={styles.screen}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <Image
                source={
                  profileDetails?.profile_pic == null
                    ? images.stylist1
                    : {uri: pic_url + profileDetails?.profile_pic}
                }
                style={styles.imageStyle}
                resizeMode="cover"
                borderRadius={20}
              />
              <View style={styles.textWrapper}>
                <Text style={styles.name}>
                  {profileDetails?.first_name + ' ' + profileDetails?.last_name}
                </Text>
                <Text style={styles.location}>
                  {profileDetails?.email === 'undefined'
                    ? 'test123@gmail.com'
                    : profileDetails?.email}
                  {/* <Text style={{color: colors.white, fontWeight: 'bold'}}>
                (2km)
              </Text> */}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.iconView}>
                    <SvgGoldSeatIcon />
                  </View>
                  <View style={[styles.iconView, {marginLeft: hp('1%')}]}>
                    <SvgGoldBagIcon />
                  </View>
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
                    name: profileDetails.first_name + profileDetails.last_name,
                    email:
                      profileDetails.address != 'null' &&
                      profileDetails.address != null &&
                      profileDetails.address != 'undefined'
                        ? profileDetails.address
                        : 'address',
                    img:
                      profileDetails.profile_pic != null
                        ? {uri: pic_url + profileDetails.profile_pic}
                        : images.cart1,
                    id: profileDetails.id,
                  })
                }
              />
            </View>
            <View style={{paddingTop: hp('4%')}}>
              <View style={styles.btn_wrapper}>
                <TouchableOpacity
                  style={
                    tabActive === 'order' ? styles.btns_active : styles.btns
                  }
                  onPress={() => setTabActive('order')}>
                  <Text
                    style={
                      tabActive == 'order'
                        ? styles.btns_active_text
                        : styles.btns_text
                    }>
                    Orders
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    tabActive !== 'order' ? styles.btns_active : styles.btns
                  }
                  onPress={() => setTabActive('product')}>
                  <Text
                    style={
                      tabActive !== 'order'
                        ? styles.btns_active_text
                        : styles.btns_text
                    }>
                    Products
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {tabActive === 'order' ? (
              <View style={{paddingTop: hp('4%')}}>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>
                    About{' '}
                    {profileDetails?.first_name +
                      ' ' +
                      profileDetails?.last_name}
                  </Text>
                  <Text style={styles.message}>
                    {profileDetails?.about != null
                      ? profileDetails?.about
                      : 'about'}
                  </Text>
                </View>
                <View style={styles.imageWrapper}>
                  {moreStylist.slice(20, 24).map((item, i) => {
                    // console.log(item.profile_pic)
                    return (
                      <>
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
                      </>
                    );
                  })}
                </View>
                <View style={{paddingTop: hp('4%'), marginTop: hp('4%')}}>
                  <TimingCard />
                  <View style={{paddingTop: hp('5%'), flexDirection: 'row'}}>
                    <OutlineButton
                      title={'BOOK NOW'}
                      buttonStyle={{width: '80%'}}
                      textStyle={{color: colors.white}}
                      onPress={() =>
                        navigation.navigate('Booking', {
                          bookingData: profileDetails,
                        })
                      }
                    />
                    <View style={{marginLeft: hp('2%')}}>
                      <MessageOption />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{paddingTop: hp('4%')}}>
                <FlatList
                  data={products}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{marginBottom: hp('3.5%')}}
                      activeOpacity={0.9}
                      onPress={() => alert('working in progress')}>
                      <ProductCard
                        avatar={images.profile2}
                        username={'username'}
                        title={'Deep Mask'}
                        price={'$59.00'}
                        rating={3}
                        item={item}
                        product={true}
                      />
                    </TouchableOpacity>
                  )}
                  columnWrapperStyle={{justifyContent: 'space-evenly'}}
                  numColumns={2}
                />
              </View>
            )}
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
  },
  btns_active: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 50,
    width: hp('20%'),
    alignItems: 'center',
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
  btns_text: {
    color: '#fff',
  },
  absoluteText: {
    // position: 'absolute',
    // right: 32,
    // bottom: 29
  },
});
