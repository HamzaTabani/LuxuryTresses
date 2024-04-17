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
import {useSelector, useDispatch} from 'react-redux';
import images from '../../assets/images';
import Loader from '../../components/Loader';
import {
  getAllServices,
  getServiceById,
  trendingStylists,
} from '../../redux/slices/StylistSlice';
import colors from '../../assets/colors';
import {
  SvgBagGoldTopBar,
  SvgBottomLineSecondIcon,
  SvgSeatGoldTopbar,
  SvgfilterIcon,
} from '../../components/SvgImages';
import ServiceDropdown from '../../components/ServiceDropdown';

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

const Trendings = () => {
  const [filterTab, setFilterTab] = useState('tab1');

  const [filterActive, setFilterActive] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceByIdData, setServiceByIdData] = useState([]);

  const {trending_stylists, trending_error, trending_loader} = useSelector(
    state => state.stylistReducer,
  );

  const {pic_url} = useSelector(state => state.userData);

  console.log(
    'serviceByIdData-=>',
    trending_stylists.length > 0 && serviceByIdData.length > 0,
  );

  // console.log('trending stylists ==========>', trending_stylists);

  const dispatch = useDispatch();

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

  useEffect(() => {
    // if (trending_stylists.length < 1) {
    fetchTrendingStylists();
    // }
    getAllStylistProfileServices();
  }, [serviceByIdData]);

  useEffect(() => {
    getAllServicesById();
  }, [serviceId]);

  const fetchTrendingStylists = async () => {
    await dispatch(trendingStylists());
  };

  const handleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <PageWrapper>
      <ProfileHeader home={true} />

      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Trending</Text>
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
                  <SvgSeatGoldTopbar />
                </View>
              </Pressable>
              <Pressable onPress={() => setFilterTab('tab2')}>
                <View
                  style={
                    filterTab === 'tab2'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <SvgBagGoldTopBar />
                </View>
              </Pressable>
            </View>
            {/* filter icon */}
            <TouchableOpacity
              onPress={() => handleFilter()}
              style={styles.filterButton}>
              <SvgfilterIcon />
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
          trending_loader ? (
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
          ) : trending_stylists.length > 0 || serviceByIdData.length > 0 ? (
            // <ScrollView
            //   showsVerticalScrollIndicator={false}
            //   style={{marginBottom: 50}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
                // marginBottom: 100,
                // backgroundColor: 'green',
              }}
              data={
                serviceId != '' && serviceId != undefined
                  ? serviceByIdData
                  : trending_stylists
              }
              renderItem={({item}) => {
                console.log('itemitemvvvv=-=->>>', item);
                return (
                  <View>
                    {item.service ? (
                      <TouchableOpacity
                        disabled={true}
                        onPress={() => console.log('item.id: ', item)}>
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
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              }}
              ListFooterComponent={
                <View
                  style={{
                    marginTop: 50,
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}>
                  <SvgBottomLineSecondIcon />
                </View>
              }
            />
          ) : (
            // </ScrollView>
            trending_error !== '' && (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={styles.errorMessage}>{trending_error}</Text>
                </View>
              </>
            )
          )
        ) : (
          <FlatList
            data={
              serviceId != '' && serviceId != undefined
                ? serviceByIdData
                : trending_stylists
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item}) => {
              // console.log('itemitem=-=->>>', item.product);
              return (
                <View>
                  {item.product ? (
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => console.log('item.id: ', item)}>
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
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginTop: 50,
                  alignItems: 'center',
                  // backgroundColor:'red'
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

export default Trendings;
