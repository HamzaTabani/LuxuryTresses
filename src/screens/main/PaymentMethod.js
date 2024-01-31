import React, {useRef, useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import PayMethodCard from '../../components/PayMethodCard';
import {methods} from '../../dummyData';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import PaymentCard from '../../components/PaymentCard';
import {useSelector, useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Payment, STRIPE_KEY} from '../../redux/slices/AuthSlice';
import {ShowToast} from '../../utils';

var stripe = require('stripe-client')(STRIPE_KEY);

const PaymentMethod = ({route}) => {
  const {card, payment_loading} = useSelector(state => state.userData);
  const {cart_product} = useSelector(state => state.ecommerceReducer);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    card_holder: '',
    card_number: '',
    exp_year: '',
    exp_month: '',
    cvc: '',
  });
  const navigation = useNavigation();
  const sheetRef = useRef();

  // console.log(state);

  const grand_total = route?.params?.total;
  const product_note = route?.params?.note;
  // console.log(grand_total, product_note)

  const onPayment = async () => {
    const product = cart_product.map(item => ({
      id: item.productDetail.product_id,
      quantity: item.quantity,
      price: Math.round(item.productDetail.price * 100) / 100,
    }));

    // return console.log(product)

    var information = {
      card: {
        number: state.card_number,
        exp_month: state.exp_month,
        exp_year: state.exp_year,
        cvc: state.cvc,
        name: state.card_holder,
      },
    };

    var card = await stripe.createToken(information);
    var token = card.id;

    // return console.log('stripe token =========>', token);

    const res = await dispatch(
      Payment({
        product: product,
        total: grand_total,
        note: product_note,
        stripe_token: token,
      }),
    );
    if (res.payload.success) {
      navigation.navigate('home');
      return ShowToast(res.payload.message);
    } else {
      return ShowToast(res.payload.message);
    }
  };

  const onButtonPress = () => {
    if (card.length > 0) {
      sheetRef.current.open();
    } else {
      navigation.navigate('AddNewCard');
    }
  };

  const onSelectCard = card => {
    setState({
      ...state,
      card_holder: card.card_holder,
      card_number: card.card_number,
      exp_year: card.exp_year,
      exp_month: card.exp_month,
      cvc: card.cvc,
    });
    sheetRef.current.close();
  };

  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Payment Options'} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* checkout product list */}
        {card.length > 0 && (
          <PaymentCard
            cardStyle={{width: '100%'}}
            cardholder_name={
              state.card_holder !== '' ? state.card_holder : card[0].card_holder
            }
            card_number={
              state.card_number !== '' ? state.card_number : card[0].card_number
            }
            date={
              state.exp_month !== ''
                ? state.exp_month + '/' + state.exp_year
                : card[0].exp_month + '/' + card[0].exp_year
            }
            masterStyle={{width: '21%'}}
          />
        )}
        {/* <CheckoutProductCard /> */}
        {/* <CheckoutProductCard /> */}
        <View
          style={{
            alignItems: 'center',
            marginTop: hp('6%'),
            paddingBottom: hp('3%'),
            borderBottomColor: '#D49621',
            borderBottomWidth: 0.3,
          }}>
          <OutlineButton
            title={card.length > 0 ? 'Select Card' : 'Add New Card'}
            textStyle={{color: '#fff'}}
            onPress={() => onButtonPress()}
          />
        </View>
        {/* checkou summary */}
        <View style={{marginTop: 15}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              marginBottom: 20,
            }}>
            Other payment method
          </Text>
          {methods.map(item => (
            <PayMethodCard
              image={item.image}
              cardname={item.card}
              number={item.number}
            />
          ))}
        </View>
        {/* Pay Button */}
        <View style={{marginTop: hp('2%'), alignItems: 'center'}}>
          <PrimaryButton
            title="Pay now"
            onPress={() => onPayment()}
            indicator={payment_loading}
          />
        </View>
        <RBSheet
          ref={sheetRef}
          height={350}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: colors.primary,
              alignItems: 'center',
              paddingTop: hp('4%'),
            },
          }}>
          <ScrollView
            contentContainerStyle={styles.sheetScroll}
            scrollEnabled={card.length > 1 && true}
            showsVerticalScrollIndicator={false}>
            {card.map(item => (
              <View style={{marginBottom: hp('4%')}}>
                <PaymentCard
                  cardholder_name={item.card_holder}
                  card_number={item.card_number}
                  date={item.exp_year + '/' + item.exp_month}
                  cardStyle={{height: '100%', width: '100%'}}
                  masterStyle={{width: '22%'}}
                  onCardPress={() => onSelectCard(item)}
                />
              </View>
            ))}
            <View style={{alignItems: 'center', paddingTop: hp('2%')}}>
              <OutlineButton
                title={'Add New Card'}
                onPress={() => navigation.navigate('AddNewCard')}
              />
            </View>
          </ScrollView>
        </RBSheet>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 15,
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
  sheetScroll: {
    // backgroundColor: 'red',
    paddingBottom: hp('10%'),
  },
});

export default PaymentMethod;
