import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import colors from '../assets/colors';

const ReviewDetailCard = () => {
  return (
    <View style={styles.cardBox}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image
            source={require('../assets/images/marker3.png')}
            style={styles.userImg}
          />
          <Text style={styles.userNameText}>John deo</Text>
        </View>
        <Text style={{color: 'gray', fontSize: hp('1.5%')}}>
          18 October 2023
        </Text>
      </View>
      <View>
        <Text style={{lineHeight: 20, marginTop: 10, color: colors.black}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
      <View style={{marginTop: 5}}>
        <StarRating
          rating={4}
          starSize={20}
          color="#D59D33"
          starStyle={{marginRight: 0}}
          onChange={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 10,
    padding: 10,
    justifyContent: 'space-evenly',
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userNameText: {
    color: '#000',
    fontWeight: '400',
    fontSize: hp('1.7%'),
  },
});

export default ReviewDetailCard;
