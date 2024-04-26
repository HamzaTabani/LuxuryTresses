import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VenderCardBox from '../../components/VenderCardBox';
import ProductCardBox from '../../components/ProductCardBox';
import {
  getAllServices,
  getPopularStylists,
  getServiceById,
} from '../../redux/slices/StylistSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  SvgBottomLineSecondIcon,
  SvgFilterIcon,
  SvgGoldBagIcon,
  SvgGoldSeatIcon,
} from '../../components/SvgImages';
import images from '../../assets/images';
import Loader from '../../components/Loader';
import ServiceDropdown from '../../components/ServiceDropdown';
import colors from '../../assets/colors';

const cartData = [
  {
    id: 1,
    name: 'Omnis iste',
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 2,
    name: 'Omnis iste',
    img: require('../../assets/images/cart2.png'),
  },
  {
    id: 3,
    name: 'Omnis iste',
    img: require('../../assets/images/cart3.png'),
  },
  {
    id: 4,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 5,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 6,
    name: 'Omnis iste',
    img: require('../../assets/images/cart6.png'),
  },
];

const cartData2 = [
  {
    id: 1,
    name: 'Omnis iste',
    img: require('../../assets/images/cart6.png'),
  },
  {
    id: 2,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 3,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 4,
    name: 'Omnis iste',
    img: require('../../assets/images/cart3.png'),
  },
  {
    id: 5,
    name: 'Omnis iste',
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 6,
    name: 'Omnis iste',
    img: require('../../assets/images/cart4.png'),
  },
];

