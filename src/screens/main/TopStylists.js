import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllServices,
  getServiceById,
  getTopStylists,
} from '../../redux/slices/StylistSlice';
import ServiceDropdown from '../../components/ServiceDropdown';
import Loader from '../../components/Loader';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';

const TopStylists = () => {
  const navigation = useNavigation();
  const [filterActive, setFilterActive] = useState(false);
  const [stylistData, setStylistData] = useState([]);
  const [stylistServices, setStylistServices] = useState([]);
  const dispatch = useDispatch();
  const [serviceId, setServiceId] = useState('');
  const [serviceLabel, setServiceLabel] = useState('');
  const [serviceByIdData, setServiceByIdData] = useState([]);
  const [load, setLoad] = useState(true);

  const handleServiceId = data => {
    setServiceId(data.value);
    setServiceLabel(
      data.label != undefined && data.label != null
        ? data.label.replace(/^\s+/, '')
        : null,
    );
  };

  useEffect(() => {
    getAllServicesById();
  }, [serviceId]);

  useEffect(() => {
    getTopStylistsProfile();
    getAllStylistProfileServices();
  }, []);

  const getTopStylistsProfile = async () => {
    await dispatch(getTopStylists(setStylistData));
  };

  const getAllStylistProfileServices = async () => {
    await dispatch(getAllServices(setStylistServices));
    setLoad(false);
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

  const renderData = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        activeOpacity={0.9}
        key={item?.id}
        onPress={() => onStylistDetail(item)}>
        <Card
          allTopStylist={true}
          rating={item.average_rating}
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

  const emptyData = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(75),
        }}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Stylist Found!</Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      {load ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Loader size={'large'} />
        </View>
      ) : (
        <>
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
              <ServiceDropdown services={stylistServices} serviceValue={handleServiceId} />
            </View>
          ) : null}
          <FlatList
            data={
              serviceId != '' && serviceId != undefined
                ? serviceByIdData
                : stylistData
            }
            contentContainerStyle={styles.wrapper}
            keyExtractor={item => item.id}
            renderItem={renderData}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            numColumns={2}
            ListEmptyComponent={emptyData}
          />
        </>
      )}
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
    // flex: 1,
    paddingBottom: 70,
    // backgroundColor: 'red',
    width: '95%',
    alignSelf: 'center'
  },
  emptyContainer: {
    // flex: 1,
    backgroundColor: '#D49621',
    width: hp(30),
    height: hp(5),
    borderRadius: 10,
    // marginHorizontal:hp(3),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: hp(15),
    marginRight: hp(1.3),
    // marginRight:hp(2)
    // marginLeft:hp(3)
  },
  emptyText: {
    color: colors.white,
    fontSize: hp(2),
    fontWeight: 'bold',
    // backgroundColor:'red'
  },
});
