import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import CartHeader from '../../components/CartHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import images from '../../assets/images';
import colors from '../../assets/colors';
import HistoryCard from '../../components/HistoryCard';
import Container from '../../components/Container';
import {histories} from '../../dummyData';
import {useNavigation} from '@react-navigation/native';
import {SvgBottomLineSecondIcon} from '../../components/SvgImages';
import {
  getActiveOrders,
  getCompletedOrders,
} from '../../redux/slices/ECommerceSlice';
import {useDispatch, useSelector} from 'react-redux';

const Cart = () => {
  const [tabActive, setTabActive] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    completedOrders,
    completedOrders_error,
    completedOrders_loading,
    activeOrders,
  } = useSelector(state => state.ecommerceReducer);

  // console.log('activeOrders from screen==>', activeOrders);

  useEffect(() => {
    // if (recentProducts.length < 1 || topStylists.length < 1) {
    fetchCompletedOrders();
    fetchActiveOrders();
    // }
  }, []);

  const fetchCompletedOrders = async () => {
    await dispatch(getCompletedOrders());
  };
  const fetchActiveOrders = async () => {
    await dispatch(getActiveOrders());
  };

  // console.log(tabActive);
  return (
    <Container>
      <CartHeader />
      {/* Cart Btn */}
      <View style={styles.cart_main}>
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
        {tabActive === 'order' ? (
          <View style={{marginBottom: hp('15%'), marginTop: hp('2%')}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={{backgroundColor:'red'}}
              keyExtractor={item => item.id}
              data={activeOrders}
              renderItem={({item}) => {
                // console.log('activeOrders items==>', item);
                return (
                  <HistoryCard
                    key={item.id}
                    image={item.image}
                    onPress={() =>
                      navigation.navigate('OrderHistory', {
                        product: item?.product,
                        order: item?.order,
                        completedOrders: item,
                        reorderButton:true
                      })
                    }
                    productImg={item?.product?.product_image}
                    productName={item?.product?.product_name}
                    productPrice={item?.product?.regular_price}
                    productStatus={item?.order?.status}
                    productRating={item?.product?.average_rating}
                    productDate={item?.product?.created_at}
                  />
                );
              }}
              ListFooterComponent={
                <View
                  style={{
                    paddingHorizontal: wp('8%'),
                    marginBottom: hp('5%'),
                    alignItems: 'center',
                  }}>
                  <SvgBottomLineSecondIcon />
                </View>
              }
            />
          </View>
        ) : (
          // <View style={{flex: 0.8, justifyContent: 'center'}}>
          //   <Image source={images.orders1} style={styles.orderImage} />
          //   <Text style={styles.text}>{'You have no favourites :('}</Text>
          // </View>
          <View style={{marginBottom: hp('15%'), marginTop: hp('2%')}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={{backgroundColor:'red'}}
              keyExtractor={item => item.id}
              data={completedOrders}
              renderItem={({item}) => {
                // console.log('completedOrders items==>', item?.product);
                return (
                  <HistoryCard
                    key={item.id}
                    image={item.image}
                    onPress={() =>
                      navigation.navigate('OrderHistory', {
                        product: item?.product,
                        order: item?.order,
                        completedOrders: item,
                        reorder: false,
                      })
                    }
                    productImg={item?.product?.product_image}
                    productName={item?.product?.product_name}
                    productPrice={item?.product?.regular_price}
                    productStatus={item?.order?.status}
                    productRating={item?.product?.average_rating}
                    productDate={item?.product?.created_at}
                    completeOrder={true}
                    onPressReorder={() =>
                      navigation.navigate('OrderHistory', {
                        product: item?.product,
                        order: item?.order,
                        completedOrders: item,
                        reorder: true,
                      })
                    }
                    productId={item?.id}
                  />
                );
              }}
              ListFooterComponent={
                <View
                  style={{
                    paddingHorizontal: wp('8%'),
                    marginBottom: hp('5%'),
                    alignItems: 'center',
                  }}>
                  <SvgBottomLineSecondIcon />
                </View>
              }
            />
          </View>

          // <ScrollView
          //   showsVerticalScrollIndicator={false}
          //   contentContainerStyle={styles.historyWrapper}>
          //   {histories.map(item => (
          //     <HistoryCard
          //       key={item.id}
          //       image={item.image}
          //       onPress={() => navigation.navigate('OrderHistory')}
          //     />
          //   ))}
          //   <View
          //     style={{
          //       paddingHorizontal: wp('8%'),
          //       marginTop: 50,
          //       // marginBottom: 150,
          //       alignItems: 'center',
          //     }}>
          //     {/* <Image
          //       source={require('../../assets/images/bottom_linesA.png')}
          //       resizeMode="contain"
          //       style={{
          //         width: 40,
          //       }}
          //     /> */}
          //     <SvgBottomLineSecondIcon/>
          //   </View>
          // </ScrollView>
        )}
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
    width: hp('20%'),
    alignItems: 'center',
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
    width: hp('30%'),
  },
  text: {
    color: colors.secondary,
    width: '40%',
    fontSize: hp('3%'),
    marginTop: hp('3.5%'),
    alignSelf: 'center',
  },
  historyWrapper: {
    paddingTop: hp('5%'),
    paddingBottom: hp('14%'),
  },
});

export default Cart;
