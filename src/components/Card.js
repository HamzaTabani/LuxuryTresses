import {useNavigation} from '@react-navigation/native';
import React, {useRef, useEffect} from 'react';
import {Text, View, Image, Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  SvgBagWhiteIcon,
  SvgCardPopularIcon,
  SvgSeatWhiteIcon,
} from './SvgImages';
import * as Progress from 'react-native-progress';
import images from '../assets/images';
import colors from '../assets/colors';

const Card = ({rating, stylist_name, stylist_email, image, allTopStylist}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

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

  return (
    <View style={styles.card_box}>
      {/* card box img */}
      <View style={styles.card_box_img}>
        <Image
          source={image}
          resizeMode="cover"
          borderRadius={10}
          style={{width: hp('20%'), height: hp('22%')}}
        />
        {/* small icons */}
        <View style={styles.card_box_img_icon1}>
          <SvgSeatWhiteIcon />
        </View>
        <View style={styles.card_box_img_icon2}>
          <SvgBagWhiteIcon />
        </View>
        {/* rating icon */}
        <View style={styles.progressView}>
          <Progress.Circle
            progress={rating/5}
            color={colors.lightgreen}
            size={40.5}
            style={{marginTop: hp('0.5%')}}
            borderColor="transparent"
          />
          <View style={styles.imageWrapper}>
            <SvgCardPopularIcon />
          </View>
        </View>
      </View>
      {allTopStylist ? (
        <View
          style={{
            paddingTop: hp('4%'),
            left: hp('2%'),
            top: hp('19%'),
            position: 'absolute',
            width: hp('13%'),
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {stylist_name}
          </Text>
          <Text style={{color: '#f6f6f6', fontSize: hp('1.4%')}}>
            {stylist_email}
          </Text>
        </View>
      ) : (
        <View
          style={{
            paddingTop: hp('4%'),
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            {stylist_name}
          </Text>
          <Text style={{color: '#f6f6f6', fontSize: hp('1.4%')}}>
            {stylist_email}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card_box: {
    width: 170,
    height: 240,
    backgroundColor: '#D49621',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 10,
  },
  card_box_img: {
    marginTop: hp('0.6%'),
    width: 140,
    height: 130,
    alignItems: 'center',
    borderRadius: 15,
    position: 'relative',
    // backgroundColor:'red'
  },
  card_box_img_icon1: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    left: 0,
    borderWidth: 0.5,
    borderColor: '#D49621',
  },
  card_box_img_icon2: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    left: 35,
    borderWidth: 0.5,
    borderColor: '#D49621',
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
