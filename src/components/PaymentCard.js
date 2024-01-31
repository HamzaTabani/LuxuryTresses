import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const PaymentCard = ({
  cardStyle,
  masterStyle,
  cardholder_name,
  card_number,
  date,
  onCardPress
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onCardPress}>
    <ImageBackground
      source={images.card_background}
      borderRadius={20}
      imageStyle={[
        {
          width: '88%',
          height: hp('25%'),
          borderColor: colors.orange,
          borderWidth: 1,
        },
        cardStyle,
      ]}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{margin: hp('2.5%')}}>
        <Text style={styles.userCartText}>{cardholder_name}</Text>
        <Image
          source={images.card_scan}
          borderRadius={10}
          style={styles.imageStyle}
        />
        <View style={{marginTop: hp('3%')}}>
          <Text style={styles.userCartText}>{card_number}</Text>
          <Text
            style={{
              fontWeight: 'light',
              color: '#efefef',
              fontSize: hp('1.5%'),
            }}>
            {date}
          </Text>
        </View>
      </View>
      <Image source={images.master_card} style={[styles.image, masterStyle]} />
    </ImageBackground>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  userCartText: {
    fontWeight: 'light',
    color: '#fff',
    fontSize: hp('2.5%'),
  },
  image: {
    height: hp('6%'),
    marginTop: hp('2.5%'),
    marginRight: hp('5%'),
    width: '19%',
  },
  imageStyle: {
    height: hp('3%'),
    marginTop: hp('3%'),
    width: hp('5%'),
  },
});
