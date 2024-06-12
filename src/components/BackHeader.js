import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const BackHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.back_header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.back_button}>
        <FontAwesome5
          name="arrow-back-sharp"
          type="Ionicons"
          color="#D49621"
          size={32}
        />
      </Pressable>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  back_header: {
    height: hp('14%'),
    paddingTop: hp('3%'),
    zIndex: 100,
  },
  back_button: {
    marginTop: 20,
    marginLeft: 25,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#D49621',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
