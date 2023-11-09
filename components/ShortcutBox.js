import React, {useRef, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

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
      <Image
        source={img}
        resizeMode="contain"
        style={{width: 35, height: 35}}
      />
      <Text style={{color: '#fff'}}>{title}</Text>
    </View>
  );
};

export default ShortcutBox;
