import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import images from '../assets/images';
import colors from '../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { SvgCardPopularIcon } from './SvgImages';

const UserDetailCard = ({ username, email, image, rating }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.chatHeader}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <View style={{ width: 70, height: 70 }}>
          <FastImage
            source={
              imageError
                ? images.profile
                : image == 'null' && image == null && image == 'undefined'
                  ? images.profile
                  : image
            }
            resizeMode={FastImage.resizeMode.cover}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            onError={handleImageError}
          />
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: hp('2.0%') }}>{username}</Text>
          <Text style={{ color: '#efefef', fontSize: hp('1.5%'), marginTop: 2 }}>{email}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#C78914',
          margin: 3,
          paddingHorizontal: 10,
          padding: 3,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff',
          alignItems: 'center',
        }}>
        <View style={styles.ratingCard}>
          <Progress.Circle
            progress={rating / 5}
            color={colors.lightgreen}
            size={38}
            borderColor="transparent"
            style={{ marginLeft: 1, marginTop: 1 }}
          />
          <View style={styles.imageWrapper}>
            <SvgCardPopularIcon />
          </View>
        </View>
        <Text style={{ fontSize: hp('1.2%'), color: '#fff' }}>
          {rating ? rating : 0} Rating
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D49621',
    padding: hp('0.5%'),
    flexDirection: 'row',
    backgroundColor: '#D49621',
    justifyContent: 'space-between',
  },
  ratingCard: {
    backgroundColor: colors.white,
    marginTop: hp('0.2%'),
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  imageWrapper: {
    position: 'absolute',
    top: hp('1.5%'),
    left: hp('1.5%'),
  },
});

export default UserDetailCard;
