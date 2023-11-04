import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryButton = ({title, onPress}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.primary_btn}
        activeOpacity={0.7}
        onPress={onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F0BA10', '#F1DA86', '#D1911E']}
          style={styles.primary_btn_gradient}>
          <Text style={styles.primary_btn_text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  primary_btn: {
    width: wp('80%'),
    borderRadius: 50,
  },
  primary_btn_gradient: {
    width: wp('80%'),
    padding: 15,
    borderRadius: 50,
  },
  primary_btn_text: {
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textTransform: 'uppercase',
  },
});
