import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Container from '../../components/Container';
import ProductCard from '../../components/ProductCard';
import {useSelector} from 'react-redux';

const RecentProducts = ({route}) => {
  const {pic_url} = useSelector(state => state.userData);

  const recentItems = route?.params?.product;
  console.log('paramss dataa =======>', recentItems);

  return (
    <Container>
      <ProfileHeader username={true} icon={true} text={'Recent products'} />
      <View style={styles.wrapper}>
        <FlatList
          data={recentItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{marginBottom: hp('4%')}}>
              <ProductCard
                rating={3}
                username={item?.user.first_name + item?.user.last_name}
                productName={item?.product_name}
                price={item.regular_price}
              />
            </View>
          )}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
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
  },
});
