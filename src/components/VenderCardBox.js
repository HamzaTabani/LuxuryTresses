import React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RatingIcon from './RatingIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SvgGoldBagIcon, SvgGoldSeatIcon} from './SvgImages';
import {useDispatch, useSelector} from 'react-redux';
import {getRecentStylists} from '../redux/slices/StylistSlice';

const VenderCardBox = ({name, img, email, itemData}) => {
  const navigation = useNavigation();

  // const {recentStylists} = useSelector(state => state.stylistReducer);
  // const {user, pic_url} = useSelector(state => state.userData);

  // const getRecentStylistsProfile = async () => {
  //   await dispatch(getRecentStylists());
  // };

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // if (recentStylists.length < 1) {
  //   getRecentStylistsProfile();
  //   // }
  // }, []);

  // const onRecntStylistDetail = item => {
  //   const stylistImages = recentStylists.map(item => ({
  //     stylist_image: item.profile_pic,
  //   }));

  //   navigation.navigate('ProfileDetail', {
  //     profile_id: item.id,
  //     stylists: stylistImages,
  //   });
  // };

  return (
    <View style={styles.cardBox}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
        {/* vender image */}
        <View style={styles.cardImage}>
          <Image
            source={img}
            style={{width: '100%', height: '100%'}}
            borderRadius={10}
            resizeMode="contain"
          />
        </View>
        {/* vender details */}
        <View style={{height: '100%', justifyContent: 'space-evenly'}}>
          <Text style={styles.venderNameText}>{name}</Text>
          <Text style={styles.venderDistanceText}>
            {email}
            {/* <Text style={{color: '#000'}}>(2km)</Text> */}
          </Text>

          <View style={{flexDirection: 'row', gap: 5}}>
            <View style={styles.filter_tab_active}>
              {/* <Image source={require('../assets/images/goldseat.png')} /> */}
              <SvgGoldSeatIcon />
            </View>
            <View style={styles.filter_tab_active}>
              {/* <Image source={require('../assets/images/goldbag.png')} /> */}
              <SvgGoldBagIcon />
            </View>
          </View>
        </View>
      </View>

      {/* vender contact and ratings*/}
      <View style={{justifyContent: 'space-between'}}>
        <Pressable
          // activeOpacity={0.9}
          // key={itemData?.id}
          onPress={() => navigation.navigate('Reviews', {name, email, img})}
          // onPress={() => console.log('itemData.id-->', itemData.id)}
          style={styles.ratingButton}>
          <View>
            <RatingIcon rating={5} w={30} h={30} r={10} />
          </View>
          <Text style={{color: '#fff', fontSize: hp('1.2%')}}>4.5 Rating</Text>
        </Pressable>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: '#19CC89',
              }}>
              <Ionicons
                name="chatbox-outline"
                type="Ionicons"
                color="#fff"
                size={20}
              />
            </View>
          </Pressable>
          <Pressable>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                backgroundColor: '#0C0A22',
              }}>
              <Feather
                name="shopping-bag"
                type="Feather"
                color="#D49621"
                size={20}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 20,
    padding: 4,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImage: {
    height: 90,
    width: 85,
  },
  venderNameText: {
    color: '#000',
    fontSize: hp('2%'),
  },
  venderDistanceText: {
    color: 'gray',
    fontSize: hp('1.7%'),
  },
  filter_tab_active: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#D49621',
    // height: hp('5.5%'),
    padding: hp('0.4%'),
    width: hp('12%'),
    borderRadius: 10,
  },
});

export default VenderCardBox;
