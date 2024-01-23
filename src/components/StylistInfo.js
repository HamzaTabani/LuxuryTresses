import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
import images from '../assets/images';
import * as Progress from 'react-native-progress';
import { stylistImages } from '../dummyData';
import OutlineButton from './OutlineButton';

const StylistInfo = ({ image, isActive, onArrowPress, flatListRef, cardStyle }) => {
  // console.log('isActive =====>', isActive)
  return (
    <View
      style={[
        styles.card,
        isActive
          ? { height: hp('66%'), width: hp("43%") }
          : { marginRight: hp('1%') },
      cardStyle]}>
      <Arrow
        name={isActive ? 'arrow-down' : 'arrow-up'}
        color={colors.white}
        style={{ alignSelf: 'center' }}
        size={35}
        onPress={onArrowPress}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={image} style={styles.image} borderRadius={10} />
          <View style={styles.textWrapper}>
            <Text style={styles.name}>Omnis iste</Text>
            <Text style={styles.location}>
              1609 Oak, St.{' '}
              <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                (2km)
              </Text>
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={styles.iconView}>
                <Image source={images.tab1} />
              </View>
              <View style={styles.iconView}>
                <Image source={images.tab2} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ratingView}>
          <View style={styles.ratingStyle}>
            <Progress.Circle
              progress={0.7}
              color={colors.lightgreen}
              size={40}
              style={{ marginTop: hp('0.5%') }}
              borderColor="transparent"
            />
            <View style={styles.imageWrapper}>
              <Image
                source={images.star}
                style={{ height: hp('2.3%'), width: hp('2.3%') }}
              />
            </View>
          </View>
          <Text style={{ color: colors.white, marginTop: hp('0.4%') }}>
            4.5 rating
          </Text>
        </View>
      </View>
      {isActive && (
        <ScrollView contentContainerStyle={styles.textView} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>About Omnis iste</Text>
          <Text style={{ color: colors.white, marginTop: hp('2%') }}>
            Sed ut perspiciatis unde omnis iste natus error sit{'\n'} voluptatem
            accusantium doloremque laudantium, totam{'\n'} rem aperiam, eaque
            ipsa quae ab illo inventore veritatis{'\n'} et quasi architecto
            beatae vitae dicta sunt explicabo.
          </Text>
          <ScrollView
            horizontal={true}

            onTouchStart={() => {
              flatListRef.current.setNativeProps({ scrollEnabled: false });
            }}
            onTouchEnd={() => {
              flatListRef.current.setNativeProps({ scrollEnabled: true });
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
          </ScrollView>
          <OutlineButton
            buttonStyle={{
              borderColor: colors.white,
              marginTop: hp('3%'),
              // marginBottom: hp('1%'),
              alignSelf: 'center',
              width: "95%"
            }}
            textStyle={{ color: colors.white }}
            title={'SEE TIMES'}
          />
        </ScrollView>
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
    top: hp('2.3%'),
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
    // height: hp('44%'),
    borderRadius: 15,
    marginTop: hp('2%'),
    borderColor: colors.white,
    padding: hp('2%'),
    paddingBottom: hp("2%")
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  imageStyle: {
    height: hp('9%'),
    marginRight: hp('1%'),
    width: hp('9%'),
    marginTop: hp('2%'),
  },
  scrollWrapper: {
    width: 300,
    zIndex: 200
  }
});
