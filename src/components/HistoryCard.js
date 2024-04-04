import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';
import * as Progress from 'react-native-progress';
import {
  SvgCardPopularHistoryIcon,
  SvgCardPopularIcon,
  SvgGoldBagIcon,
} from './SvgImages';
import moment from 'moment';
import {useSelector} from 'react-redux';
import OutlineButton from './OutlineButton';
import {useNavigation} from '@react-navigation/native';

const HistoryCard = ({
  image,
  onPress,
  productDate,
  productImg,
  productName,
  productPrice,
  productStatus,
  productRating,
  completeOrder,
  onPressReorder,
  productId,
}) => {
  const {pic_baseUrl} = useSelector(state => state.ecommerceReducer);
  console.log('productId=--=>', productId);
  // console.log('pic_baseUrl', pic_baseUrl + '/' + productImg);
  // console.log(productRating);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.cardStyle}
        activeOpacity={0.9}
        onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          {/* {imageError ? (
          <Image
            source={images.product3}
            style={styles.image}
            borderRadius={15}
          />
         ) : ( */}
          <Image
            source={
              imageError
                ? images.imageNotFound
                : productImg == 'null' &&
                  productImg == null &&
                  productImg == 'undefined'
                ? images.imageNotFound
                : {uri: pic_baseUrl + '/' + productImg}
            }
            style={styles.image}
            borderRadius={15}
            onError={handleImageError}
          />
          {/* )} */}
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{productName}</Text>
            <Text style={styles.location}>
              {/* 1609 Oak, St. <Text style={{color: colors.white}}>(2km)</Text> */}
              ${productPrice}
            </Text>
            <Text style={styles.completedText}>{productStatus}</Text>
          </View>
        </View>
        <View style={[styles.wrapper]}>
          <View style={styles.iconView}>
            {/* <Image
                        source={images.bag}
                    /> */}
            <SvgGoldBagIcon />
          </View>
          <View>
            {productRating != null ? (
              <View style={styles.ratingView}>
                <View style={styles.ratingCard}>
                  <Progress.Circle
                    progress={productRating / 5}
                    color={colors.lightgreen}
                    size={26}
                    borderColor="transparent"
                  />
                  <View style={styles.imageWrapper}>
                    <SvgCardPopularHistoryIcon />
                  </View>
                </View>
                <Text style={styles.ratingText}>
                  {productRating + ' Rating'}
                </Text>
              </View>
            ) : null}
            <View
              style={
                productRating != null
                  ? {marginTop: hp('1%'), alignItems: 'flex-end', right: 25}
                  : {marginTop: hp('5%'), alignItems: 'flex-end', right: 0}
              }>
              <Text style={styles.location}>Date</Text>
              <Text style={styles.location}>
                {moment(productDate).format('DD MMM YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {completeOrder ? (
        // <View style={{backgroundColor: 'green'}}>
        //   <Text>vfv</Text>
        // </View>
        <OutlineButton
          // onPress={() =>
          //   navigation.navigate('SecondaryStack', {screen: 'Checkout'})
          // }
          onPress={onPressReorder}
          title={'Select this Item to Reorder'}
          textStyle={{color: colors.white, textTransform: 'capitalize'}}
          buttonStyle={{
            marginTop: hp(2),
            backgroundColor: '#D49621',
            borderRadius: 10,
            height: hp(4),
            padding: 5,
            width: hp(25),
            alignSelf: 'center',
          }}
        />
      ) : null}
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary,
    marginBottom: hp('3%'),
    borderWidth: 2,
    borderColor: '#2B1F2F',
    borderRadius: 20,
    padding: hp('2%'),
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: hp('10%'),
    width: hp('10%'),
    // backgroundColor:'red'
  },
  text: {
    color: colors.white,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    // backgroundColor:'red',
    width: hp('12'),
  },
  textWrapper: {
    marginLeft: hp('2%'),
    marginTop: hp('0.5%'),
  },
  location: {
    color: 'lightgrey',
    marginTop: hp('0.4%'),
  },
  completedText: {
    color: colors.lightgreen,
    marginTop: hp('0.4%'),
    fontSize: hp('1.7%'),
  },
  iconView: {
    backgroundColor: colors.white,
    marginRight: hp('2%'),
    height: hp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: hp('3.5%'),
  },
  ratingView: {
    backgroundColor: colors.orange,
    justifyContent: 'space-around',
    height: hp('4%'),
    width: '85%',
    flexDirection: 'row',
    borderRadius: 10,
    right: 5,
  },
  ratingCard: {
    backgroundColor: colors.white,
    marginTop: hp('0.2%'),
    height: hp('3.5%'),
    borderRadius: 50,
    width: hp('3.5%'),
    justifyContent:'center',
    alignItems:'center'
  },
  imageWrapper: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  ratingText: {
    color: colors.white,
    fontSize: hp('1.4%'),
    marginTop: hp('0.8%'),
    marginLeft: hp('0.4%'),
  },
  wrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    // top: 15,
  },
});
