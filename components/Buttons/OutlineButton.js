import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OutlineButton = ({title, onPress}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.primary_btn}
        activeOpacity={0.7}
        onPress={onPress}>
        <Text style={styles.primary_btn_text}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  primary_btn: {
    width: wp('80%'),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D49621',
    padding: 15,
  },
  primary_btn_text: {
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D49621',
    textTransform: 'uppercase',
  },
});
