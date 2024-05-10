import React, {useEffect, useState} from 'react';
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
import {historyImages} from '../../dummyData';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductinCart,
  getProductDetails,
} from '../../redux/slices/ECommerceSlice';
import Loader from '../../components/Loader';
import images from '../../assets/images';
import {ShowToast} from '../../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const SingleProduct = ({route}) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [load, setLoad] = useState(true);

  console.log(
    'routess',
    navigation.getState().routeNames[13] === 'OrderHistory',
  );

  const dispatch = useDispatch();

  const {
    productDetails,
    detail_loading,
    detail_error,
    cart_product,
    cart_error,
  } = useSelector(state => state.ecommerceReducer);

  const {pic_url} = useSelector(state => state.userData);
  const {pic_baseUrl} = useSelector(state => state.ecommerceReducer);
  const product_id = route?.params?.productID;
  const {product, order, completedOrders, reorder} = route?.params;

  // console.log('product_id', product_id);
  // console.log(
  //   'productDetails[product_id]?.user?.profile_pic--',
  //   productDetails[product_id]?.user?.profile_pic,
  // );
  // console.log('productDetails[product_id]-=-=-=-', productDetails[product_id]);
  // console.log('detail_loading=-=>', load);
  // console.log('pic_url==>', images.stylist1);
  // console.log('product_id==>', product_id);
  // console.log('product detailssss from screens =========>', productDetails);
  // console.log(
  //   'pic_baseUrl===>',
  //   pic_baseUrl + '/' + productDetails[product_id]?.product_image,
  // );
  // console.log(
  //   'productDetails[product_id]?.average_rating---',
  //   productDetails[product_id].average_rating,
  // );
  useEffect(() => {
    // if (!productDetails[product_id]) {
    dispatch(getProductDetails({product_id, setLoad}));
    setLoad(false);
    // }
  }, [product_id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onAddtoCartPress = async () => {
    const cartDetails = {
      productDetail: {
        product_id: productDetails[product_id]?.id,
        title: productDetails[product_id]?.product_name,
        price: productDetails[product_id]?.regular_price,
        image: productDetails[product_id]?.product_image,
      },
      quantity: quantity !== 1 ? quantity : 1,
    };
    let confirmedDetails = [...cart_product, cartDetails];
    const index = cart_product?.findIndex(
      item => item.productDetail.product_id == product_id,
    );
    //  return console.log(
    //     'indexxx',
    //     cart_product[index].productDetail.product_id == productDetails.id,
    //   );

    if (
      cart_product[index]?.productDetail.product_id ==
      productDetails[product_id].id
    ) {
      console.log(
        'auto quantityy',
        cart_product[index].quantity,
        'selected quantity',
        quantity,
      );
      const updatedCart = cart_product.map((item, i) => {
        //  return console.log('condition check', item.productDetail.product_id == productDetails.id)
        if (i == index) {
          return {
            ...item,
            quantity: quantity !== 1 ? quantity : item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      //  console.log('updated', updatedCart)
      await dispatch(addProductinCart(updatedCart));
      navigation.navigate('SecondaryStack', {screen: 'Checkout'});
      // return ShowToast('Item has been added to your cart');
    } else {
      const res = await dispatch(addProductinCart(confirmedDetails));
      if (res) {
        navigation.navigate('SecondaryStack', {screen: 'Checkout'});
        // alert('hello world');
      } else {
        return ShowToast(cart_error);
      }
    }

    // console.log('cart details =======>', confirmedDetails);
  };

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (detail_loading || detail_error) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: colors.primary,
        }}>
        {detail_loading && <Loader size={'large'} />}
        {detail_error !== '' && (
          <Text style={styles.errorMessage}>{detail_error}</Text>
        )}
      </View>
    );
  }

  const onIconPress = () => {
    if (navigation.getState().routeNames[12] === 'OrderHistory') {
      navigation.navigate('OrderHistory', {
        product: product,
        order: order,
        completedOrders: completedOrders,
        reorder: reorder,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container>
      {load ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Loader size={'large'} />
        </View>
      ) : (
        <>
          <ProfileHeader
            icon={true}
            username={true}
            onBackPress={() => onIconPress()}
            text={productDetails[product_id]?.product_name}
          />
          <ScrollView style={styles.container}>
            {/* product images.. */}
            <View style={{height: hp('35%')}}>
              <Swiper
                style={styles.wrapper}
                activeDotColor={colors.orange}
                dotStyle={{borderWidth: 1, borderColor: colors.orange}}>
                {/* {historyImages.map((item, ind) => ( */}
                <Image
                  // key={ind}
                  source={
                    imageError
                      ? images.imageNotFound
                      : productDetails[product_id]?.product_image == 'null' &&
                        productDetails[product_id]?.product_image == null &&
                        productDetails[product_id]?.product_image == 'undefined'
                      ? images.imageNotFound
                      : {
                          uri:
                            pic_baseUrl +
                            '/' +
                            productDetails[product_id]?.product_image,
                        }
                  }
                  borderRadius={20}
                  // resizeMode="contain"
                  style={{
                    width: hp('37%'),
                    height: hp('35%'),
                    alignSelf: 'center',
                  }}
                  onError={handleImageError}
                />
                {/* ))} */}
              </Swiper>
            </View>
            {/* product detail */}
            <View style={{marginTop: 30}}>
              {/* product owner.. */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProfileDetail', {
                    profile_id: productDetails[product_id]?.user?.id,
                  })
                }>
                <UserDetailCard
                  username={
                    productDetails[product_id]?.user?.first_name +
                    ' ' +
                    productDetails[product_id]?.user?.last_name
                  }
                  email={productDetails[product_id]?.user?.email}
                  image={
                    productDetails[product_id]?.user?.profile_pic == null
                      ? images.stylist1
                      : {
                          uri: productDetails[product_id]?.user?.profile_pic,
                        }
                  }
                  rating={productDetails[product_id]?.average_rating}
                />
              </TouchableOpacity>
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
                  {/* Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries */}
                  {productDetails[product_id]?.description}
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
                    ${productDetails[product_id]?.regular_price}
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
                  onPress={() => onAddtoCartPress()}
                  textStyle={{color: '#fff'}}
                  buttonStyle={{width: '82%'}}
                />
                <MessageOption />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 100,
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
  errorMessage: {
    color: colors.orange,
    fontFamily: 'Lora-Medium',
    fontSize: hp('2.6%'),
  },
});

export default SingleProduct;
