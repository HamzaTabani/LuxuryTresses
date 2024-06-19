import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OutlineButton = ({ title, onPress, textStyle, buttonStyle, indicator }) => {
  return (
    <TouchableOpacity
      style={[styles.primary_btn, buttonStyle]}
      activeOpacity={0.7}
      onPress={onPress}>
      {indicator ?
        <ActivityIndicator
          color={'#D49621'}
          size={'small'}
          style={{ alignSelf: 'center' }}
        />
        :
        <Text style={[styles.primary_btn_text, textStyle]}>{title}</Text>
      }
    </TouchableOpacity>
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
