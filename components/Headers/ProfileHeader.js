import {StyleSheet, View, Text} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProfileImgRound from '../ProfileImgRound';
import SearchTopButton from '../SearchTopButton';
import {useState} from 'react';

const ProfileHeader = ({username}) => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <View style={styles.profile_header}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
        <ProfileImgRound />

        {!searchActive && username ? (
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              fontSize: hp('3%'),
            }}>
            Hi Sarah,
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
