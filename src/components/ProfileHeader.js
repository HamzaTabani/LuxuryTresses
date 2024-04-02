import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useState} from 'react';
import colors from '../assets/colors';
import SearchTopButton from './SearchTopButton';
import ProfileImgRound from './ProfileImgRound';
import Back from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileHeader = ({
  username,
  icon,
  text,
  onBackPress,
  filter,
  filterActive,
  setFilterActive,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const navigation = useNavigation();

  const handleFilter = () => {
    setFilterActive(!filterActive);
  };

  // console.log(text?.length);

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
              // width: text?.length === 28 && hp('32%'),
              fontSize: hp('2.5%'),
              fontFamily: 'Lora-Medium',
              width: hp('30%'),
            }}>
            {text}
          </Text>
        ) : null}
      </View>
      {filter ? (
        <View style={styles.filter}>
          <Ionicons
            name="options-outline"
            type="Ionicons"
            color="#fff"
            size={25}
            onPress={() => handleFilter()}
          />
        </View>
      ) : (
        <View>
          <SearchTopButton
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />
        </View>
      )}
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
    // backgroundColor:'red'
  },
  filter: {
    backgroundColor: '#E3C164',
    borderRadius: 50,
    height: hp(5),
    width: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
