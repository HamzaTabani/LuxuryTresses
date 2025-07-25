import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import images from '../assets/images';
import {SvgCardPopularIcon, SvgCardRevPopSecIcon} from './SvgImages';

const ReviewCard = ({onPress, averageRating, totalCustomerRating}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View>
        <Text style={styles.reviewText}>Customer reviews</Text>
        <Text style={styles.text}>{totalCustomerRating} customer rating</Text>
      </View>
      {/* {averageRating != null ? ( */}
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: hp('2%')}}>
          <Text style={styles.reviewText}>
            {averageRating ? (Math.round(averageRating * 100) / 100).toFixed(2) : 0} rating
          </Text>
          <Text style={[styles.text, {alignSelf: 'center'}]}>out of 5</Text>
        </View>
        <View style={styles.progressView}>
          <Progress.Circle
            progress={averageRating / 5}
            color={colors.lightgreen}
            size={40.5}
            style={{marginTop: hp('0.5%')}}
            borderColor="transparent"
          />
          <View style={styles.imageWrapper}>
            <SvgCardRevPopSecIcon />
          </View>
        </View>
      </View>
      {/* ) : (
        <Text style={styles.text}>0 Rating</Text>
      )} */}
    </TouchableOpacity>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    padding: hp('2.5%'),
  },
  reviewText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
    // backgroundColor:'red',width:hp(5)
  },
  text: {
    color: colors.white,
    marginTop: hp('0.5%'),
  },
  progressView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 100,
  },
  imageWrapper: {
    position: 'absolute',
    top: hp('1.8%'),
  },
});
