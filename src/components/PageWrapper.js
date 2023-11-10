import React from 'react';
import { StyleSheet, View, ImageBackground} from 'react-native';

const PageWrapper = ({children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.bg_home}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_home: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default PageWrapper;
