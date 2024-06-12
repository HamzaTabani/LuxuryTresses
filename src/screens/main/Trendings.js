import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import VenderCardBox from '../../components/VenderCardBox';
import { useSelector, useDispatch } from 'react-redux';
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

const Trendings = () => {
  const [filterTab, setFilterTab] = useState('tab1');
  const [filterActive, setFilterActive] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [stylistServices, setStylistServices] = useState([]);
  const [serviceByIdData, setServiceByIdData] = useState([]);
  const { trending_stylists, trending_error, trending_loader } = useSelector(state => state.stylistReducer);
  const dispatch = useDispatch();

  const getAllStylistProfileServices = async () => {
    await dispatch(getAllServices(setStylistServices));
  };

  const getAllServicesById = async () => {
    const res = await dispatch(getServiceById(serviceId));
    setServiceByIdData(res.payload.data);
  };

  const handleServiceId = data => {
    setServiceId(data.value);
  };

  useEffect(() => {
    fetchTrendingStylists();
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
    <PageWrapper>
      <ProfileHeader home={true} />
      <View style={styles.trendingContainer}>
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Trending</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={styles.filterTabs}>
              <Pressable onPress={() => setFilterTab('tab1')}>
                <View style={filterTab === 'tab1' ? styles.filter_tab_active : styles.filter_tab}>
                  <SvgSeatGoldTopbar />
                </View>
              </Pressable>
              <Pressable onPress={() => setFilterTab('tab2')}>
                <View style={filterTab === 'tab2' ? styles.filter_tab_active : styles.filter_tab}>
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
        {filterTab === 'tab1' ? (
          trending_loader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Loader size={'large'} />
            </View>
          ) : trending_stylists.length > 0 || serviceByIdData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              data={
                serviceId != '' && serviceId != undefined
                  ? serviceByIdData
                  : trending_stylists
              }
              renderItem={({ item }) => {
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
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                  <SvgBottomLineSecondIcon />
                </View>
              }
              ListEmptyComponent={emptyData}
            />
          ) : (
            trending_error !== '' && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text style={styles.errorMessage}>{trending_error}</Text>
              </View>
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
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => {
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
  errorMessage: {
    color: colors.orange,
    fontSize: hp('2%'),
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

export default Trendings;
