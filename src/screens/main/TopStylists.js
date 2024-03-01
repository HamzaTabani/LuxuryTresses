import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Card from '../../components/Card';
import {useSelector} from 'react-redux';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const TopStylists = () => {
  const navigation = useNavigation();
  const {pic_url} = useSelector(state => state.userData);
  const {topStylists} = useSelector(state => state.stylistReducer);

  const onStylistDetail = item => {
    const stylistImages = topStylists.map(item => ({
      stylist_image: item.profile_pic,
    }));

    navigation.navigate('ProfileDetail', {
      profile_id: item.id,
      stylists: stylistImages,
    });
  };

  const renderData = ({item}) => {
    return (
      <TouchableOpacity
        style={{marginBottom: 20}}
        activeOpacity={0.9}
        key={item?.id}
        onPress={() => onStylistDetail(item)}>
        <Card
          allTopStylist={true}
          rating={3}
          stylist_name={item.first_name + item.last_name}
          stylist_email={
            item.address != 'null' &&
            item.address != null &&
            item.address != 'undefined'
              ? item.address
              : 'address'
          }
          image={
            item.profile_pic == null
              ? images.cart1
              : {uri: pic_url + item.profile_pic}
          }
        />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <ProfileHeader username={true} icon={true} text={'Top stylists'} />
      <View style={styles.wrapper}>
        <FlatList
          data={topStylists}
          keyExtractor={item => item.id}
          renderItem={renderData}
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
