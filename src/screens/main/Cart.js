import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CartHeader from '../../components/CartHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import colors from '../../assets/colors';
import HistoryCard from '../../components/HistoryCard';
import Container from '../../components/Container';
import { useNavigation } from '@react-navigation/native';
import { SvgBottomLineSecondIcon } from '../../components/SvgImages';
import { getActiveOrders, getCompletedOrders } from '../../redux/slices/ECommerceSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const Cart = () => {
  const [tabActive, setTabActive] = useState('order');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    completedOrders,
    completedOrders_error,
    completedOrders_loading,
    activeOrders_loading,
    activeOrders,
  } = useSelector(state => state.ecommerceReducer);

  useEffect(() => {
    fetchCompletedOrders();
    fetchActiveOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    await dispatch(getCompletedOrders());
  };
  const fetchActiveOrders = async () => {
    await dispatch(getActiveOrders());
  };

  return (
    <Container>
      <CartHeader />
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
        {tabActive === 'order' ? (
          activeOrders_loading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Loader size={'large'} />
            </View>
          ) : (
            <View style={{ marginBottom: hp('15%'), marginTop: hp('2%') }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={activeOrders}
                renderItem={({ item }) => {
                  return (
                    <HistoryCard
                      key={item.id}
                      image={item.image}
                      onPress={() =>
                        navigation.navigate('OrderHistory', {
                          product: item?.product,
                          order: item?.order,
                          completedOrders: item,
                          reorderButton: true,
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
          )
        ) : completedOrders_loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Loader size={'large'} />
          </View>
        ) : (
          <View style={{ marginBottom: hp('15%'), marginTop: hp('2%') }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={completedOrders}
              renderItem={({ item }) => {
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
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
});

export default Cart;
