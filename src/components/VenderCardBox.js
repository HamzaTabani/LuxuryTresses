import React, {useState} from 'react';
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
import images from '../assets/images';

const VenderCardBox = ({
  name,
  img,
  email,
  itemData,
  itemId,
  ratings,
  productIcon,
  serviceIcon,
}) => {
  const navigation = useNavigation();
  // console.log('serviceIcon-==', serviceIcon);
  // console.log('productIcon-==', productIcon);
  // console.log('itemData vendor card box-->', itemData);
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
  const {pic_url} = useSelector(state => state.userData);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.cardBox}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          gap: 6,
          // backgroundColor: 'yellow',
          width: '70%',
        }}>
        {/* vender image */}
        <View style={styles.cardImage}>
          <Image
            source={
              imageError
                ? images.profile
                : img == 'null' && img == null && img == 'undefined'
                ? images.profile
                : {uri: pic_url + img}
            }
            style={{width: '100%', height: '100%'}}
            borderRadius={10}
            resizeMode="contain"
            onError={handleImageError}
          />
        </View>
        {/* vender details */}
        <View
          style={{
            height: '100%',
            justifyContent: 'space-evenly',
            // backgroundColor: 'green',
            width: '60%',
          }}>
          <Text style={styles.venderNameText}>{name}</Text>
          <Text style={styles.venderDistanceText}>
            {email}
            {/* <Text style={{color: '#000'}}>(2km)</Text> */}
          </Text>

          <View style={{flexDirection: 'row', gap: 5}}>
            {serviceIcon ? (
              <View style={styles.filter_tab_active}>
                <SvgGoldSeatIcon />
              </View>
            ) : null}
            {productIcon ? (
              <View style={styles.filter_tab_active}>
                <SvgGoldBagIcon />
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {/* vender contact and ratings*/}
      <View style={{justifyContent: 'space-between'}}>
        {ratings != null ? (
          <Pressable
            // activeOpacity={0.9}
            // key={itemData?.id}
            onPress={() =>
              navigation.navigate('Reviews', {
                name,
                email,
                img,
                id: itemId,
                ratings,
              })
            }
            // onPress={() => console.log('itemData.id-->', itemData.id)}
            style={styles.ratingButton}>
            <View>
              <RatingIcon rating={ratings} w={30} h={30} r={10} />
            </View>
            <Text style={{color: '#fff', fontSize: hp('1.2%')}}>
              {ratings} Rating
            </Text>
          </Pressable>
        ) : null}
        <View
          style={
            ratings == null
              ? {
                  marginTop: hp(6),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor:'red',
                  width:hp(12)
                }
              : {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }
          }>
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
    // backgroundColor: 'red',
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
