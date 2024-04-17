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
  SvgBottomLineSecondIcon,
  SvgFilterIcon,
  SvgGoldBagIcon,
  SvgGoldSeatIcon,
} from '../../components/SvgImages';
import {
  getAllServices,
  getRecentStylists,
  getServiceById,
} from '../../redux/slices/StylistSlice';
import {useSelector, useDispatch} from 'react-redux';
import images from '../../assets/images';
import Loader from '../../components/Loader';
import colors from '../../assets/colors';
import ServiceDropdown from '../../components/ServiceDropdown';

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

const Recents = () => {
  const [filterTab, setFilterTab] = useState('tab1');

  const [filterActive, setFilterActive] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceByIdData, setServiceByIdData] = useState([]);

  const {recentStylists, loading, recentStylist_error} = useSelector(
    state => state.stylistReducer,
  );
  const {user, pic_url} = useSelector(state => state.userData);

  const getRecentStylistsProfile = async () => {
    await dispatch(getRecentStylists());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // if (recentStylists.length < 1) {
    getRecentStylistsProfile();
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

  // console.log('recentStylists recent screen-->', recentStylists);

  return (
    <PageWrapper>
      <ProfileHeader home={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Recents</Text>
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
                  {/* <Image source={require('../../assets/images/goldseat.png')} /> */}
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
                  {/* <Image source={require('../../assets/images/goldbag.png')} /> */}
                  <SvgGoldBagIcon />
                </View>
              </Pressable>
            </View>
            {/* filter icon */}
            <TouchableOpacity
              onPress={() => handleFilter()}
              style={styles.filterButton}>
              {/* <Image source={require('../../assets/images/filtericon.png')} /> */}
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
          ) : recentStylists.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}
              data={
                serviceId != '' && serviceId != undefined
                  ? serviceByIdData
                  : recentStylists
              }
              renderItem={({item}) => {
                // console.log('activeOrders items==>', item);
                return (
                  <View>
                    {item.service ? (
                      <VenderCardBox
                        itemData={recentStylists}
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
            />
          ) : (
            // </ScrollView>
            recentStylist_error !== '' && (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={styles.errorMessage}>{recentStylist_error}</Text>
                </View>
              </>
            )
          )
        ) : (
          <FlatList
            data={
              serviceId != '' && serviceId != undefined
                ? serviceByIdData
                : recentStylists
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
              // console.log('activeOrders items==>', item);
              return (
                <View>
                  {item.product ? (
                    <VenderCardBox
                      itemData={recentStylists}
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
  errorMessage: {
    color: colors.orange,
    fontSize: hp('2%'),
  },
});

export default Recents;
