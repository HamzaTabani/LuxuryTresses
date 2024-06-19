import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { SvgCardPopularIcon, SvgShoppingBagGoldIcon } from './SvgImages';

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
}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const { pic_baseUrl } = useSelector(state => state.ecommerceReducer);

  useEffect(() => {
    const ratingToProgress = rating / 5;
    Animated.timing(progress, {
      toValue: ratingToProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [rating]);

  const [imageError, setImageError] = useState(false);
  const [imageErrorProduct, setImageErrorProduct] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageErrorProduct = () => {
    setImageErrorProduct(true);
  };

  return (
    <View
      style={[styles.card_box, {
        height: product ? hp(30) : hp(35),
        marginRight: home ? 10 : null,
        width: home ? hp(22) : wp(45),
      }]}>
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
                : { uri: pic_baseUrl + '/' + productImage }
          }
          resizeMode="contain"
          style={styles.productImage}
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
                      : { uri: avatar }
                }
                resizeMode="contain"
                borderRadius={100}
                style={{ width: 20, height: 20 }}
                onError={handleImageError}
              />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 3,
              }}>
              {username}
            </Text>
          </View>
        ) : null}
        <View style={styles.progressView}>
          <Progress.Circle
            progress={rating / 5}
            color={colors.lightgreen}
            size={40.5}
            style={{ marginTop: hp('0.5%') }}
            borderColor="transparent"
          />
          <View style={styles.imageWrapper}>
            <SvgCardPopularIcon />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: hp('5%'),
          left: hp('1%'),
          top: hp('17%'),
          position: 'absolute',
          width: hp('14%'),
        }}>
        {product ? (
          <View
            style={{
              width: hp('19%'),
              height: hp('4.5%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ width: hp('12%') }}>
              <Text style={styles.productName}>{title}</Text>
              <Text style={styles.text}>{price}</Text>
            </View>
            <View style={styles.iconView}>
              <SvgShoppingBagGoldIcon />
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={[styles.productName, { marginTop: !product && hp('2%') }]}>
              {productName}
            </Text>
            <Text style={styles.text}>
              ${price}
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
    backgroundColor: '#D49621',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
  },
  card_box_img: {
    marginTop: 2,
    height: hp('22%'),
    width: hp('21%'),
    alignItems: 'center',
    borderRadius: 15,
  },
  card_box_img_icon1: {
    flexDirection: 'row',
    gap: 5,
    height: 30,
    minWidth: wp('37%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginTop: hp(7)
  },
  image: {
    height: hp('1.5%'),
    width: hp('1.5%'),
  },
  productName: {
    color: '#fff',
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
  },
  imageWrapper: {
    position: 'absolute',
    top: hp('2%'),
  },
});