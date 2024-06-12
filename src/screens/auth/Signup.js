import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/PrimaryButton';
import { ShowToast } from '../../utils';
import { SvgFacebookIcon, SvgGoogleIcon } from '../../components/SvgImages';
import { SigninWithFacebook, SigninWithGoogle } from '../../config/firebase/AuthProviders';
import { firebase } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/AuthSlice';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [indicator, setindicator] = useState(false);
  const [facebookLoader, setFacebookLoader] = useState(false);
  const dispatch = useDispatch();

  const onContinuePress = () => {
    if (!email) {
      return ShowToast('Please type your email');
    } else {
      navigation.navigate('initialprofile', { userData: email });
    }
  };

  function googleSignIn() {
    setindicator(true);
    SigninWithGoogle()
      .then(async data => {
        if (!data) {
          setindicator(false);
          return ShowToast('Google Login failed!');
        } else {
          const googleEmail = data.email;
          const setFirstName = data.givenName;
          const setLastName = data.familyName;
          const profilePic = data.photo;
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              dispatch(
                login({
                  email: googleEmail,
                  uId: user?.uid,
                  providerId: user?.providerData[0]?.providerId,
                  firstName: setFirstName,
                  lastName: setLastName,
                  profilePhoto: profilePic,
                }),
              );
            }
          });
          setindicator(false);
        }
      })
      .catch(error => {
        console.log('error from custom function of google', error);
        setindicator(false);
      });
  }

  const onFacebookPress = async () => {
    try {
      setFacebookLoader(true);
      await SigninWithFacebook(resCallBack, setFacebookLoader);
    } catch (error) {
      setFacebookLoader(false);
      console.log('facebook login error', error);
    }
  };

  const resCallBack = async (error, result) => {
    if (error) {
      setFacebookLoader(false);
      return ShowToast('Facebook login failed');
    } else {
      try {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch(
              login({
                email: result.email,
                uId: user?.uid,
                providerId: user?.providerData[0]?.providerId,
                firstName: result.first_name,
                lastName: result.last_name,
                profilePhoto: result.picture.data.url,
              }),
            );
            setFacebookLoader(false);
          }
        });
      } catch (error) {
        console.log('fb login failed', error);
        return ShowToast('Google Login failed!');
      };
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/signupbg.png')}
      resizeMode="cover"
      style={styles.bg_signup}>
      <BackHeader />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: wp('10%'), paddingTop: hp(5) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.signup_heading}>Welcome</Text>
        <Text style={styles.signup_title}>Lets make your hair attractive,</Text>
        <View style={{ flex: 0.5, marginTop: hp(10), paddingBottom: 10 }}>
          <Text style={styles.input_lable}>Enter your email</Text>
          <View style={styles.inputs_container}>
            <FontAwesome5
              name="mail-outline"
              type="Ionicons"
              color="#e0e0e0"
              size={32}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={styles.inputs}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#bbb9bd"
            />
          </View>
          <View style={styles.seperator}>
            <Text style={{ color: '#bbb9bd', textAlign: 'center' }}>OR</Text>
          </View>
          <TouchableOpacity onPress={googleSignIn} style={styles.button_container}>
            {indicator ? (
              <ActivityIndicator color={'#D1911E'} size={'small'} />
            ) : (
              <>
                <SvgGoogleIcon />
                <Text style={styles.btnText}>CONTINUE WITH GOOGLE</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_container} onPress={onFacebookPress}>
            {facebookLoader ? (
              <ActivityIndicator color={'#D1911E'} size={'small'} />
            ) : (
              <>
                <SvgFacebookIcon />
                <Text style={styles.btnText}>CONTINUE WITH FACEBOOK</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={{ marginTop: 40 }}>
            <PrimaryButton title="continue" onPress={() => onContinuePress()} />
            <View style={{ marginTop: hp('3%') }}>
              <PrimaryButton title="Already a user?" onPress={() => navigation.navigate('Login')} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  btnText: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    textAlign: 'center',
  },
  bg_signup: {
    flex: 1,
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
    padding: Platform.OS === 'android' ? 2 : hp(1),
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
    marginTop: hp(1.7),
    width: wp(80),
    justifyContent: 'space-evenly',
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
    // marginLeft: 10,
  },
});