const Popular = () => {
  const [filterTab, setFilterTab] = useState('tab1');

  const [filterActive, setFilterActive] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceByIdData, setServiceByIdData] = useState([]);

  const {popularStylists, loading, popularStylist_error} = useSelector(
    state => state.stylistReducer,
  );
  const {user, pic_url} = useSelector(state => state.userData);

  // console.log('popularStylists=-=-=>', popularStylists);

  const getPopularStylistsProfile = async () => {
    await dispatch(getPopularStylists());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // if (popularStylists.length < 1) {
    getPopularStylistsProfile();
    // }
    getAllStylistProfileServices();
  }, [serviceByIdData]);

  useEffect(() => {
    getAllServicesById();
  }, [serviceId]);

  const getAllStylistProfileServices = async () => {
    await dispatch(getAllServices(setStylistServices));
    // setLoad(false);
  };

  const getAllServicesById = async () => {
    const res = await dispatch(getServiceById(serviceId));
    setServiceByIdData(res.payload.data);
  };

  const handleServiceId = data => {
    // console.log('data=--==>', data);
    // if (data != null && data != undefined) {
    //   console.log('data53483=--==>', data);
    // setServiceId(data != null ? data[0].value : '0');
    setServiceId(data.value);
    // const label = data.label.replace(/^\s+/, '');
    // setServiceLabel(data != null ? data[0].label : 'Stylist');
    // setServiceLabel(
    //   data.label != undefined && data.label != null
    //     ? data.label.replace(/^\s+/, '')
    //     : null,
    // );
    // } else {
    //   setServiceId('');
    //   setServiceLabel('');
    // }
  };

  const handleFilter = () => {
    setFilterActive(!filterActive);
  };

  const emptyData = () => {
    return (
      <View
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(75),
          // backgroundColor: 'green',
        }}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Stylist Found!</Text>
        </View>
      </View>
    );
  };

  return (
    <PageWrapper>
      <ProfileHeader home={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Popular</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            {/* filter tab */}
            <View style={styles.filterTabs}>
              <Pressable onPress={() => setFilterTab('tab1')}>
                <View
                  style={
                    filterTab === 'tab1'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <SvgGoldSeatIcon />
                </View>
              </Pressable>
              <Pressable onPress={() => setFilterTab('tab2')}>
                <View
                  style={
                    filterTab === 'tab2'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <SvgGoldBagIcon />
                </View>
              </Pressable>
            </View>
            {/* filter icon */}
            <TouchableOpacity
              onPress={() => handleFilter()}
              style={styles.filterButton}>
              <SvgFilterIcon />
            </TouchableOpacity>
          </View>
        </View>

        {filterActive ? (
          <ServiceDropdown
            services={stylistServices}
            serviceValue={handleServiceId}
            trending={true}
          />
        ) : null}

        {/*/////////////  filter items container ////////////// */}
        {/* venders listing */}
        {filterTab === 'tab1' ? (
          // <ScrollView
          //   showsVerticalScrollIndicator={false}
          //   contentContainerStyle={{paddingBottom: 100}}>
          //   {popularStylists?.map(item => (
          //     <VenderCardBox
          //       key={item.id}
          //       itemId={item.id}
          //       name={item.first_name + ' ' + item.last_name}
          //       img={item.profile_pic}
          //       email={
          //         item.address != 'null' &&
          //         item.address != null &&
          //         item.address != 'undefined'
          //           ? item.address
          //           : 'address'
          //       }
          //       ratings={item.average_rating != null ? item.average_rating : 3}
          //       serviceIcon={item.service}
          //       productIcon={item.product}
          //     />
          //   ))}
          //   <View
          //     style={{
          //       paddingHorizontal: wp('8%'),
          //       marginTop: 50,
          //       alignItems: 'center',
          //     }}>
          //     <Image
          //       source={require('../../assets/images/bottom_linesA.png')}
          //       resizeMode="contain"
          //       style={{
          //         width: 40,
          //       }}
          //     />
          //   </View>
          // </ScrollView>
          loading ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Loader size={'large'} />
              </View>
            </>
          ) : popularStylists.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              data={
                serviceId != '' && serviceId != undefined
                  ? serviceByIdData
                  : popularStylists
              }
              renderItem={({item}) => {
                return (
                  <View>
                    {item.service ? (
                      <VenderCardBox
                        key={item.id}
                        itemId={item.id}
                        name={item.first_name + ' ' + item.last_name}
                        img={item.profile_pic}
                        email={
                          item.address != 'null' &&
                          item.address != null &&
                          item.address != 'undefined'
                            ? item.address
                            : 'address'
                        }
                        ratings={item.average_rating}
                        serviceIcon={item.service}
                        productIcon={item.product}
                      />
                    ) : null}
                  </View>
                );
              }}
              ListFooterComponent={
                <View
                  style={{
                    // paddingHorizontal: wp('8%'),
                    marginTop: 50,
                    alignItems: 'center',
                  }}>
                  <SvgBottomLineSecondIcon />
                </View>
              }
              ListEmptyComponent={emptyData}
            />
          ) : (
            popularStylist_error !== '' && (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={styles.errorMessage}>
                    {popularStylist_error}
                  </Text>
                </View>
              </>
            )
          )
        ) : (
          <FlatList
            data={
              serviceId != '' && serviceId != undefined
                ? serviceByIdData
                : popularStylists
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            // renderItem={({item}) => {
            //   // console.log('activeOrders items==>', item);
            //   return (
            //     <ProductCardBox key={item.id} name={item.name} img={item.img} />
            //   );
            // }}
            renderItem={({item}) => {
              return (
                <View>
                  {item.product ? (
                    <VenderCardBox
                      key={item.id}
                      itemId={item.id}
                      name={item.first_name + ' ' + item.last_name}
                      img={item.profile_pic}
                      email={
                        item.address != 'null' &&
                        item.address != null &&
                        item.address != 'undefined'
                          ? item.address
                          : 'address'
                      }
                      ratings={item.average_rating}
                      serviceIcon={item.service}
                      productIcon={item.product}
                    />
                  ) : null}
                </View>
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginTop: 50,
                  alignItems: 'center',
                }}>
                <SvgBottomLineSecondIcon />
              </View>
            }
            ListEmptyComponent={emptyData}
          />
        )}
      </View>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  trendingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hp('1.2%'),
  },
  mainTitleText: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  filterTabs: {
    height: 50,
    width: 120,
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
  },
  filterButton: {
    height: 50,
    width: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter_tab_active: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  filter_tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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

export default Popular;
