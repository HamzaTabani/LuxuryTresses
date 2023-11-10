import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" hidden={false} />

      <ImageBackground
        source={require('../../assets/images/splashbg.png')}
        resizeMode="cover"
        style={styles.bg_splash}>
        {/* logo header */}
        <View style={styles.splash_header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* splash bottom */}
        <View style={styles.splash_bottom}>
          <View>
            <Text style={styles.splash_heading}>Lets your hair,</Text>
            <Text style={styles.splash_heading}>Speak for itself</Text>
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={styles.splash_title}>
              Lets make your hair attractive,
            </Text>
          </View>
          <View style={{ marginTop: 45, alignItems: 'center' }}>
            <PrimaryButton
              title="Get Started"
              onPress={() => navigation.navigate('signup')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_splash: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
  },
  splash_header: {
    flex: 0.2,
    alignItems: 'flex-start',
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 30,
  },
  splash_bottom: {
    flex: 0.4,
  },
  splash_heading: {
    fontSize: hp('5.5%'),
    color: '#fff',
  },
  splash_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
  },
  // primary button
  primary_btn: {
    width: wp('80%'),
    borderRadius: 50,
  },
  primary_btn_gradient: {
    width: wp('80%'),
    padding: 15,
    borderRadius: 50,
  },
  primary_btn_text: {
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textTransform: 'uppercase',
  },
});
