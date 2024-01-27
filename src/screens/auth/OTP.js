import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/PrimaryButton';
import CodeInput from '../../components/CodeInput';
import colors from '../../assets/colors';
import {generateOTP, verifyCode} from '../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import {ShowToast} from '../../utils';

const OTP = ({navigation, route}) => {
  const info = route.params.data;

  const [verificationCode, setVerificationCode] = useState(
    info ? info.code.toString() : '',
  );
  const [seconds, setSeconds] = useState(60);

  const { otpcode_loading } = useSelector(state => state.userData)

  const dispatch = useDispatch();

  console.log('otp timer', info);

  useEffect(() => {
    return () => clearInterval();
  }, []);

  const StartTimer = () => {
    let interval = setInterval(() => {
      setSeconds(prevSeconds => {
        const timer = prevSeconds > 0 && prevSeconds - 1;
        if (timer === 0) {
          clearInterval(interval);
          setSeconds(60);
        }
        return timer;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const onResendCode = async () => {
    StartTimer();
    const res = await dispatch(generateOTP(info.email));
    if (res.payload.success) {
      setVerificationCode(res.payload.data.code.toString());
      return ShowToast(res.payload.message);
    } else {
      return ShowToast('Unable to send OTP code');
    }
  };

  const onVerifyPress = async () => {
    if (!verificationCode) {
      return ShowToast('Please type your 4 digit code');
    } else {
      const res = await dispatch(
        verifyCode({
          code: verificationCode,
          id: info.id,
        }),
      );
      console.log('from screeen =========>', res)
      if (res.payload.success) {
        navigation.navigate('ChangePassword', {type: 'forgot', userid: info.id});
        return ShowToast(res.payload.message);
      } else {
        return ShowToast(res.payload.message);
      }
    }
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
                Enter 4 digit code we sent to {info.email}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                marginTop: hp('14%'),
                paddingBottom: 10,
              }}>
              <View>
                <Text style={styles.input_lable}>Enter code</Text>
                <View style={styles.inputs_container}>
                  <CodeInput
                    value={verificationCode}
                    setValue={text => setVerificationCode(text)}
                  />
                </View>
              </View>
              <View style={styles.seperator}>
                {seconds < 60 ? (
                  <Text style={styles.timerDigits}>
                    {seconds < 10 ? seconds : '0:' + seconds}
                  </Text>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onResendCode()}>
                    <FontAwesome5
                      name="refresh-outline"
                      type="Ionicons"
                      color="#e0e0e0"
                      size={32}
                      style={{textAlign: 'center', color: '#D49621'}}
                    />
                    <Text
                      style={{
                        color: '#D49621',
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      Resend code
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{alignItems: 'center', marginTop: 40}}>
                <PrimaryButton
                  title="continue"
                  indicator={otpcode_loading}
                  onPress={() => onVerifyPress()}
                />
              </View>
              {/* <View style={{alignItems: 'center', marginTop: 20}}>
                <OutlineButton
                  title="other methods"
                  onPress={() => navigation.goBack()}
                />
              </View> */}
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
    marginTop: hp('2%'),
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
  timerDigits: {
    color: colors.orange,
    fontSize: hp('1.9%'),
    alignSelf: 'center',
  },
});
