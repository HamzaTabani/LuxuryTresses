import React, {useRef, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {SvgCardPopularIcon, SvgShoppingBagGoldIcon} from './SvgImages';

const ProductCard = ({
  rating,
  item,
  product,
  username,
  avatar,
  productName,
  price,
  data,
  title,
  productImage,
  productFromdetail,
  home,
  // rating,
}) => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const {recentProducts, recent_error} = useSelector(
    state => state.ecommerceReducer,
  );
  const {pic_baseUrl} = useSelector(state => state.ecommerceReducer);
  const {pic_url} = useSelector(state => state.userData);

  useEffect(() => {
    const ratingToProgress = rating / 5;
    Animated.timing(progress, {
      toValue: ratingToProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [rating]);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const animatedStrokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  const [imageError, setImageError] = useState(false);
  const [imageErrorProduct, setImageErrorProduct] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const handleImageErrorProduct = () => {
    setImageErrorProduct(true);
  };
  // console.log('avatar==> ', avatar);
  // console.log('productImage===>', pic_baseUrl);
  // console.log('productImage===>', productImage);
  // console.log('avatar-->',avatar)
  // console.log('username-->',username)

  return (
    <View
      style={[
        styles.card_box,
        {
          height: product ? hp(30) : hp(35),
          marginRight: home ? 10 : null,
          width: home ? hp(22) : hp(20),
        },
      ]}>
      {/* card box img,  */}
      <View style={styles.card_box_img}>
        <Image
          source={
            imageErrorProduct
              ? images.imageNotFound
              : productImage == 'null' &&
                productImage == null &&
                productImage == 'undefined'
              ? images.imageNotFound
              : {uri: pic_baseUrl + '/' + productImage}
          }
          resizeMode="contain"
          style={styles.productImage}
          // onError={({currentTarget}) => {
          //   currentTarget.onerror = null;
          //   currentTarget.src = images.cart2;
          // }}
          onError={handleImageErrorProduct}
        />
        {/* small icons */}
        {productFromdetail === true ? (
          <View style={styles.card_box_img_icon1}>
            <View
              style={{
                height: 23,
                width: 23,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                borderColor: colors.white,
                borderWidth: 1,
                marginTop: 3,
              }}>
              <Image
                source={
                  imageError
                    ? images.profile
                    : avatar == 'null' &&
                      avatar == null &&
                      avatar == 'undefined'
                    ? images.profile
                    : // : {uri: pic_url + avatar}
                      {uri: avatar}
                }
                resizeMode="contain"
                borderRadius={100}
                style={{width: 20, height: 20}}
                onError={handleImageError}
              />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 3,
                // backgroundColor:'red',
                // marginLeft:hp('2%')
              }}>
              {username}
            </Text>
          </View>
        ) : null}

        {/* rating icon */}
        {/* {!product && rating != null ? ( */}
          <View style={styles.progressView}>
            <Progress.Circle
              progress={rating / 5}
              color={colors.lightgreen}
              size={40.5}
              style={{marginTop: hp('0.5%')}}
              borderColor="transparent"
            />
            <View style={styles.imageWrapper}>
              <SvgCardPopularIcon />
            </View>
          </View>
        {/* ) : null} */}
      </View>
      <View
        style={{
          paddingTop: hp('5%'),
          // paddingHorizontal:hp('1%'),
          // marginLeft:hp('-6%')
          left: hp('1%'),
          top: hp('17%'),
          position: 'absolute',
          width: hp('14%'),
          // paddingTop: 25,
          // backgroundColor: 'black',
          // flexDirection: product && 'row',
          // gap: product && hp('3%'),
          // justifyContent: product && 'space-between',
        }}>
        {product ? (
          <View
            style={{
              // backgroundColor: 'red',
              width: hp('19%'),
              height: hp('4.5%'),
              // alignSelf:'center',
              // marginTop: hp('1%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: hp('12%')}}>
              <Text style={styles.productName}>{title}</Text>
              <Text style={styles.text}>{price}</Text>
            </View>
            <View style={styles.iconView}>
              {/* <Image source={images.shoppingIcon} style={styles.image} /> */}
              <SvgShoppingBagGoldIcon />
            </View>
          </View>
        ) : (
          <View
            style={
              {
                // backgroundColor: 'green',
                // width:hp('13%')
                // paddingLeft:0
                // left: hp('2%'),
                // top: hp('17%'),
                // position: 'absolute',
              }
            }>
            <Text
              style={[styles.productName, {marginTop: !product && hp('2%')}]}>
              {productName}
            </Text>
            <Text style={styles.text}>
              ${price}
              {/* <Text style={styles.productName}>(2km)</Text>{' '} */}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card_box: {
    // width: hp(20),
    // width:
    backgroundColor: '#D49621',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
  },
  card_box_img: {
    marginTop: 2,
    width: 140,
    height: 130,
    alignItems: 'center',
    borderRadius: 15,
    // backgroundColor:'red'
    // position: 'relative',
  },
  card_box_img_icon1: {
    flexDirection: 'row',
    gap: 5,
    // justifyContent: 'space-between',
    height: 30,
    minWidth: wp('37%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 0,
    borderWidth: 0.5,
    borderColor: '#D49621',
  },
  iconView: {
    height: hp('3.7%'),
    width: hp('3.7%'),
    borderRadius: 100,
    backgroundColor: colors.darkblue,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: hp(1),
  },
  image: {
    height: hp('1.5%'),
    width: hp('1.5%'),
  },
  productName: {
    color: '#fff',
    // marginBottom: hp('0.5%'),
    fontWeight: 'bold',
    width: hp(12),
  },
  text: {
    color: '#f6f6f6',
    width: hp(12),
  },
  productImage: {
    height: hp('22%'),
    width: hp('21%'),
    // backgroundColor:'white',
    // borderRadius:10,
    // marginTop:hp('0.5')
  },
  progressView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
    position: 'absolute',
    top: hp('19%'),
    right: 5,
    // marginRight:10
  },
  imageWrapper: {
    position: 'absolute',
    top: hp('2%'),
  },
});
