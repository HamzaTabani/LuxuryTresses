import {StyleSheet, View, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchTopButton from '../../src/components/SearchTopButton';
import { useState } from 'react';

const CartHeader = () => {
  const navigation = useNavigation();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <View style={styles.profile_header}>
      <View style={styles.back_button}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={{zIndex:100}}>
            <FontAwesome5
              name="arrow-back-sharp"
              type="Ionicons"
              color="#D49621"
              size={32}
            />
          </View>
        </Pressable>
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

export default CartHeader;

const styles = StyleSheet.create({
  profile_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: hp(12),
    zIndex:200
  },
  search_box: {
    padding: hp('1.55%'),
    justifyContent: 'center',
    backgroundColor: '#E3C164',
    borderRadius: 50,
  },
  back_button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#D49621',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
