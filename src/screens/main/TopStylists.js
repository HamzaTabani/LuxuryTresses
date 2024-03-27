import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Card from '../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {
  getAllServices,
  getServiceById,
  getTopStylists,
} from '../../redux/slices/StylistSlice';
import ServiceDropdown from '../../components/ServiceDropdown';

const TopStylists = () => {
  const navigation = useNavigation();
  const {pic_url} = useSelector(state => state.userData);
  const {topStylists} = useSelector(state => state.stylistReducer);
  const [filterActive, setFilterActive] = useState(false);

  const [stylistData, setStylistData] = useState([]);
  const [stylistServices, setStylistServices] = useState([]);
  const dispatch = useDispatch();
  const [serviceId, setServiceId] = useState('');
  const [serviceLabel, setServiceLabel] = useState('');
  const [serviceByIdData, setServiceByIdData] = useState([]);

  // console.log('serviceLabel=-=>', serviceLabel);

  // console.log('serviceId=-=-->', serviceId);

  // console.log('serviceByIdData', serviceByIdData);

  // console.log('stylistData=-=->', stylistData);

  const handleServiceId = data => {
    // console.log('data=--==>', data);
    // if (data != null && data != undefined) {
    //   console.log('data53483=--==>', data);
    // setServiceId(data != null ? data[0].value : '0');
    setServiceId(data.value);
    // const label = data.label.replace(/^\s+/, '');
    // setServiceLabel(data != null ? data[0].label : 'Stylist');
    setServiceLabel(
      data.label != undefined && data.label != null
        ? data.label.replace(/^\s+/, '')
        : null,
    );
    // } else {
    //   setServiceId('');
    //   setServiceLabel('');
    // }
  };

  // console.log('filterActive=->', filterActive);

  // console.log('stylistData35435=-=>', stylistServices);
  useEffect(() => {
    getAllServicesById();
  }, [serviceId]);

  // useEffect(() => {
  //   getTopStylistsProfile();
  // }, [serviceByIdData]);

  useEffect(() => {
    // if (recentProducts.length < 1 || topStylists.length < 1) {
    getTopStylistsProfile();
    getAllStylistProfileServices();

    // }
  }, []);

  const getTopStylistsProfile = async () => {
    await dispatch(getTopStylists(setStylistData));
  };

  const getAllStylistProfileServices = async () => {
    await dispatch(getAllServices(setStylistServices));
  };

  const getAllServicesById = async () => {
    const res = await dispatch(getServiceById(serviceId));
    setServiceByIdData(res.payload.data);
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
      <ProfileHeader
        username={true}
        icon={true}
        text={serviceLabel ? 'Top ' + serviceLabel : 'Top stylists'}
        filter={true}
        filterActive={filterActive}
        setFilterActive={setFilterActive}
      />
      {filterActive ? (
        <View>
          <ServiceDropdown
            services={stylistServices}
            serviceValue={handleServiceId}
          />
        </View>
      ) : null}

      <View style={styles.wrapper}>
        <FlatList
          data={serviceByIdData.length > 0 ? serviceByIdData : stylistData}
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
