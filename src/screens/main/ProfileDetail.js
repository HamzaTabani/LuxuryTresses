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

const ProfileDetail = ({route}) => {
  const [tabActive, setTabActive] = useState('order');
  const navigation = useNavigation();

  const id = route?.params?.profile_id;
  console.log('profile_id', id);

  const dispatch = useDispatch();

  const {stylistDetail, stylistDetail_loading, stylistDetail_error} =
    useSelector(state => state.stylistReducer);

  const {pic_url} = useSelector(state => state.userData);
  // console.log('profile details from screen =========>', stylistDetail);

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    await dispatch(stylistProfileById(id));
  };

  return (
    <Container>
      {stylistDetail_loading ? (
        <>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Loader size={'large'} />
          </View>
        </>
      ) : stylistDetail_error ? (
        <>
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={styles.errorMessage}>{detail_error}</Text>
          </View>
        </>
      ) : (
        <>
          <ProfileHeader
            username={true}
            icon={true}
            text={stylistDetail.first_name + ' ' + stylistDetail.last_name}
          />
          <ScrollView
            contentContainerStyle={styles.screen}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper}>
              <Image
                source={
                  stylistDetail.profile_pic == null
                    ? images.stylist1
                    : {uri: pic_url + stylistDetail.profile_pic}
                }
                style={styles.imageStyle}
                resizeMode="cover"
                borderRadius={20}
              />
              <View style={styles.textWrapper}>
                <Text style={styles.name}>
                  {stylistDetail.first_name + ' ' + stylistDetail.last_name}
                </Text>
                <Text style={styles.location}>
                  {stylistDetail.email}
                  {/* <Text style={{color: colors.white, fontWeight: 'bold'}}>
                (2km)
              </Text> */}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.iconView}>
                    <Image source={images.tab1} />
                  </View>
                  <View style={[styles.iconView, {marginLeft: hp('1%')}]}>
                    <Image source={images.tab2} />
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
              <ReviewCard onPress={() => navigation.navigate('Reviews')} />
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
                    {stylistDetail.first_name + ' ' + stylistDetail.last_name}
                  </Text>
                  <Text style={styles.message}>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem {'\n'}
                    {'\n'} accusantium doloremque laudantium, totam rem aperiam,
                    eaque {'\n'}
                    {'\n'} ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo.{' '}
                  </Text>
                </View>
                <View style={styles.imageWrapper}>
                  {stylistImages.map(item => (
                    <>
                      <Image
                        key={item.id}
                        source={item.image}
                        borderRadius={15}
                        blurRadius={item.id == 4 ? 25 : 0}
                        style={styles.image}
                      />
                      <View style={styles.absoluteText}>
                        <Text style={styles.moreText}>
                          {item.id == 4 && 'More'}
                        </Text>
                      </View>
                    </>
                  ))}
                </View>
                <View style={{paddingTop: hp('4%')}}>
                  <TimingCard />
                  <View style={{paddingTop: hp('5%'), flexDirection: 'row'}}>
                    <OutlineButton
                      title={'BOOK NOW'}
                      buttonStyle={{width: '80%'}}
                      textStyle={{color: colors.white}}
                      onPress={() => navigation.navigate('Booking')}
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
                      onPress={() => navigation.navigate('SingleProduct')}>
                      <ProductCard rating={3} item={item} product={true} />
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
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
  },
  location: {
    color: colors.white,
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
  },
  image: {
    height: 75,
    width: 75,
  },
  imageWrapper: {
    paddingTop: hp('5%'),
    height: '19%',
    width: '19%',
    flexDirection: 'row',
    gap: 9,
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
