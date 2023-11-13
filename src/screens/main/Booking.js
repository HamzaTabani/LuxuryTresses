import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ReviewDetailCard from '../../components/ReviewDetailCard';
import OutlineButton from '../../components/OutlineButton';
import {Picker} from '@react-native-picker/picker';

const Booking = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('city');

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Booking</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            {/* filter icon */}
            <Pressable onPress={() => navigation.goBack()}>
              <View style={styles.filterButton}>
                <FontAwesome5
                  name="close"
                  type="AntDesign"
                  color="#D49621"
                  size={22}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            paddingBottom: 20,
            borderBottomWidth: 0.5,
            borderColor: '#D49621',
          }}>
          {/* select box  */}

          <View
            style={{
              width: "100%",
              height: 50,
              borderWidth: 0.8,
              borderColor: '#D49621',
              borderRadius: 40,
              backgroundColor:"#F4F4F4"
            }}>
            <Picker
              selectedValue={selectedLanguage}
              dropdownIconColor={'#000'}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item
                label="Select Service"
                value="city"
                style={{
                  color: '#000',
                }}
              />
              <Picker.Item
                label="Java"
                value="java"
                style={{
                  backgroundColor: 'gray',
                  color: '#fff',
                }}
              />
              <Picker.Item
                label="JavaScript"
                value="js"
                style={{
                  backgroundColor: 'gray',
                  color: '#fff',
                }}
              />
            </Picker>
          </View>
        </View>

        {/*/////////////  filter items container ////////////// */}
        {/* reviews listing */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          {/* calender */}

          {/* guest select button */}
          <View style={styles.productQuantityBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginLeft: 20,
              }}>
              <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                Select Guest
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <OutlineButton
              title="Book now"
              textStyle={{color: '#000'}}
              buttonStyle={{width: '100%'}}
            />
          </View>
        </ScrollView>
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  trendingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  filterButton: {
    height: 50,
    width: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productQuantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D49621',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 2,
    backgroundColor: '#F4F4F4',
    marginTop: 20,
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D49621',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#D49621',
  },
  quantityButton: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D49621',
  },
  quantityText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Booking;
