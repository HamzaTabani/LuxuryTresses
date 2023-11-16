import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import PayMethodCard from '../../components/PayMethodCard';
import { methods } from '../../dummyData';
import images from '../../assets/images';
import colors from '../../assets/colors';

const PaymentMethod = () => {
  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Payment Options'} />
      <ScrollView style={styles.container}>
        {/* checkout product list */}
        <View
          style={{
            paddingBottom: hp('5%'),
            borderBottomColor: '#D49621',
            borderBottomWidth: 0.3,
          }}>
          <ImageBackground
            source={images.card_background}
            borderRadius={20}
            imageStyle={{
              width: '100%',
              height: 205,
              borderColor: colors.orange,
              borderWidth: 1
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ margin: hp('2.5%') }}>
              <Text style={styles.userCartText}>Sarah.J</Text>
              <Image
                source={images.card_scan}
                borderRadius={10}
                style={styles.imageStyle}
              />
              <View style={{ marginTop: hp('3%') }}>
                <Text style={styles.userCartText}>1234 5678 9101 2345</Text>
                <Text
                  style={{
                    fontWeight: 'light',
                    color: '#efefef',
                    fontSize: hp('1.5%'),
                  }}>
                  12 / 24</Text>
              </View>
            </View>
            <Image
              source={images.master_card}
              style={styles.image}
            />
          </ImageBackground>
          {/* <CheckoutProductCard /> */}
          {/* <CheckoutProductCard /> */}
          <View style={{ alignItems: 'center', marginTop: hp('6%') }}>
            <OutlineButton title="Add New Card" textStyle={{ color: '#fff' }} />
          </View>
        </View>
        {/* checkou summary */}
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              marginBottom: 20,
            }}>
            Other payment method
          </Text>
          {methods.map((item) => (
            <PayMethodCard
              image={item.image}
              cardname={item.card}
              number={item.number}
            />
          ))}
        </View>
        {/* Pay Button */}
        <View style={{ marginTop: hp('2%'), alignItems: 'center' }}>
          <PrimaryButton title="Pay now" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#D49621',
    padding: 10,
  },
  summaryItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  summaryItemTitleText: {
    color: '#efefef',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalPrice: {
    color: '#D49621',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  userCartText: {
    fontWeight: 'light',
    color: '#fff',
    fontSize: hp('2.5%'),
  },
  image: {
    height: hp('5%'),
    marginTop: hp('2.5%'),
    marginRight: hp('5%'),
    width: '18%'
  },
  imageStyle: {
    height: hp('3%'),
    marginTop: hp('3%'),
    width: hp('5%')
  }
});

export default PaymentMethod;
