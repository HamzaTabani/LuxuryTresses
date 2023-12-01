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
import OutlineButton from '../../components/OutlineButton';
import {Picker} from '@react-native-picker/picker';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../assets/colors';
import Next from 'react-native-vector-icons/MaterialIcons';

const services = [
  {
    id: 1,
    text: 'Haircut',
  },
  {
    id: 2,
    text: 'Facial',
  },
];

const Booking = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('city');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const RenderNext = () => {
    return (
      <View style={styles.nextStyle}>
        <Next name={'navigate-next'} color={colors.white} size={25} />
      </View>
    );
  };

  const RenderPrevious = () => {
    return (
      <View style={styles.nextStyle}>
        <Next name={'navigate-before'} color={colors.white} size={25} />
      </View>
    );
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
              width: '100%',
              padding: hp('0.2%'),
              borderWidth: 0.8,
              borderColor: '#D49621',
              borderRadius: 40,
              backgroundColor: '#F4F4F4',
            }}>
            <Picker
              selectedValue={selectedLanguage}
              dropdownIconColor={colors.orange}
              dropdownIconRippleColor={colors.orange}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              {services.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.text}
                  value={item.text}
                  style={{color: colors.darkgray}}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/*/////////////  filter items container ////////////// */}
        {/* reviews listing */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          {/* calender */}
          <View style={styles.calenderBackground}>
            <CalendarPicker
              startFromMonday={true}
              onDateChange={date => setSelectedDate(date)}
              textStyle={{color: colors.white}}
              scaleFactor={400}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              nextComponent={RenderNext()}
              previousComponent={RenderPrevious()}
              selectedDayColor={'rgba(230, 171, 22, 1)'}
              selectedDayTextColor={colors.white}
              todayBackgroundColor={'rgba(230, 171, 22,15)'}
              allowRangeSelection={true}
              previousTitleStyle={{color: colors.white}}
              nextTitleStyle={{color: colors.white}}
              headerWrapperStyle={styles.headerStyle}
            />
          </View>
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
  calenderBackground: {
    backgroundColor: colors.orange,
    borderRadius: 20,
  },
  headerStyle: {
    borderWidth: 1,
    borderRadius: 50,
    marginTop: hp('2%'),
    width: '95%',
    backgroundColor: 'rgba(74, 74, 74, 0.1)',
    borderColor: colors.white,
    height: hp('8.5%'),
    padding: hp('1%'),
  },
  nextStyle: {
    backgroundColor: 'rgba(226, 204, 159, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('4%'),
    width: hp('4%'),
  },
});

export default Booking;
