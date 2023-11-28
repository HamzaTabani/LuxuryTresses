import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../assets/colors';

const Signup = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/signupbg.png')}
      resizeMode="cover"
      style={styles.bg_signup}>
      <BackHeader />
      <ScrollView contentContainerStyle={{paddingHorizontal: wp('10%')}}>
        <View
         style={{
          flex: 1,
          marginTop: hp('5%'),
        }}
        >
        <View
          style={{
            flex: 0.5,
            marginTop: hp('0%'),
          }}>
          <Text style={styles.signup_heading}>Welcome Back</Text>
          <Text style={styles.signup_title}>
            Lets make your hair attractive,
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            marginTop: hp("13%"),
            paddingBottom: 10
          }}>
          <View>
            <Text style={styles.input_lable}>Enter your email</Text>
            <View style={styles.inputs_container}>
              <FontAwesome5
                name="mail-outline"
                type="Ionicons"
                color="#e0e0e0"
                size={32}
                style={{marginLeft: 10}}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType='email-address'
                placeholderTextColor="#bbb9bd"
              />
            </View>
          </View>

          <View style={styles.seperator}>
            <Text style={{color: '#bbb9bd', textAlign: 'center'}}>OR</Text>
          </View>

          <View style={styles.button_container}>
            <Image
              source={require('../../assets/images/google_icon.png')}
              style={styles.btn_icon}
            />
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#bbb9bd',
                  textAlign: 'center',
                }}>
                CONTINUE WITH GOOGLE
              </Text>
            </View>
          </View>
          <View style={styles.button_container}>
            <Image
              source={require('../../assets/images/facebook_icon.png')}
              style={styles.btn_icon}
            />
            <View style={{width: '75%'}}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#bbb9bd',
                  textAlign: 'center',
                }}>
                CONTINUE WITH FACEBOOK
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <PrimaryButton
              title="continue"
              onPress={() => navigation.navigate('otp')}
            />
          </View>
        </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signup;
const styles = StyleSheet.create({
  bg_signup: {
    flex: 1,
    justifyContent: 'space-between',
  },
  signup_heading: {
    fontSize: hp('5%'),
    color: '#fff',
    fontFamily: 'Lora-Medium',
  },
  signup_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
  },
  inputs_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#D49621',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#D49621',
    marginTop: hp('1.7%'),
  },
  inputs: {
    marginLeft: 10,
    width: '80%',
    color: '#fff',
  },
  input_lable: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginBottom: 15,
  },
  seperator: {
    marginVertical: 40,
  },
  btn_icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});
