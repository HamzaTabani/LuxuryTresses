import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CheckoutProductCard = ({ image, name, price }) => {
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
    <View style={styles.productQuantityBox}>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
        }}>
        <View
          style={{
            width: 70,
            height: 70,
          }}>
          <Image
            source={image}
            resizeMode="cover"
            style={{ width: '100%', height: '100%', borderRadius: 15 }}
          />
          {/* online status button */}
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: hp('2.0%') }}>
            Deep mask
          </Text>
          <Text
            style={{
              color: '#efefef',
              fontSize: hp('1.5%'),
              marginTop: 2,
            }}>
            {price}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
  );
};

const styles = StyleSheet.create({
  productQuantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D49621',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#020116',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D49621',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#D49621',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D49621',
  },
  quantityText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CheckoutProductCard;