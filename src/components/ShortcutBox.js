import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgNearByIcon, SvgPopularIcon, SvgRecentsIcon, SvgTrendingIcon } from './SvgImages';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ShortcutBox = ({ title, img }) => {
  return (
    <View
      style={{
        width: wp(19),
        height: hp(12),
        borderWidth: 0.5,
        borderColor: '#D49621',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View style={styles.blurOverlay} />
      {title == 'Trends' ? (
        <View style={{ position: 'absolute', top: 25 }}>
          <SvgTrendingIcon />
        </View>
      ) : title == 'Nearby' ? (
        <View style={{ position: 'absolute', top: 25 }}>
          <SvgNearByIcon />
        </View>
      ) : title == 'Recents' ? (
        <View style={{ position: 'absolute', top: 25 }}>
          <SvgRecentsIcon />
        </View>
      ) : title == 'Popular' ? (
        <View style={{ position: 'absolute', top: 25 }}>
          <SvgPopularIcon />
        </View>
      ) : null}
      <Text style={{ color: '#fff', position: 'absolute', bottom: 5, fontSize: wp(3.5) }}>
        {title}
      </Text>
    </View>
  );
};

export default ShortcutBox;

const styles = StyleSheet.create({
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust the opacity as needed
    // To simulate blur, we use a background color with opacity
  },
})