import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Subheading = ({ title, expandIcon, nav }) => {
  const navigation = useNavigation();
  return (
    <>
      {expandIcon ? (
        <View style={styles.txtWithIcon}>
          <Text style={styles.sub_heading}>{title}</Text>
          <TouchableOpacity
            onPress={
              nav == 'stylist'
                ? () => navigation.navigate('TopStylists')
                : () => navigation.navigate('RecentProducts')
            }
            style={{
              borderRadius: 30,
              height: hp('7%'),
              width: hp('7%'),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#D49621',
              borderWidth: 0.5,
            }}>
            <MaterialCommunityIcons
              name="arrow-top-right"
              color="#D49621"
              size={30}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.sub_heading}>{title}</Text>
      )}
    </>
  );
};

export default Subheading;

const styles = StyleSheet.create({
  sub_heading: {
    fontWeight: '400',
    fontSize: hp('4%'),
    color: '#fff',
    fontFamily: 'Lora-Medium',
  },
  txtWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
