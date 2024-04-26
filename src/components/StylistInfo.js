import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
import images from '../assets/images';
import * as Progress from 'react-native-progress';
import {imageUrl, stylistImages} from '../dummyData';
import OutlineButton from './OutlineButton';
import {SvgCardPopularIcon, SvgGoldBagIcon, SvgGoldSeatIcon} from './SvgImages';
import {useNavigation} from '@react-navigation/native';
const StylistInfo = ({
  image,
  isActive,
  onArrowPress,
  flatListRef,
  cardStyle,
  name,
  address,
  distance,
  description,
  rating,
  serviceIcon,
  productIcon,
  profileId,
}) => {
  const [imageError, setImageError] = useState(false);
  // console.log('imageError-=->', images.profile);
  const handleImageError = () => {
    setImageError(true);
    Alert('hit');
  };
  const milesToKilometers = miles => {
    const kilometers = miles * 1.60934;
    return kilometers.toFixed(2);
  };
  const navigation = useNavigation();

  // console.log('near by image=-=>', image);
  // console.log('rating-=-=-=>', rating);
  // console.log('serviceIcon->', serviceIcon, 'productIcon->', productIcon);
  return (
    <View
      style={[
        styles.card,
        isActive
          ? {height: hp('60%'), width: hp('43%')}
          : {marginRight: hp('1%'), height: hp('19.5%'), alignSelf: 'flex-end'},
        cardStyle,
      ]}>
      <TouchableOpacity activeOpacity={0.9} onPress={onArrowPress}>
        <Arrow
          name={isActive ? 'arrow-down' : 'arrow-up'}
          color={colors.white}
          style={{alignSelf: 'center'}}
          size={35}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileDetail', {
                profile_id: profileId,
              })
            }>
            <Image
              resizeMode="contain"
              source={
                // imageUrl && image ? {uri: imageUrl + image} : images.stylist1
                imageError
                  ? images.profile
                  : image == 'null' || image == null || image == 'undefined'
                  ? images.profile
                  : // : {uri: imageUrl + image}
                    {uri: image}
              }
              style={styles.image}
              borderRadius={10}
              onError={handleImageError}
            />
          </TouchableOpacity>
          <View style={styles.textWrapper}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>
              {address != null && address != 'undefined' ? address : 'address'}
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                {'  (' + milesToKilometers(parseFloat(distance)) + 'Km)'}
              </Text>
            </Text>
            <View style={{flexDirection: 'row', gap: 8}}>
              {serviceIcon ? (
                <View style={styles.iconView}>
                  <SvgGoldSeatIcon />
                </View>
              ) : null}
              {productIcon ? (
                <View style={styles.iconView}>
                  <SvgGoldBagIcon />
                </View>
              ) : null}
            </View>
          </View>
        </View>
        {/* {rating != null ? ( */}
        <View style={styles.ratingView}>
          <View style={styles.ratingStyle}>
            <Progress.Circle
              progress={rating / 5}
              color={colors.lightgreen}
              size={40}
              style={{marginTop: hp('0.5%')}}
              borderColor="transparent"
            />
            <View style={styles.imageWrapper}>
              <SvgCardPopularIcon />
            </View>
          </View>
          <Text style={{color: colors.white, marginTop: hp('0.4%')}}>
            {rating ? rating : 0} rating
          </Text>
        </View>
        {/* ) : null} */}
      </View>
      {isActive && (
        <>
          <ScrollView
            onTouchStart={() => {
              flatListRef.current.setNativeProps({scrollEnabled: false});
            }}
            onTouchEnd={() => {
              flatListRef.current.setNativeProps({scrollEnabled: true});
            }}
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.textView}>
              <Text style={styles.heading}>About {name}</Text>
              <Text style={{color: colors.white, marginTop: hp('2%')}}>
                {description != null ? description : 'about'}
              </Text>
            </View>
            <OutlineButton
              buttonStyle={{
                borderColor: colors.white,
                marginTop: hp('3%'),
                // marginBottom: hp('1%'),
                alignSelf: 'center',
                width: '95%',
              }}
              textStyle={{color: colors.white}}
              title={'SEE TIMES'}
            />
          </ScrollView>
          {/* <ScrollView
            horizontal={true}
            onTouchStart={() => {
              flatListRef.current.setNativeProps({scrollEnabled: false});
            }}
            onTouchEnd={() => {
              flatListRef.current.setNativeProps({scrollEnabled: true});
            }}
            style={styles.scrollWrapper}
            showsHorizontalScrollIndicator={false}>
            {stylistImages.map(item => (
              <Image
                key={item.id}
                source={item.image}
                style={styles.imageStyle}
                borderRadius={15}
              />
            ))}
          </ScrollView> */}
          {/* <OutlineButton
            buttonStyle={{
              borderColor: colors.white,
              marginTop: hp('3%'),
              // marginBottom: hp('1%'),
              alignSelf: 'center',
              width: '95%',
            }}
            textStyle={{color: colors.white}}
            title={'SEE TIMES'}
          /> */}
        </>
      )}
    </View>
  );
};

export default StylistInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.orange,
    padding: hp('1%'),
    // marginRight: hp('4.5%'),
    borderRadius: 20,
    marginHorizontal: 20,
  },
  image: {
    height: hp('10%'),
    width: hp('10%'),
  },
  textWrapper: {
    marginLeft: hp('1.7%'),
    marginTop: hp('1%'),
  },
  name: {
    color: colors.white,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  location: {
    color: 'lightgrey',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: hp('1.4%'),
    height: hp('3.7%'),
    width: hp('3.7%'),
    borderRadius: 50,
  },
  ratingView: {
    borderWidth: 1,
    marginLeft: hp('1.5%'),
    borderRadius: 14,
    borderColor: colors.white,
    padding: hp('1%'),
    alignItems: 'center',
    // backgroundColor:'red'
  },
  ratingStyle: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 50,
    height: hp('6%'),
    width: hp('6%'),
  },
  imageWrapper: {
    position: 'absolute',
    top: hp('2%'),
  },
  detailCard: {
    backgroundColor: colors.orange,
    borderRadius: 20,
    // height: hp('30%'),
    padding: hp('1.5%'),
    width: '70%',
  },
  textView: {
    borderWidth: 1,
    // height: hp('25%'),
    borderRadius: 15,
    marginTop: hp('3%'),
    borderColor: colors.white,
    padding: hp('1%'),
    paddingBottom: hp('3%'),
    // marginBottom:hp('20%'),
    // backgroundColor:'red'
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  imageStyle: {
    height: hp('9%'),
    marginLeft: hp('1.2%'),
    width: hp('9%'),
    marginTop: hp('2%'),
    marginBottom: hp('5%'),
  },
  scrollWrapper: {
    width: 305,
    height: hp('17%'),
    // zIndex: 200,
    // backgroundColor:'green',
    // marginTop:hp('5%')
    // padding:0
  },
});
