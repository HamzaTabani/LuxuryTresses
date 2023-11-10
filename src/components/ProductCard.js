import React, {useRef, useEffect} from 'react';
import {Text, View, Image, Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductCard = ({rating, item}) => {
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
          source={item?.img}
          resizeMode="contain"
          style={{width: '100%'}}
        />

        {/* small icons */}
        <View style={styles.card_box_img_icon1}>
          <Image
            source={require('../assets/images/profile2.png')}
            resizeMode="contain"
            style={{width: 25, height: 25}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Sarah J.
          </Text>
        </View>

        {/* rating icon */}
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            position: 'absolute',
            bottom: -35,
            right: 10,
            borderWidth: 0.3,
          }}>
          <Svg width="40" height="40">
            <Circle
              cx="20"
              cy="20"
              r={radius}
              fill="transparent"
              stroke="#19CC89"
              strokeWidth="4"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={animatedStrokeDashoffset}
            />
            <Image
              source={require('../assets/images/popular.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            />
          </Svg>
        </View>
      </View>
      <View
        style={{
          paddingTop: 25,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Omnis iste</Text>
        <Text style={{color: '#f6f6f6'}}>
          1609 Oak, st{' '}
          <Text style={{fontWeight: 'bold', color: '#fff'}}>(2km)</Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card_box: {
    width: 150,
    height: 205,
    backgroundColor: '#D49621',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 10,
  },
  card_box_img: {
    marginTop: 2,
    width: 140,
    height: 130,
    alignItems: 'center',
    borderRadius: 15,
    position: 'relative',
  },
  card_box_img_icon1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 30,
    minWidth: wp('23%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    left: 5,
    borderWidth: 0.3,
    borderColor: '#D49621',
  },
});
