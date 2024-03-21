import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Card from '../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {getTopStylists} from '../../redux/slices/StylistSlice';

const TopStylists = () => {
  const navigation = useNavigation();
  const {pic_url} = useSelector(state => state.userData);
  const {topStylists} = useSelector(state => state.stylistReducer);

  const [stylistData, setStylistData] = useState([]);
  const dispatch = useDispatch();

  // console.log('stylistData35435=-=>', stylistData);

  useEffect(() => {
    // if (recentProducts.length < 1 || topStylists.length < 1) {
    getTopStylistsProfile();
    // }
  }, []);
  const getTopStylistsProfile = async () => {
    await dispatch(getTopStylists(setStylistData));
  };

  const onStylistDetail = item => {
    const stylistImages = stylistData.map(item => ({
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
        style={{marginBottom: 30}}
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
          image={item.profile_pic}
          serviceIcon={item.service}
          productIcon={item.product}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <ProfileHeader username={true} icon={true} text={'Top stylists'} />
      <View style={styles.wrapper}>
        <FlatList
          data={stylistData}
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
