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
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import { Appointment } from '../../redux/slices/StylistSlice';
import { ShowToast } from '../../utils';

// const services = [
//   {
//     id: 1,
//     text: 'Haircut',
//   },
//   {
//     id: 2,
//     text: 'Facial',
//   },
// ];

const Booking = ({route}) => {
  const navigation = useNavigation();
  const [selectedServices, setSelectedServices] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YY/MM/DD'));
  const [guest, setGuest] = useState(1);

  const dispatch = useDispatch()

  const { appointment_loader } = useSelector(state => state.stylistReducer)

  const data = route.params.bookingData;
  // console.log('service id', selectedServices.pivot.service_id, 'guest quantity', guest, 'date', selectedDate);
  console.log('data: ',data)

  const incrementQuantity = () => {
    setGuest(guest + 1);
  };

  const decrementQuantity = () => {
    if (guest > 1) {
      setGuest(guest - 1);
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

  const onGetDate = date => {
    setSelectedDate(moment(date).format('YY/MM/DD'));
  };

  const onAppointmentBook = async () => {

   if(selectedServices === ''){
      return ShowToast('Please select a service')
   } else { 
    const res = await dispatch(Appointment({
      stylist_id: selectedServices.pivot.user_id,
      service_id: selectedServices.pivot.service_id,
      appointment_date: selectedDate,
      no_of_guests: guest
    }))
   if(res.payload.success){
      navigation.navigate('home')
      return ShowToast(res.payload.message)
   } else {
      return ShowToast(res.payload.message)
   }
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
        {data?.services?.length < 1 ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 0.8}}>
            <Text style={styles.message}>
              No services available for this stylist
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: 10,
              paddingBottom: 20,
              // backgroundColor: 'red',
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
                selectedValue={selectedServices}
                dropdownIconColor={colors.orange}
                dropdownIconRippleColor={colors.orange}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedServices(itemValue)
                }>
                   <Picker.Item label="Select a service" value={{ userId: null, serviceId: null, label: "Select a service" }} />
                {data.services?.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={item.title}
                    value={item}
                    style={{color: colors.darkgray}}
                  />
                ))}
              </Picker>
            </View>
            {/*/////////////  filter items container ////////////// */}
            {/* reviews listing */}
            <ScrollView
            style={{backgroundColor:'red'}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 120}}>
              {/* calender */}
              <View style={styles.calenderBackground}>
                <CalendarPicker
                  startFromMonday={true}
                  onDateChange={date => onGetDate(date)}
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
                  allowRangeSelection={false}
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
                    <Text style={styles.quantityText}>{guest}</Text>
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
                  indicator={appointment_loader}
                  onPress={() => onAppointmentBook()}
                  buttonStyle={{width: '100%'}}
                />
              </View>
            </ScrollView>
          </View>
        )}
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
    marginVertical: hp('2.4%'),
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
    marginHorizontal: hp('2%'),
    width: hp('4%'),
  },
  message: {
    color: '#D49621',
    fontSize: hp('2.4%'),
    fontFamily: 'Lora-Bold',
  },
});

export default Booking;
