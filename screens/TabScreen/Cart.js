import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CartHeader from '../../components/Headers/CartHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';

const Cart = () => {
  const [tabActive, setTabActive] = useState('');
  console.log(tabActive);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../../assets/images/homebg.png')}
        resizeMode="cover"
        style={styles.bg_home}>
        {/* Cart Header  */}

        <CartHeader />
        {/* Cart Btn */}

        <View style={styles.cart_main}>
          <ScrollView>
            <View style={styles.btn_wrapper}>
              <TouchableOpacity
                style={tabActive === 'order' ? styles.btns_active : styles.btns}
                onPress={() => setTabActive('order')}>
                <Text style={{color: 'white'}}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tabActive !== 'order' ? styles.btns_active : styles.btns}
                onPress={() => setTabActive('history')}>
                <Text style={{color: 'white'}}>History</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </ScrollView>
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
    borderColor: '#DBBE62',
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  btns_active: {
    backgroundColor: '#DBBE62',
    paddingHorizontal: wp(16),
    paddingVertical: 10,
    borderRadius: 50,
  },
  btns: {
    backgroundColor: 'transparent',
    paddingHorizontal: wp(16),
    paddingVertical: 10,
    borderRadius: 50,
  },
});

export default Cart;
