import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import ProfileImgRound from '../ProfileImgRound';
import SearchTopButton from '../SearchTopButton';

const ProfileHeader = () => {
  return (
    <View style={styles.profile_header}>
      <View>
        <ProfileImgRound />
      </View>
      
      <View>
        <SearchTopButton />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profile_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  search_box: {
    padding: hp('1.55%'),
    justifyContent: 'center',
    backgroundColor: '#E3C164',
    borderRadius: 50,
  },
});
