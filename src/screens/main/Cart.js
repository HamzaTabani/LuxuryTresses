import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CartHeader from '../../components/CartHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useState } from 'react';
import images from '../../assets/images';
import colors from '../../assets/colors';
import HistoryCard from '../../components/HistoryCard';
import Container from '../../components/Container';
import { histories } from '../../dummyData';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [tabActive, setTabActive] = useState('');

  const navigation = useNavigation()

  console.log(tabActive);
  return (
    <Container>
      <CartHeader />
      {/* Cart Btn */}
      <View style={styles.cart_main}>
        <View style={styles.btn_wrapper}>
          <TouchableOpacity
            style={tabActive === 'order' ? styles.btns_active : styles.btns}
            onPress={() => setTabActive('order')}>
            <Text style={{ color: 'white' }}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tabActive !== 'order' ? styles.btns_active : styles.btns}
            onPress={() => setTabActive('history')}>
            <Text style={{ color: 'white' }}>History</Text>
          </TouchableOpacity>
        </View>
        {tabActive === 'order' ?
          <View style={{ flex: 0.8, justifyContent: 'center' }}>
            <Image
              source={images.orders1}
              style={styles.orderImage}
            />
            <Text style={styles.text}>{'You have no favourites :('}</Text>
          </View>
          :
          <ScrollView contentContainerStyle={styles.historyWrapper}>
            {histories.map((item) => (
              <HistoryCard
                key={item.id}
                image={item.image}
                onPress={() => navigation.navigate('OrderHistory')}
              />
            ))}
          </ScrollView>
        }
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg_home: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cart_main: {
    flex: 2,
    height: '100%',
    paddingHorizontal: 20,
  },
  btn_wrapper: {
    borderWidth: 1.2,
    borderColor: colors.secondary,
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  btns_active: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 50,
    width: hp("20%"),
    alignItems:"center"
  },
  btns: {
    backgroundColor: 'transparent',
    paddingHorizontal: wp(16),
    paddingVertical: 10,
    borderRadius: 50,
  },
  orderImage: {
    height: hp('30%'),
    alignSelf: 'center',
    width: hp('30%')
  },
  text: {
    color: colors.secondary,
    width: '40%',
    fontSize: hp('3%'),
    marginTop: hp('3.5%'),
    alignSelf: 'center'
  },
  historyWrapper: {
    paddingTop: hp('5%'),
    paddingBottom: hp('14%')
  }
});

export default Cart;
