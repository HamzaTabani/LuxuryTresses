import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../../components/BackHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import {ShowToast} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/slices/AuthSlice';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {signin_loading} = useSelector(state => state.userData);

  const onLoginPress = async () => {
    if (!email) {
      return ShowToast('Please type your email');
    } else {
      dispatch(login({email: email, password: password}));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/otpbg.png')}
      resizeMode="cover"
      style={{flex: 1}}>
      <BackHeader />
      <View style={styles.labelWrapper}>
        <Text style={styles.heading}>Welcome Back!</Text>
        {/* <Text style={styles.heading}>Login</Text> */}
        <Text style={styles.signup_title}>Lets make your hair attractive,</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          {/* <View style={styles.inputWrapper}> */}
          <InputText
            label={'Enter your email'}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Email'}
            keyboardType={'email-address'}
            icon={'mail-outline'}
          />
          <InputText
            label={'Enter your password'}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Password'}
            secureTextEntry={true}
            icon={'lock-closed-outline'}
          />
          <View style={{paddingTop: hp('3%'), alignItems: 'center'}}>
            <PrimaryButton
              title="Login"
              indicator={signin_loading}
              onPress={() => onLoginPress()}
            />
            <TouchableOpacity
              style={styles.forgotWrapper}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgotText}>Forgot Password ?</Text>
            </TouchableOpacity>
            <PrimaryButton
              title="ARE YOU NEW?"
              onPress={() => navigation.navigate('signup')}
            />
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  heading: {
    fontSize: hp(4.5),
    color: '#fff',
    fontFamily: 'Lora-Medium',
  },
  labelWrapper: {
    padding: hp('7%'),
    paddingTop: hp('3%'),
  },
  forgotWrapper: {
    paddingVertical: hp('3%'),
    alignItems: 'center',
    // backgroundColor:'red'
  },
  forgotText: {
    color: colors.orange,
    fontFamily: 'Lora-Medium',
    fontSize: hp('1.8%'),
  },
  signup_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
  },
});
