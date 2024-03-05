import React, {useRef, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {
  SvgNearByIcon,
  SvgPopularIcon,
  SvgRecentsIcon,
  SvgTrendingIcon,
} from './SvgImages';

const ShortcutBox = ({title, img}) => {
  return (
    <View
      style={{
        width: 72,
        height: 90,
        borderWidth: 0.5,
        borderColor: '#D49621',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {title == 'Trends' ? (
        <View style={{position: 'absolute', top: 25}}>
          <SvgTrendingIcon />
        </View>
      ) : title == 'Nearby' ? (
        <View style={{position: 'absolute', top: 25}}>
          <SvgNearByIcon />
        </View>
      ) : title == 'Recents' ? (
        <View style={{position: 'absolute', top: 25}}>
          <SvgRecentsIcon />
        </View>
      ) : title == 'Popular' ? (
        <View style={{position: 'absolute', top: 25}}>
          <SvgPopularIcon />
        </View>
      ) : null}
      <Text style={{color: '#fff', position: 'absolute', bottom: 5}}>
        {title}
      </Text>
    </View>
  );
};

export default ShortcutBox;
