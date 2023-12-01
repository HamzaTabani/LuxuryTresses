import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from '../../components/Container';
import ProductCard from '../../components/ProductCard';
import { products } from '../../dummyData';

const RecentProducts = () => {
  return (
    <Container>
      <ProfileHeader username={true} icon={true} text={'Recent products'} />
      <View style={styles.wrapper}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: hp('4%') }}>
              <ProductCard rating={3} item={item} />
            </View>
          )}
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
    paddingBottom: hp('10%')
  }
});
