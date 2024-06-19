import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ModalChangeProfilePic from '../../components/ModalChangeProfilePic';
import colors from '../../assets/colors';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import Logout from 'react-native-vector-icons/MaterialIcons';
import { logoutUser } from '../../redux/slices/AuthSlice';
import { ShowToast } from '../../utils';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import {
  SvgProfileLocationCurrentIcon,
  SvgProfileLocationMapIcon,
  SvgarrowUpLeftIcon,
} from '../../components/SvgImages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, { firebase } from '@react-native-firebase/auth';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState('general');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const [userId, setUserId] = useState(false);

  const { user, pic_url } = useSelector(state => state.userData);

  const dispatch = useDispatch();

  const onSignOut = async () => {
    await dispatch(logoutUser());
    return ShowToast('Logout successfully');
  };

  const onLogoutPress = () => {
    return Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Yes', onPress: onSignOut },
      { text: 'No' },
    ]);
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.bg_home}>
        <BackHeader />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: hp('3%'),
            paddingBottom: hp('20%'),
          }}>
          <View
            style={{
              marginTop: 30,
              marginBottom: 100,
            }}>
            <View
              style={{
                flex: 0.35,
                flexDirection: 'row',
                alignItems: 'flex-end',
                // justifyContent: 'space-evenly',
                gap: hp('1.8%'),
              }}>
              {/*Profile Image */}
              <TouchableOpacity
                disabled={true}
                style={{
                  borderWidth: 1,
                  borderColor: '#D49621',
                  borderRadius: 30,
                  padding: 5,
                  position: 'relative',
                }}
              // onPress={() => setModalVisible(true)}
              >
                <FastImage
                  source={
                    user?.profile_pic
                      ? {
                        // uri: pic_url + user?.profile_pic,
                        uri: user?.profile_pic,
                        priority: FastImage.priority.normal,
                      }
                      : images.profile
                  }
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    height: hp('22%'),
                    width: hp('22%'),
                    borderRadius: 30,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginBottom: 20,
                  gap: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}
                  onPress={() => onLogoutPress()}>
                  <Logout name={'logout'} color={colors.orange} size={20} />
                  <Text style={[styles.statusText, { color: colors.orange }]}>
                    LOGOUT
                  </Text>
                </TouchableOpacity>
                <Text style={styles.nameText}>
                  {user?.first_name + ' ' + user?.last_name}
                </Text>
                <Text style={styles.usernameText}>
                  @{user?.first_name + user?.last_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.65,
              }}>
              {/* Profile banner */}
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 20,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProfileStack', {
                      screen: 'InitialProfile',
                      params: { user },
                    })
                  }>
                  <ImageBackground
                    source={require('../../assets/images/profilebanner.png')}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: 100,
                      borderRadius: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 100,
                        paddingHorizontal: 20,
                      }}>
                      <View>
                        <Text style={{ fontWeight: '500', color: '#000' }}>
                          Complete Profile
                        </Text>
                      </View>
                      <View>
                        <SvgarrowUpLeftIcon />
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              {/* Form Tabs */}
              <View style={styles.formTab}>
                <TouchableOpacity
                  style={
                    tab === 'general'
                      ? styles.tab_button_active
                      : styles.tab_button
                  }
                  onPress={() => setTab('general')}>
                  <Text
                    style={
                      tab === 'general'
                        ? styles.tab_button_text_active
                        : styles.tab_button_text
                    }>
                    General
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    tab === 'location'
                      ? styles.tab_button_active
                      : styles.tab_button
                  }
                  onPress={() => setTab('location')}>
                  <Text
                    style={
                      tab === 'location'
                        ? styles.tab_button_text_active
                        : styles.tab_button_text
                    }>
                    Location
                  </Text>
                </TouchableOpacity>
              </View>
              {tab === 'general' ? (
                <View style={styles.first_form_container}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputs_container}>
                    <FontAwesome5
                      name="person-outline"
                      type="Ionicons"
                      color="#6D6C7B"
                      size={22}
                      style={{ marginLeft: 10 }}
                    />
                    <TextInput
                      style={styles.inputs}
                      value={user?.email}
                      editable={false}
                      keyboardType="email-address"
                      placeholder="sarah.j@gmail.com"
                      placeholderTextColor="#bbb9bd"
                    />
                  </View>
                  <Text style={styles.label}>Your phone number</Text>
                  <View style={styles.inputs_container}>
                    <FontAwesome5
                      name="call-outline"
                      type="Ionicons"
                      color="#6D6C7B"
                      size={22}
                      style={{ marginLeft: 10 }}
                    />
                    <TextInput
                      style={styles.inputs}
                      editable={false}
                      value={user?.phone_number}
                      keyboardType="numeric"
                      placeholder="(012) 3434 789"
                      placeholderTextColor="#bbb9bd"
                    />
                  </View>
                </View>
              ) : (
                // form 2
                <View style={styles.first_form_container}>
                  <View style={styles.inputs_container2}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
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
                          <Text style={styles.labelStyle}>
                            {user?.city ? user?.city : 'City'}
                          </Text>
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
                          <Text style={styles.labelStyle}>
                            {user?.state ? user?.state : 'State'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}></View>
                  </View>
                  <Text style={styles.label}>Your address</Text>
                  <View style={styles.inputs_container}>
                    <FontAwesome5
                      name="person-outline"
                      type="Ionicons"
                      color="#6D6C7B"
                      size={22}
                      style={{ marginLeft: 10 }}
                    />
                    <TextInput
                      style={styles.inputs}
                      editable={false}
                      value={
                        user?.address != 'null'
                          ? user?.address
                          : 'Add your address'
                      }
                      onChangeText={text => setAddress(text)}
                      placeholder="Address"
                      placeholderTextColor="#bbb9bd"
                    />
                  </View>
                </View>
              )}
              <View
                style={{
                  marginHorizontal: 5,
                }}>
                <Text style={styles.label}>Set up your location</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('SecondaryStack', { screen: 'SelectLocation' })}
                  style={{
                    backgroundColor: '#D49621',
                    padding: 5,
                    borderRadius: 15,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}>
                  <SvgProfileLocationMapIcon />
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                      width: '50%',
                    }}>
                    <SvgProfileLocationCurrentIcon />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '400',
                        width: 80,
                      }}>
                      Use current location
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {userId ? null : (
                <View style={{ paddingTop: hp('5%') }}>
                  <PrimaryButton
                    title={'Change password'}
                    style={{ width: '110%' }}
                    onPress={() => navigation.navigate('SecondaryStack', { screen: 'ChangePassword' })}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bg_home: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  statusText: {
    color: '#6f6f7f',
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
    marginBottom: 10,
  },
  nameText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: hp('3%'),
    marginTop: 10,
    width: hp(18),
  },
  usernameText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '500',
    fontSize: hp('1.8%'),
    width: hp(18),
  },
  formTab: {
    borderWidth: 1.2,
    borderColor: '#D49621',
    height: hp('5%'),
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tab_button_active: {
    backgroundColor: '#E3C164',
    width: '47%',
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_button: {
    width: '47%',
    borderRadius: 50,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_button_text_active: {
    fontWeight: '400',
    color: '#000',
  },
  tab_button_text: {
    fontWeight: '400',
    color: '#fff',
  },
  first_form_container: {
    marginTop: 20,
    marginHorizontal: 5,
  },
  label: {
    fontSize: hp('1.5%'),
    color: '#fff',
    marginBottom: 10,
  },
  inputs_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderWidth: 0.6,
    borderRadius: 40,
    borderColor: '#D49621',
    marginBottom: 15,
  },
  inputs: {
    marginLeft: 10,
    width: '80%',
    color: '#bbb9bd',
  },
  inputs_container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  labelStyle: {
    color: '#bbb9bd',
    marginLeft: hp('2.7%'),
    marginTop: hp('1.7%'),
  },
});

export default Profile;
