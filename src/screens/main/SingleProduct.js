import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import Swiper from 'react-native-swiper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import OutlineButton from '../../components/OutlineButton';
import MessageOption from '../../components/MessageOption';
import {useNavigation} from '@react-navigation/native';
import UserDetailCard from '../../components/UserDetailCard';

const SingleProduct = () => {
  const navigation = useNavigation();
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
    <Container>
      <ProfileHeader icon={true} username={true} text={'Deep mask'} />

      <ScrollView style={styles.container}>
        {/* product images.. */}
        <View style={{height: 300}}>
          <Swiper
            style={styles.wrapper}
            activeDotColor={'#D49621'}
            dotColor={'#fff'}>
            <View style={styles.slidedImageBox}>
              <Image
                source={require('../../assets/images/cart6.png')}
                resizeMode="contain"
                style={{width: '100%', height: 300}}
              />
            </View>
            <View style={styles.slidedImageBox}>
              <Image
                source={require('../../assets/images/cart6.png')}
                resizeMode="contain"
                style={{width: '100%', height: 300}}
              />
            </View>
          </Swiper>
        </View>
        {/* product detail */}
        <View style={{marginTop: 10}}>
          {/* product owner.. */}
          <UserDetailCard/>
         

          {/* product description */}

          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2.2%'),
                color: '#fff',
                marginTop: 20,
              }}>
              Description
            </Text>
            <Text
              style={{
                fontWeight: 'light',
                fontSize: hp('1.5%'),
                color: '#efefef',
                marginTop: 20,
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </Text>
          </View>

          {/* product quantity buttons */}
          <View style={styles.productQuantityBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginLeft: 20,
              }}>
              <Text style={{color: '#D49621', fontSize: hp('2.4%')}}>
                $24.00
              </Text>
              <Text style={{color: '#efefef', fontSize: hp('1.6%')}}>
                (24 available)
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

          {/* add to card button */}
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
            }}>
            <OutlineButton
              title={'Add to cart'}
              onPress={() =>
                navigation.navigate('SecondaryStack', {screen: 'Checkout'})
              }
              textStyle={{color: '#fff'}}
              buttonStyle={{width: '82%'}}
            />
            <MessageOption />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 100,
  },
  wrapper: {},
  slidedImageBox: {
    width: '100%',
    height: 500,
    alignSelf: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    height: 80,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D49621',
    padding: 3,
    flexDirection: 'row',
    backgroundColor: '#D49621',
    justifyContent: 'space-between',
  },
  ratingCard: {
    backgroundColor: colors.white,
    marginTop: hp('0.2%'),
    height: hp('5.5%'),
    borderRadius: 50,
    width: hp('5.5%'),
  },
  imageWrapper: {
    position: 'absolute',
    left: 13,
    top: 14,
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
    backgroundColor: '#020116',
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
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SingleProduct;
