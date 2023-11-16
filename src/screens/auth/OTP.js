import React, {useState, useRef} from 'react';

import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';

const OTP = ({navigation}) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOTPChange = (text, index) => {
    if (text.length === 1 && index < 3) {
      otpInputs[index + 1].current.focus();
    }

    const newOtp = [...verificationCode];
    newOtp[index] = text;
    setVerificationCode(newOtp);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../assets/images/otpbg.png')}
        resizeMode="cover"
        style={styles.bg_signup}>
        <BackHeader />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: wp('10%'),
          }}>
          <View
            style={{
              flex: 1,
              marginTop: hp('5%'),
            }}>
            <View
              style={{
                flex: 0.5,
              }}>
              <Text style={styles.signup_heading}>Confirmation</Text>
              <Text style={styles.signup_title}>
                Enter 4 digit code we sent to your email
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                marginTop: hp('14%'),
                paddingBottom: 10
              }}>
              <View>
                <Text style={styles.input_lable}>Enter code</Text>
                <View style={styles.inputs_container}>
                  {verificationCode.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={otpInputs[index]}
                      style={styles.inputs}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={text => handleOTPChange(text, index)}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.seperator}>
                <TouchableOpacity>
                  <FontAwesome5
                    name="refresh-outline"
                    type="Ionicons"
                    color="#e0e0e0"
                    size={32}
                    style={{textAlign: 'center', color: '#D49621'}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#D49621',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Resend code
                </Text>
              </View>
              <View style={{alignItems: 'center', marginTop: 40}}>
                <PrimaryButton
                  title="continue"
                  onPress={() => navigation.navigate('initialprofile')}
                />
              </View>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <OutlineButton
                  title="other methods"
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default OTP;
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    gap: 15,
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
    width: wp('15%'),
    height: hp('8%'),
    color: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#D49621',
    textAlign: 'center',
    fontSize: hp('3.5%'),
  },
  input_lable: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginBottom: 15,
    textAlign: 'center',
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
