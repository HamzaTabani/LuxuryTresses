import React, {useRef, useEffect} from 'react';
import Svg, {Circle} from 'react-native-svg';
import {View, Image, Animated, Easing} from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../assets/colors';
import {SvgCardPopularIcon} from './SvgImages';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const RatingIcon = ({rating, w, h, r}) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ratingToProgress = rating / 5;
    Animated.timing(progress, {
      toValue: ratingToProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [rating]);

  const radius = r;
  const circumference = 2 * Math.PI * radius;
  const animatedStrokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View
      style={{

        height: h,
        width: w,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 0.3,
        alignSelf:'center'
      }}>
      <Progress.Circle
        progress={rating/5}
        color={colors.lightgreen}
        size={27}
        borderColor="transparent"
      />
      <View
        style={{
          position: 'absolute',
        }}>
        <SvgCardPopularIcon />
      </View>
    </View>
  );
};

export default RatingIcon;
