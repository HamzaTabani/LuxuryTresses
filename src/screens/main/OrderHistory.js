import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {historyImages} from '../../dummyData';
import colors from '../../assets/colors';
import UserDetailCard from '../../components/UserDetailCard';
import StarRating from 'react-native-star-rating-widget';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';

const OrderHistory = () => {
  const [rating, setRating] = useState(0);
  return (
    <Container>
      <ProfileHeader icon={true} text={'Omnis iste'} username={true} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <Swiper
          containerStyle={{height: hp('25%')}}
          paginationStyle={{bottom: hp('2%')}}
          // autoplay
          activeDotColor={'#D49621'}
          dotStyle={{borderWidth: 1, borderColor: colors.orange}}>
          {historyImages.map(item => (
            <Image
              source={item.image}
              borderRadius={15}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </Swiper>
        <View style={{paddingTop: hp('3%')}}>
          <UserDetailCard
            username={'Omnis iste'}
            email={'address'}
            image={images.stylist1}
          />
        </View>
        <View
          style={{
            paddingTop: hp('4%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text}>Status</Text>
          <View style={styles.deliveredView}>
            <Text style={styles.deliveredText}>Delivered</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.textStyle}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem{'\n'}
          {'\n'} accusantium doloremque laudantium, totam rem aperiam, {'\n'}
          {'\n'} eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </Text>
        <View style={styles.cardStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.price}>$24.00</Text>
            <Text style={styles.quantityText}>
              Quantity:{' '}
              <Text
                style={{
                  color: colors.white,
                  fontSize: hp('2%'),
                  fontWeight: 'bold',
                }}>
                2
              </Text>
            </Text>
          </View>
          <View style={styles.line2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: hp('2.5%'),
            }}>
            <Text style={[styles.text, {fontSize: hp('2%')}]}>Tax</Text>
            <Text style={styles.quantityText}>5.000</Text>
          </View>
          <View style={styles.line2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: hp('2.5%'),
            }}>
            <Text style={[styles.text, {fontSize: hp('2%')}]}>Total</Text>
            <Text style={styles.price}>$24.00</Text>
          </View>
        </View>
        <View
          style={{
            // height: hp('25%'),
            backgroundColor: 'transparent',
            borderRadius: 20,
            borderColor: colors.gray,
            borderWidth: 0.5,
            marginTop: hp('5%'),
            padding: hp('1.5%'),
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: hp('2%'),
            }}>
            Add your review
          </Text>
          <StarRating
            rating={rating}
            starSize={30}
            color="#D59D33"
            starStyle={{marginTop: hp('5%')}}
            onChange={setRating}
          />
          <View
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#D49621',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: hp('3%'),
              // padding: hp('0.5%'),
              marginHorizontal: hp('1%'),
              marginBottom: 10,
            }}>
            <TextInput
              placeholder="Add comment"
              style={{marginLeft: 10, color: colors.white}}
              placeholderTextColor={colors.white}
            />
            <TouchableOpacity>
              <Ionicons
                name="send"
                type="AntDesign"
                color="#D49621"
                size={22}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  screen: {
    padding: hp('3%'),
    paddingTop: hp('2%'),
    // height: hp('100%'),
    // backgroundColor: 'red',
    paddingBottom: hp('12%'),
  },
  slideStyle: {
    alignItems: 'center',
  },
  image: {
    height: hp('25%'),
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: hp('2.5%'),
  },
  deliveredView: {
    borderWidth: 1,
    borderRadius: 40,
    width: '30%',
    padding: hp('1%'),
    borderColor: colors.orange,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deliveredText: {
    color: colors.orange,
  },
  line: {
    borderBottomWidth: 0.4,
    marginTop: hp('4%'),
    borderBottomColor: colors.orange,
  },
  descriptionText: {
    color: colors.white,
    marginTop: hp('3%'),
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  textStyle: {
    color: colors.white,
    marginTop: hp('2%'),
  },
  cardStyle: {
    // backgroundColor: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.gray,
    padding: hp('2%'),
    marginTop: hp('5%'),
  },
  price: {
    color: colors.orange,
    marginLeft: hp('1%'),
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
  },
  quantityText: {
    color: colors.white,
    alignSelf: 'center',
  },
  line2: {
    borderBottomColor: colors.white,
    marginTop: hp('2%'),
    borderBottomWidth: 0.5,
  },
});
