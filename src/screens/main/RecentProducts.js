import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Container from '../../components/Container';
import ProductCard from '../../components/ProductCard';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const RecentProducts = ({ route }) => {
  const navigation = useNavigation();
  const { recentProducts } = useSelector(state => state.ecommerceReducer);

  return (
    <Container>
      <ProfileHeader
        username={true}
        icon={true}
        text={'Recent products'}
        home={true}
      />
      <View style={styles.wrapper}>
        <FlatList
          data={recentProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('SingleProduct', { productID: item.id })}
                style={{ marginBottom: hp('1%'), width: wp(46), alignItems: 'center' }}>
                <ProductCard
                  rating={item.average_rating}
                  username={item?.user.first_name + item?.user.last_name}
                  productName={item?.product_name}
                  price={item.regular_price}
                  avatar={item?.user.profile_pic}
                  productImage={item.product_image}
                  productFromdetail={true}
                />
              </TouchableOpacity>
            );
          }}
          columnWrapperStyle={{ justifyContent: 'space-evenly' }}
          numColumns={2}
        />
      </View>
    </Container>
  );
};

export default RecentProducts;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: hp('10%'),
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
});
