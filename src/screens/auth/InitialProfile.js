import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import OutlineButton from '../../components/OutlineButton';
import InputText from '../../components/InputText';
import {useDispatch, useSelector} from 'react-redux';
import {editProfile, register} from '../../redux/slices/AuthSlice';
import {ShowToast} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import colors from '../../assets/colors';
import images from '../../assets/images';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const cities = [
  {
    id: 1,
    text: 'Los Angeles',
  },
  {
    id: 2,
    text: 'Washington',
  },
  {
    id: 3,
    text: 'Chicago',
  },
];

const states = [
  {
    id: 1,
    text: 'Texas',
  },
  {
    id: 2,
    text: 'California',
  },
  {
    id: 3,
    text: 'Illinois',
  },
];

const InitialProfile = ({route}) => {
  const email = route?.params?.userData || null;
  const {user} = route?.params || null;
  const {signup_loading, pic_url, edit_loading} = useSelector(
    state => state.userData,
  );
  const [firstname, setFirstName] = useState(user ? user?.first_name : '');
  const [lastname, setLastName] = useState(user ? user?.last_name : '');
  const [phonenumber, setPhoneNumber] = useState(
    user ? user?.phone_number : '',
  );
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [photoURL, setPhotoURL] = useState(
    user?.profile_pic ? pic_url + user?.profile_pic : '',
  );
  const [address, setAddress] = useState(user ? user?.address : '');
  const [selectedCity, setSelectedCity] = useState('Los Angeles');
  const [selectedState, setSelectedState] = useState('Texas');
  const [token, setToken] = useState('');
  const [userUId, setUserUId] = useState('');

  console.log('user email =========>', selectedCity);

  // console.log(auth().currentUser.uid);
  console.log('token:', token);

  // console.log('photo uri', photoURL)

  const dispatch = useDispatch();
  // console.log('loader', edit_loading)

  const navigation = useNavigation();
  // console.log('asdasdasd', navigation.getState().routeNames[1])

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const token = await messaging().getToken();
      console.log('dEVICE TOKEN', token);
      const userId = uuid.v4();
      setUserUId(userId);
      setToken(token);
    }
  }

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setPassword('');
    setCPassword('');
    setPhotoURL('');
  };

  const onButtonPress = async () => {
    if (navigation.getState().routeNames[0] === 'Profile') {
      if (!photoURL) {
        return ShowToast('Profile update failed');
      } else {
        const res = await dispatch(
          editProfile({
            first_name: firstname,
            last_name: lastname,
            phone_number: phonenumber,
            address: address,
            state: selectedState,
            city: selectedCity,
            profile_pic: photoURL,
          }),
        );
        // console.log('response from action', res)
        if (res.payload) {
          navigation.goBack();
          return ShowToast('Profile updated successfully');
        }
      }
    } else {
      if (!firstname) {
        return ShowToast('Please type your details');
      } else if (cpassword !== password) {
        return ShowToast('Password does not match');
      } else if (password.length < 8) {
        return ShowToast('Password is too short');
      } else {
        console.log(
          'all console',
          token,
          userUId, 
          email,
          firstname,
          lastname,
          phonenumber,
          // photoURL,
        );
        // const userId = auth().currentUser.uid;
        // console.log('userUId', userUId);
        await firestore()
          .collection('users')
          .doc(userUId)
          .set({
            userUId: userUId,
            device_token: token,
            email: email,
            first_name: firstname,
            last_name: lastname,
            phone_number: phonenumber,
            profile_picture: photoURL,
          })
          .then(res => {
            console.log('firbase database created succuessfully!', res);
            ContinueRegister();
          })
          .catch(error => {
            console.log('firebase cloud error=-=>', error);
          });
        // await dispatch(
        //   register({
        //     first_name: firstname,
        //     last_name: lastname,
        //     phone_number: phonenumber,
        //     email: email,
        //     password: password,
        //     profile_pic: photoURL,
        //   }),
        // );
        // clearState();
      }
    }
  };

  const ContinueRegister = async () => {
    await dispatch(
      register({
        first_name: firstname,
        last_name: lastname,
        phone_number: phonenumber,
        email: email,
        password: password,
        profile_pic: photoURL,
        firebase_id: userUId
      }),
    );
    clearState();
  };

  const onUploadPhoto = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        setPhotoURL(response.assets[0].uri);
      }
    });
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
        <TouchableOpacity
          style={styles.back_header}
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}>
          <View style={styles.back_button}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#D49621',
              }}>
              SKIP
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView
        // contentContainerStyle={{paddingBottom: user ? hp('55%') : hp('50%')}}
        >
          <View
            style={{
              flex: 0.2,
              marginTop: hp('1%'),
              paddingHorizontal: wp('10%'),
            }}>
            <Text style={styles.signup_heading}>How people to know you?</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: '#0C0A22',
                height: hp('130%'),
                // flex: 1,
                // width: '100%',
                alignItems: 'center',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginTop: hp('3%'),
              }}>
              <View style={{width: wp('80%')}}>
                <View>
                  <Text style={styles.input_lable}>Add profile picture</Text>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#D49621',
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      position: 'relative',
                      top: 'center',
                      left: 'center',
                    }}
                    activeOpacity={0.9}
                    onPress={() => onUploadPhoto()}>
                    <Image
                      source={
                        photoURL != ''
                          ? {uri: photoURL}
                          : images.initialProfileCam
                      }
                      resizeMode="contain"
                      borderRadius={100}
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 'center',
                        left: 'center',
                        width: 100,
                        height: 100,
                      }}
                    />
                    <FontAwesome5
                      name="add-circle"
                      type="Ionicons"
                      color="#D49621"
                      size={30}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        // left:5
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.input_lable}>Enter your name</Text>
                <View style={styles.inputs_container}>
                  <FontAwesome5
                    name="person-outline"
                    type="Ionicons"
                    color="#bbb9bd"
                    size={28}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    style={styles.inputs}
                    placeholder="User name"
                    placeholderTextColor="#bbb9bd"
                  />
                </View> */}

                {/* <Text style={styles.input_lable}>Your phone number</Text>
                <View style={styles.inputs_container}>
                  <FontAwesome5
                    name="call-outline"
                    type="Ionicons"
                    color="#bbb9bd"
                    size={28}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    style={styles.inputs}
                    keyboardType='numeric'
                    placeholder="Phone number"
                    placeholderTextColor="#bbb9bd"
                  />
                </View> */}
                <View style={{paddingTop: hp('4%')}}>
                  <InputText
                    placeholder={'First Name'}
                    value={firstname}
                    label={'Enter your first name'}
                    onChangeText={text => setFirstName(text)}
                    icon={'person-outline'}
                  />
                  <InputText
                    placeholder={'Last Name'}
                    value={lastname}
                    label={'Enter your last name'}
                    onChangeText={text => setLastName(text)}
                    icon={'person-outline'}
                  />
                  <InputText
                    placeholder={'Phone number'}
                    value={phonenumber != 'null' && phonenumber}
                    keyboardType={'numeric'}
                    onChangeText={text => setPhoneNumber(text)}
                    label={'Enter your phone number'}
                    icon={'call-outline'}
                  />
                  {user && (
                    <>
                      <InputText
                        placeholder={'Address'}
                        // value={address}
                        value={address != 'null' && address}
                        onChangeText={text => setAddress(text)}
                        label={'Enter your address'}
                        // icon={'person-outline'}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={styles.label}>City</Text>
                          <View
                            style={{
                              height: 50,
                              borderWidth: 0.5,
                              borderColor: '#D49621',
                              borderRadius: 40,
                              borderRadius: 50,
                              width: 140,
                            }}>
                            <Picker
                              selectedValue={selectedCity}
                              dropdownIconColor={colors.orange}
                              dropdownIconRippleColor={colors.orange}
                              onValueChange={(itemValue, itemIndex) =>
                                setSelectedCity(itemValue)
                              }>
                              {cities.map(item => (
                                <Picker.Item
                                  key={item.id}
                                  label={item.text}
                                  value={item.text}
                                  style={{color: colors.darkgray}}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                        <View>
                          <Text style={styles.label}>State</Text>
                          <View
                            style={{
                              height: 50,
                              borderWidth: 0.5,
                              borderColor: '#D49621',
                              borderRadius: 40,
                              borderRadius: 50,
                              width: 140,
                            }}>
                            <Picker
                              selectedValue={selectedState}
                              dropdownIconColor={colors.orange}
                              dropdownIconRippleColor={colors.orange}
                              onValueChange={(itemValue, itemIndex) =>
                                setSelectedState(itemValue)
                              }>
                              {states.map(item => (
                                <Picker.Item
                                  key={item.id}
                                  label={item.text}
                                  value={item.text}
                                  style={{color: colors.darkgray}}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      </View>
                    </>
                  )}
                  {!user && (
                    <>
                      <InputText
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        label={'Enter your password'}
                        icon={'lock-closed-outline'}
                      />
                      <InputText
                        placeholder={'Confirm Password'}
                        secureTextEntry={true}
                        onChangeText={text => setCPassword(text)}
                        value={cpassword}
                        label={'Confirm password'}
                        icon={'lock-closed-outline'}
                      />
                    </>
                  )}
                </View>
                <View style={{alignItems: 'center', marginTop: 40}}>
                  <OutlineButton
                    title="done"
                    indicator={user ? edit_loading : signup_loading}
                    onPress={() => onButtonPress()}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default InitialProfile;

const styles = StyleSheet.create({
  bg_signup: {
    flex: 1,
    justifyContent: 'space-between',
  },
  back_header: {
    height: hp('10%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('12%'),
  },
  back_button: {
    marginTop: 20,
    marginLeft: 15,
    width: 80,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#D49621',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup_heading: {
    fontSize: hp('5%'),
    color: '#fff',
    fontFamily: 'Lora-Medium',
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
    marginTop: 25,
  },
  seperator: {
    marginVertical: 40,
  },
  btn_icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  label: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginBottom: 15,
    marginTop: 10,
  },
});
