import {StyleSheet, View, Text, Pressable} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import SearchTopButton from './SearchTopButton';
import ProfileImgRound from './ProfileImgRound';
import Back from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors';
import {useNavigation} from '@react-navigation/native';

const ProfileHeader = ({username, icon, text}) => {
  const [searchActive, setSearchActive] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.profile_header}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
        {icon ? (
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.iconView}>
              <Back name={'arrow-back'} color={colors.orange} size={25} />
            </View>
          </Pressable>
        ) : (
          <ProfileImgRound />
        )}
        {!searchActive && username ? (
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              fontSize: hp('3%'),
              fontFamily: 'Lora-Medium',
            }}>
            {text}
          </Text>
        ) : null}
      </View>
      <View>
        <SearchTopButton
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profile_header: {
    paddingTop: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  search_box: {
    padding: hp('1.55%'),
    justifyContent: 'center',
    backgroundColor: '#E3C164',
    borderRadius: 50,
  },
  iconView: {
    borderRadius: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.orange,
    height: hp('6%'),
    width: hp('6%'),
  },
});
