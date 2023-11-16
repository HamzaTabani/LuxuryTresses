import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckoutProductCard from '../../components/CheckoutProductCard';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { checkoutss } from '../../dummyData';

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Checkout'} />
      <ScrollView style={styles.container}>
        {/* checkout product list */}
        <View
          style={{
            paddingBottom: 40,
            borderColor: '#D49621',
            borderBottomWidth: 0.6,
          }}>
          {checkoutss.map((item) => (
            <CheckoutProductCard
              image={item.image}
              price={item.price}
            />
          ))}
        </View>
        {/* checkou summary */}
        <View style={{ marginTop: 15 }}>
          <Text
            style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('2.5%') }}>
            Payment Summary
          </Text>

          <View style={styles.summaryDetailsContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Sub Total</Text>
              <Text style={styles.summaryItemTitleText}>$45</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Delivery</Text>
              <Text style={styles.summaryItemTitleText}>$15</Text>
            </View>
            <View style={styles.summaryItemLast}>
              <Text style={styles.summaryItemTotalTitle}>Total</Text>
              <Text style={styles.summaryItemTotalPrice}>$15</Text>
            </View>
          </View>
        </View>
        {/* Pay Button */}
        <View style={{ marginTop: hp('5%'), alignItems: 'center' }}>
          <PrimaryButton
            title="Pay now"
            onPress={() => navigation.navigate('PaymentMethod')}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  summaryDetailsContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#D49621',
    padding: 10,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: '#020116',
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
});

export default Checkout;
