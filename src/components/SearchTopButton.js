import {StyleSheet, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';

const SearchTopButton = ({searchActive, setSearchActive}) => {
  const onSearchBarPress = () => {
    setSearchActive(!searchActive);
  };

  return (
    <View style={searchActive ? styles.search_box_active : styles.search_box}>
      {searchActive ? (
        <>
          <TextInput
            placeholder="Search Here "
            placeholderTextColor="#fff"
            style={{width: '80%'}}
          />
          <FontAwesome5
            name="close-sharp"
            type="Ionicons"
            color="#fff"
            size={28}
            onPress={() => onSearchBarPress()}
          />
        </>
      ) : (
        <>
          <FontAwesome5
            name="search"
            type="Ionicons"
            color="#fff"
            size={28}
            onPress={() => onSearchBarPress()}
          />
        </>
      )}
    </View>
  );
};

export default SearchTopButton;

const styles = StyleSheet.create({
  search_box: {
    flexDirection: 'row',
    padding: hp('1.6%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3C164',
    borderRadius: 50,
    position: 'relative',
  },
  search_box_active: {
    flexDirection: 'row',
    padding: hp('0.8%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3C164',
    borderRadius: 50,
    position: 'relative',
    width: wp('70%'),
  },
  search_field_box: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'red',
  },
});
