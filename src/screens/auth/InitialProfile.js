import React, {useState, useRef} from 'react';

import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import OutlineButton from '../../components/OutlineButton';

const InitialProfile = ({navigation}) => {
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
        <View style={styles.back_header}>
          <Pressable onPress={() => navigation.navigate("tabs")}>
            <View style={styles.back_button}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#D49621',
                }}>
                SKIP
              </Text>
            </View>
          </Pressable>
        </View>

        <ScrollView
        >

          <View
            style={{
              flex: 0.2,
              marginTop: hp('7%'),
              paddingHorizontal: wp('10%'),
            }}>
            <Text style={styles.signup_heading}>How people to know you?</Text>
          </View>
          <View
            style={{
              flex: 0.8,
            }}>
            <View
              style={{
                backgroundColor: '#0C0A22',
                width: '100%',
                alignItems: 'center',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingBottom: 40,
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
                    }}>
                    <Image
                      source={require('../../assets/images/profileimg.png')}
                      style={{
                        position: 'absolute',
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
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.input_lable}>Enter your name</Text>
                <View style={styles.inputs_container}>
                  <FontAwesome5
                    name="person-outline"
                    type="Ionicons"
                    color="#bbb9bd"
                    size={28}
                    style={{marginLeft: 10}}
                  />
                  <TextInput
                    style={styles.inputs}
                    placeholder="User name"
                    placeholderTextColor="#bbb9bd"
                  />
                </View>

                <Text style={styles.input_lable}>Your phone number</Text>
                <View style={styles.inputs_container}>
                  <FontAwesome5
                    name="call-outline"
                    type="Ionicons"
                    color="#bbb9bd"
                    size={28}
                    style={{marginLeft: 10}}
                  />
                  <TextInput
                    style={styles.inputs}
                    placeholder="Phone number"
                    placeholderTextColor="#bbb9bd"
                  />
                </View>
              </View>

              <View style={{alignItems: 'center', marginTop: 40}}>
                <OutlineButton
                  title="done"
                  onPress={() => navigation.navigate('TabNavigation')}
                />
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
});
