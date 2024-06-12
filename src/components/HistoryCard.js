import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../assets/colors';
import images from '../assets/images';
import * as Progress from 'react-native-progress';
import {
  SvgCardPopularHistoryIcon,
  SvgCardPopularIcon,
  SvgGoldBagIcon,
} from './SvgImages';
import moment from 'moment';
import { useSelector } from 'react-redux';
import OutlineButton from './OutlineButton';

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
  const { pic_baseUrl } = useSelector(state => state.ecommerceReducer);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.cardStyle}
        activeOpacity={0.9}
        onPress={onPress}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={
              imageError
                ? images.imageNotFound
                : productImg == 'null' &&
                  productImg == null &&
                  productImg == 'undefined'
                  ? images.imageNotFound
                  : { uri: pic_baseUrl + '/' + productImg }
            }
            style={styles.image}
            borderRadius={15}
            onError={handleImageError}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{productName}</Text>
            <Text style={styles.location}>
              ${productPrice}
            </Text>
            <Text style={styles.completedText}>{productStatus}</Text>
          </View>
        </View>
        <View style={[styles.wrapper]}>
          <View style={styles.iconView}>
            <SvgGoldBagIcon />
          </View>
          <View>
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
                {productRating ? productRating : 0} Rating
              </Text>
            </View>
            <View
              style={
                productRating != null
                  ? { marginTop: hp('1%'), alignItems: 'flex-start', right: 25 }
                  : { marginTop: hp('5%'), alignItems: 'flex-start', right: 0 }
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
        <OutlineButton
          onPress={onPressReorder}
          title={'Select this Item to Reorder'}
          textStyle={{ color: colors.white, textTransform: 'capitalize' }}
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
    width: hp('11'),
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
    width: wp(26),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'absolute',
    left: 9,
    top: 9,
  },
  ratingText: {
    color: colors.white,
    fontSize: hp('1.4%'),
    marginTop: hp('0.8%'),
    marginLeft: hp('0.4%'),
  },
  wrapper: {
    flexDirection: 'row',
    // position: 'absolute',
    // right: 0,
    // top: 15,
    // width: '50%',
    // alignItems: 'flex-start'
  },
});
