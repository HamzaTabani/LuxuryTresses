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
import {trendingStylists} from '../../redux/slices/StylistSlice';
import colors from '../../assets/colors';
import {SvgBottomLineSecondIcon} from '../../components/SvgImages';

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

  const {trending_stylists, trending_error, trending_loader} = useSelector(
    state => state.stylistReducer,
  );

  const {pic_url} = useSelector(state => state.userData);

  // console.log('trending stylists ==========>', trending_stylists);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trending_stylists.length < 1) {
      fetchTrendingStylists();
    }
  }, []);

  const fetchTrendingStylists = async () => {
    await dispatch(trendingStylists());
  };

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
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
                  <Image source={require('../../assets/images/goldseat.png')} />
                </View>
              </Pressable>
              <Pressable onPress={() => setFilterTab('tab2')}>
                <View
                  style={
                    filterTab === 'tab2'
                      ? styles.filter_tab_active
                      : styles.filter_tab
                  }>
                  <Image source={require('../../assets/images/goldbag.png')} />
                </View>
              </Pressable>
            </View>
            {/* filter icon */}
            <View style={styles.filterButton}>
              <Image source={require('../../assets/images/filtericon.png')} />
            </View>
          </View>
        </View>
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
          ) : trending_stylists.length > 0 ? (
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
              data={trending_stylists}
              renderItem={({item}) => {
                // console.log('itemitem=-=->>>', item.product);
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
                          ratings={
                            item.average_rating != null
                              ? item.average_rating
                              : 3
                          }
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
            data={trending_stylists}
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
                        ratings={
                          item.average_rating != null ? item.average_rating : 3
                        }
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
