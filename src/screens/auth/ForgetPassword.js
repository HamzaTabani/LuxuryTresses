import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../utils';
import { generateOTP} from '../../redux/slices/AuthSlice';
import {useNavigation} from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const {forget_password_loading} = useSelector(state => state.userData);

  const navigation = useNavigation();

  const onSendEmail = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!email) {
      return ShowToast('Please type your email');
    } else if (reg.test(email) === false) {
      return ShowToast('Please enter a valid email');
    } else {
      const res = await dispatch(generateOTP(email));
      // console.log('forgetpassword from screen', res);
      if (res.payload.success) {
        navigation.navigate('OTP', {data: res.payload.data, type: 'forgot'});
        return ShowToast(res.payload.message);
      } else {
        return ShowToast('Email does not exist');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/otpbg.png')}
      resizeMode="cover"
      style={styles.screen}>
      <BackHeader />
      <View style={styles.labelWrapper}>
        <Text style={styles.heading}>Forget Password</Text>
      </View>
      <View style={styles.screenWrapper}>
        <InputText
          label={'Enter your email'}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Email'}
          keyboardType={'email-address'}
          icon={'mail-outline'}
        />
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="Next"
            indicator={forget_password_loading}
            onPress={() => onSendEmail()}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenWrapper: {
    alignItems: 'center',
  },
  heading: {
    fontSize: hp('5%'),
    color: '#fff',
    fontFamily: 'Lora-Medium',
  },
  labelWrapper: {
    padding: hp('7%'),
    paddingTop: hp('3%'),
  },
  buttonWrapper: {
    paddingTop: hp('3%'),
    alignItems: 'center',
  },
});
