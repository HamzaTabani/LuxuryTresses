import React, {useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CheckoutProductCard from '../../components/CheckoutProductCard';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {checkoutss} from '../../dummyData';
import {useSelector, useDispatch} from 'react-redux';
import {addProductinCart} from '../../redux/slices/ECommerceSlice';

const Checkout = () => {
  const navigation = useNavigation();

  const {cart_product} = useSelector(state => state.ecommerceReducer);
  // console.log('whyy', cart_product);

  const dispatch = useDispatch();

  const onIncreaseQuantity = index => {
    const updatedCart = cart_product.map(item => {
      if (
        item.productDetail.product_id ===
        cart_product[index].productDetail.product_id
      ) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    dispatch(addProductinCart(updatedCart));
  };

  const onDecreaseQuantity = index => {
    const updatedCart = cart_product.map(item => {
      if (
        item.productDetail.product_id ===
        cart_product[index].productDetail.product_id
      ) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
        };
      }
      return item;
    });
    dispatch(addProductinCart(updatedCart));
  };

  const calculateTotal = () => {
    return cart_product.reduce(
      (total, item) => total + item.productDetail.price * item.quantity,
      0,
    );
  };

  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Checkout'} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* checkout product list */}
        <View
          style={{
            paddingBottom: 40,
            borderColor: '#D49621',
            borderBottomWidth: 0.6,
          }}>
          {cart_product.map((item, index) => (
            <CheckoutProductCard
              // image={item.image}
              name={item.productDetail.title}
              quantity={item.quantity}
              price={item.productDetail.price}
              increment={() => onIncreaseQuantity(index)}
              decrement={() => onDecreaseQuantity(index)}
            />
          ))}
        </View>
        {/* checkout summary */}
        <View style={{marginTop: 15}}>
          <Text
            style={{color: '#fff', fontWeight: 'bold', fontSize: hp('2.5%')}}>
            Payment Summary
          </Text>
          <View style={styles.summaryDetailsContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Total</Text>
              <Text style={styles.summaryItemTitleText}>
                ${calculateTotal()}
              </Text>
            </View>
            {/* <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Delivery</Text>
              <Text style={styles.summaryItemTitleText}>$15</Text>
            </View>
            <View style={styles.summaryItemLast}>
              <Text style={styles.summaryItemTotalTitle}>Total</Text>
              <Text style={styles.summaryItemTotalPrice}>$65</Text>
            </View> */}
          </View>
        </View>
        {/* Pay Button */}
        <View style={{marginTop: hp('4%'), alignItems: 'center'}}>
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
    paddingBottom: hp('10%'),
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
    // borderBottomWidth: 0.5,
    // borderColor: '#D49621',
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
