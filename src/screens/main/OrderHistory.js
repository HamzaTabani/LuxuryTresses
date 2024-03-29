import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {historyImages} from '../../dummyData';
import colors from '../../assets/colors';
import UserDetailCard from '../../components/UserDetailCard';
import StarRating from 'react-native-star-rating-widget';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../utils';
import {PostReview} from '../../redux/slices/StylistSlice';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import OutlineButton from '../../components/OutlineButton';

const OrderHistory = ({route}) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState('');
  const productData = route?.params?.product;

  const orderData = route?.params?.order;
  const completedOrdersData = route?.params?.completedOrders;
  const reorder = route?.params?.reorder;
  const reorderButton = route?.params?.reorderButton;
  const {pic_baseUrl} = useSelector(state => state.ecommerceReducer);
  const {pic_url} = useSelector(state => state.userData);
  // const [rating, setRating] = useState('');
  const [postComment, setPostComment] = useState('');
  const dispatch = useDispatch();
  const [productImages, setProductImages] = useState([]);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  console.log('reorderButton=-=>', reorderButton);
  // console.log('reorder: ', reorder);
  // console.log('productData data==>', productData);

  // console.log('routess',navigation.getState().routeNames)
  // console.log('orderData data==>', orderData);
  // console.log('completedOrdersData data==>', completedOrdersData);
  useEffect(() => {
    setProductImages([productData.product_image]);
  }, [productData.product_image]);

  const onHandleSubmit = async () => {
    if (rating == '' && postComment == '') {
      return ShowToast('please enter rating or comment');
    } else {
      const res = await dispatch(
        PostReview({
          userId: productData.id,
          userRating: rating,
          userComment: postComment,
        }),
      );
      if (res.payload.success) {
        navigation.navigate('home');
        // return(
        // console.log('rating data: ',rating,postComment)
        ShowToast(res.payload.message);
        // await dispatch(stylistReviewById(id));
        // )
      } else {
        return ShowToast(res.payload.message);
      }
    }
  };

  // console.log('orderData data==>', productData);
  // console.log('pic_baseUrl==>', pic_baseUrl);
  return (
    <Container>
      <ProfileHeader
        icon={true}
        text={productData.product_name}
        username={true}
      />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <Swiper
          containerStyle={{height: hp('25%')}}
          paginationStyle={{bottom: hp('2%')}}
          // autoplay
          activeDotColor={'#D49621'}
          dotStyle={{borderWidth: 1, borderColor: colors.orange}}>
          {productImages.map(item => (
            <Image
              source={
                imageError
                  ? images.imageNotFound
                  : item == 'null' && item == null && item == 'undefined'
                  ? images.imageNotFound
                  : {uri: pic_baseUrl + '/' + item}
              }
              borderRadius={15}
              style={styles.image}
              resizeMode="cover"
              onError={handleImageError}
            />
          ))}
        </Swiper>
        {/* vendor detail card */}
        <TouchableOpacity
          // disabled={true}
          onPress={() =>
            navigation.navigate('ProfileDetail', {
              profile_id: productData.user.id,
            })
          }
          style={{paddingTop: hp('3%')}}>
          <UserDetailCard
            username={
              productData?.user?.first_name + ' ' + productData?.user?.last_name
            }
            email={
              productData?.user?.address != 'null' &&
              productData?.user?.address != null &&
              productData?.user?.address != 'undefined'
                ? productData?.user?.address
                : 'address'
            }
            image={
              productData?.user?.profile_pic != null
                ? {uri: pic_url + productData?.user?.profile_pic}
                : images.stylist1
            }
            rating={productData.average_rating}
          />
        </TouchableOpacity>
        <View
          style={{
            paddingTop: hp('4%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text}>Status</Text>
          <View style={styles.deliveredView}>
            <Text style={styles.deliveredText}>{orderData.status}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.textStyle}>
          {productData.description != null
            ? productData.description
            : 'decription here'}
          {/* Sed ut perspiciatis unde omnis iste natus error sit voluptatem{'\n'}
          {'\n'} accusantium doloremque laudantium, totam rem aperiam, {'\n'}
          {'\n'} eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo. */}
        </Text>
        <View style={styles.cardStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.price}>${completedOrdersData.price}</Text>
            <Text style={styles.quantityText}>
              Quantity:{' '}
              <Text
                style={{
                  color: colors.white,
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                }}>
                {completedOrdersData.quantity}
              </Text>
            </Text>
          </View>
          <View style={styles.line2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: hp('2.5%'),
            }}>
            <Text style={[styles.text, {fontSize: hp('2%')}]}>Total</Text>
            <Text style={styles.price}>${completedOrdersData.grand_total}</Text>
          </View>
        </View>
        <View
          style={{
            // height: hp('25%'),
            backgroundColor: 'transparent',
            borderRadius: 20,
            borderColor: colors.gray,
            borderWidth: 0.5,
            marginTop: hp('5%'),
            padding: hp('1.5%'),
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: hp('2%'),
            }}>
            Add your review
          </Text>
          <StarRating
            rating={rating}
            starSize={30}
            color="#D59D33"
            starStyle={{marginTop: hp('5%')}}
            onChange={setRating}
          />
          <View
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#D49621',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: hp('3%'),
              // padding: hp('0.5%'),
              marginHorizontal: hp('1%'),
              marginBottom: 10,
            }}>
            <TextInput
              placeholder="Add comment"
              style={{marginLeft: 10, color: colors.white, width: wp(68)}}
              placeholderTextColor={colors.white}
              value={postComment}
              onChangeText={text => setPostComment(text)}
              multiline
            />
            <TouchableOpacity onPress={() => onHandleSubmit()}>
              <Ionicons
                name="send"
                type="AntDesign"
                color="#D49621"
                size={22}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {reorderButton ? null : reorder ? (
          <OutlineButton
            title={'Add to cart'}
            onPress={() =>
              navigation.navigate('SingleProduct', {
                productID: productData.id,
                product: productData,
                order: orderData,
                completedOrders: completedOrdersData,
                reorder: reorder,
              })
            }
            textStyle={{color: '#fff'}}
            buttonStyle={{
              width: hp(45),
              marginTop: hp(2),
              borderRadius: 10,
              width: hp(45),
              alignSelf: 'center',
            }}
          />
        ) : (
          <OutlineButton
            onPress={() =>
              navigation.navigate('SingleProduct', {
                productID: productData.id,
                product: productData,
                order: orderData,
                completedOrders: completedOrdersData,
                reorder: reorder,
              })
            }
            title={'Select this Item to Reorder'}
            textStyle={{color: colors.white}}
            buttonStyle={{
              marginTop: hp(2),
              backgroundColor: '#D49621',
              borderRadius: 10,
              // height: hp(4),
              // padding: 5,
              width: hp(45),
              alignSelf: 'center',
            }}
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  screen: {
    padding: hp('3%'),
    paddingTop: hp('2%'),
    // height: hp('100%'),
    // backgroundColor: 'red',
    paddingBottom: hp('12%'),
  },
  slideStyle: {
    alignItems: 'center',
  },
  image: {
    height: hp('25%'),
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: hp('2.5%'),
  },
  deliveredView: {
    borderWidth: 1,
    borderRadius: 40,
    width: '30%',
    padding: hp('1%'),
    borderColor: colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deliveredText: {
    color: colors.orange,
  },
  line: {
    borderBottomWidth: 0.4,
    marginTop: hp('4%'),
    borderBottomColor: colors.orange,
  },
  descriptionText: {
    color: colors.white,
    marginTop: hp('3%'),
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  textStyle: {
    color: colors.white,
    marginTop: hp('2%'),
    // fontSize: 12,
    lineHeight: 25,
  },
  cardStyle: {
    // backgroundColor: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.gray,
    padding: hp('2%'),
    marginTop: hp('5%'),
  },
  price: {
    color: colors.orange,
    marginLeft: hp('1%'),
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
  },
  quantityText: {
    color: colors.white,
    alignSelf: 'center',
  },
  line2: {
    borderBottomColor: colors.white,
    marginTop: hp('2%'),
    borderBottomWidth: 0.5,
  },
});
