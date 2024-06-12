import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RatingIcon from './RatingIcon';
import { useNavigation } from '@react-navigation/native';
import { SvgGoldBagIcon, SvgGoldSeatIcon } from './SvgImages';
import { useSelector } from 'react-redux';
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
  const { pic_url } = useSelector(state => state.userData);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.cardBox}>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          width: '70%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileDetail', { profile_id: itemId })}
          style={styles.cardImage}>
          <Image
            source={
              imageError
                ? images.profile
                : img == 'null' || img == null || img == 'undefined'
                  ? images.profile
                  : { uri: img }
            }
            style={{ width: '100%', height: '100%' }}
            borderRadius={10}
            resizeMode="contain"
            onError={handleImageError}
          />
        </TouchableOpacity>
        {/* vender details */}
        <View
          style={{
            height: '100%',
            justifyContent: 'space-evenly',
            width: '60%',
          }}>
          <Text style={styles.venderNameText}>{name}</Text>
          <Text style={styles.venderDistanceText}>{email}</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
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
      <View style={{ justifyContent: 'space-between' }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Reviews', {
              name,
              email,
              img,
              id: itemId,
              ratings,
            })
          }
          style={styles.ratingButton}>
          <View>
            <RatingIcon rating={ratings} w={30} h={30} r={10} />
          </View>
          <Text style={{ color: '#fff', fontSize: hp('1.2%') }}>
            {ratings ? (Math.round(ratings * 100) / 100).toFixed(2) : 0} Rating
          </Text>
        </Pressable>
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
    padding: hp('0.4%'),
    width: hp('12%'),
    borderRadius: 10,
  },
});

export default VenderCardBox;
