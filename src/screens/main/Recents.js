import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VenderCardBox from '../../components/VenderCardBox';
import ProductCardBox from '../../components/ProductCardBox';

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

  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Recants</Text>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            {cartData?.map(item => (
              <VenderCardBox key={item.id} name={item.name} img={item.img} />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            {cartData2?.map(item => (
              <ProductCardBox key={item.id} name={item.name} img={item.img} />
            ))}
          </ScrollView>
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
});

export default Recents;
