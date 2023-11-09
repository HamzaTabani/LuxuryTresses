import React, {useRef, useEffect} from 'react';
import Svg, {Circle} from 'react-native-svg';
import { View, Image, Animated, Easing} from 'react-native';

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
    }}>
    <Svg width="40" height="40">
      <Circle
        cx="20"
        cy="20"
        r={radius}
        fill="transparent"
        stroke="#19CC89"
        strokeWidth="3"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={animatedStrokeDashoffset}
      />
      <Image
        source={require('../assets/images/popular.png')}
        resizeMode="contain"
        style={{
          width: 15,
          height: 15,
          position: 'absolute',
          top: 13,
          left: 13,
        }}
      />
    </Svg>
  </View>
  );
};



export default RatingIcon;