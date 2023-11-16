import {StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Subheading = ({title}) => {
  return <Text style={styles.sub_heading}>{title}</Text>;
};

export default Subheading;

const styles = StyleSheet.create({
  sub_heading: {
    fontWeight: '400',
    fontSize: hp('4%'),
    color: '#fff',
    fontFamily: 'Lora-Medium',
  },
});
