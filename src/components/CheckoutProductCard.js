import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '../assets/images';
import { useSelector } from 'react-redux';

const CheckoutProductCard = ({
  image,
  name,
  price,
  quantity,
  increment,
  decrement,
}) => {
  const [imageErrorProduct, setImageErrorProduct] = useState(false);
  const handleImageErrorProduct = () => {
    setImageErrorProduct(true);
  };
  const { pic_baseUrl } = useSelector(state => state.ecommerceReducer);

  return (
    <View style={styles.productQuantityBox}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ width: 70, height: 70 }}>
          <Image
            source={
              imageErrorProduct
                ? images.imageNotFound
                : image == 'null' && image == null && image == 'undefined'
                  ? images.imageNotFound
                  : { uri: pic_baseUrl + '/' + image }
            }
            resizeMode="cover"
            style={{ width: '100%', height: '100%', borderRadius: 15 }}
            onError={handleImageErrorProduct}
          />
        </View>
        <View style={{ justifyContent: 'center', width: '55%' }}>
          <Text style={{ color: '#fff', fontSize: hp('1.7%') }}>{name}</Text>
          <Text style={{ color: '#efefef', fontSize: hp('1.5%'), marginTop: 2 }}>
            ${price}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={decrement}
          style={styles.button}
          activeOpacity={0.9}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityButton}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={increment}
          style={styles.button}
          activeOpacity={0.9}>
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
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#D49621',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: '7%',
    backgroundColor: '#020116',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D49621',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#D49621',
  },
  quantityButton: {
    width: 35,
    height: 35,
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
