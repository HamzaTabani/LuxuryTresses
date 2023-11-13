import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Card from '../../components/Card';
const cartData2 = [
  {
    id: 1,
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 2,
    img: require('../../assets/images/cart2.png'),
  },
  {
    id: 3,
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 4,
    img: require('../../assets/images/cart3.png'),
  },
  {
    id: 5,
    img: require('../../assets/images/cart6.png'),
  },
  {
    id: 6,
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 7,
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 8,
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 9,
    img: require('../../assets/images/cart6.png'),
  },
  {
    id: 10,
    img: require('../../assets/images/cart6.png'),
  },
];

const TopStylists = () => {
  return (
    <Container>
      <ProfileHeader username={true} icon={true} text={'Top stylists'} />
      <View style={styles.wrapper}>
        <FlatList
          data={cartData2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{marginBottom: 15}}>
              <Card rating={3} item={item} />
            </View>
          )}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          numColumns={2}
        />
      </View>
    </Container>
  );
};

export default TopStylists;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
    paddingBottom: hp('22%'),
    paddingTop: hp('4%'),
  },
  wrapper: {
    flex: 1,
    paddingBottom: 70,
  },
});
