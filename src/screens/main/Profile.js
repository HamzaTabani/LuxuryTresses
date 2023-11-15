import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackHeader from '../../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import ModalChangeProfilePic from '../../components/ModalChangeProfilePic';
import colors from '../../assets/colors';

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
const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('city');
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/homebg.png')}
          resizeMode="cover"
          style={styles.bg_home}>
          <BackHeader />

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: wp('10%'),
            }}>
            <View
              style={{
                marginTop: 50,
                marginBottom: 100,
              }}>
              <View
                style={{
                  flex: 0.35,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                {/*Profile Image */}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#D49621',
                    borderRadius: 30,
                    padding: 5,
                    position: 'relative',
                  }}>
                  <Image
                    source={require('../../assets/images/profiledp.png')}
                    resizeMode="contain"
                    style={{height: 180, width: 180, borderRadius: 30}}
                  />
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <AntDesign
                      name="pluscircleo"
                      type="AntDesign"
                      color="#fff"
                      size={28}
                      style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 17,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                {/* name and status... */}
                <View
                  style={{
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <AntDesign
                      name="checkcircle"
                      type="AntDesign"
                      color="#19CC89"
                      size={20}
                    />
                    <Text style={styles.statusText}> Active</Text>
                  </View>
                  <Text style={styles.nameText}>Sarah J.</Text>

                  <Text style={styles.usernameText}>@sarah.j</Text>
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
                    onPress={() => navigation.navigate('initialprofile')}>
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
                          <Text style={{fontWeight: '500', color: '#000'}}>
                            Complete Profile
                          </Text>
                          <Text style={{fontSize: hp('1.3%'), color: 'grey'}}>
                            Sed ut perspiciatis unde amnis
                          </Text>
                        </View>
                        <View>
                          <Image
                            source={require('../../assets/images/blackarrow.png')}
                          />
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
                        style={{marginLeft: 10}}
                      />
                      <TextInput
                        style={styles.inputs}
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
                        style={{marginLeft: 10}}
                      />
                      <TextInput
                        style={styles.inputs}
                        placeholder="(012) 3434 789"
                        placeholderTextColor="#bbb9bd"
                      />
                    </View>
                  </View>
                ) : (
                  // form 2
                  <View style={styles.first_form_container}>
                    <View style={styles.inputs_container2}>
                      <View style={{flexDirection: 'row', gap: 10}}>
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
                              selectedValue={selectedLanguage}
                              dropdownIconColor={colors.orange}
                              dropdownIconRippleColor={colors.orange}
                              onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
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
                              selectedValue={selectedLanguage}
                              dropdownIconColor={colors.orange}
                              dropdownIconRippleColor={colors.orange}
                              onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
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
                      <View style={{flexDirection: 'row'}}></View>
                    </View>
                    <Text style={styles.label}>Your address</Text>
                    <View style={styles.inputs_container}>
                      <FontAwesome5
                        name="call-outline"
                        type="Ionicons"
                        color="#6D6C7B"
                        size={22}
                        style={{marginLeft: 10}}
                      />
                      <TextInput
                        style={styles.inputs}
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
                  <View
                    style={{
                      backgroundColor: '#D49621',
                      padding: 5,
                      borderRadius: 15,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/profilemap.png')}
                      style={{
                        width: '50%',
                        borderRadius: 15,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                          navigation.navigate('SecondaryStack', {
                            screen: 'SelectLocation',
                          })
                        }>
                        <Image
                          source={require('../../assets/images/mapicon.png')}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '400',
                          width: 80,
                        }}>
                        Use current location
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
      {/* profile pic change modal */}
      <ModalChangeProfilePic
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_home: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusText: {
    color: '#6f6f7f',
    fontSize: hp('1.8%'),
    marginBottom: 10,
  },
  nameText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: hp('3.5%'),
    marginTop: 10,
  },
  usernameText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '500',
    fontSize: hp('1.8%'),
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
    color: '#6D6C7B',
  },
  inputs_container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Profile;
