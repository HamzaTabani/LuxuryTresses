import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import images from '../assets/images';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const UserDetailCard = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.chatHeader}>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
        }}>
        <View
          style={{
            width: 70,
            height: 70,
          }}>
          <Image
            source={images.stylist1}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
          {/* online status button */}
        </View>

        <View style={{justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: hp('2.0%')}}>Omnis iste</Text>
          <Text
            style={{
              color: '#efefef',
              fontSize: hp('1.5%'),
              marginTop: 2,
            }}>
            1069 Oak St. (600km)
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#C78914',
          margin: 3,
          paddingHorizontal: 10,
          padding: 3,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff',
        }}>
        <TouchableOpacity style={styles.ratingCard} activeOpacity={0.9} onPress={() => navigation.navigate('Reviews')}>
          <Progress.Circle
            progress={0.7}
            color={colors.lightgreen}
            size={38}
            borderColor="transparent"
            style={{marginLeft: 1, marginTop: 1}}
          />
          <View style={styles.imageWrapper}>
            <Image
              source={images.star}
              style={{height: hp('2%'), width: hp('2%')}}
            />
          </View>
        </TouchableOpacity>
        <Text style={{fontSize: hp('1.2%'), color: '#fff'}}>4.5 Rating</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    // height: 80,
    // width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D49621',
    padding: hp('0.5%'),
    flexDirection: 'row',
    backgroundColor: '#D49621',
    justifyContent: 'space-between',
  },
  ratingCard: {
    backgroundColor: colors.white,
    marginTop: hp('0.2%'),
    // height: hp('5.5%'),
    borderRadius: 50,
    height: 40,
    width: 40
    // width: hp('5.5%'),
  },
  imageWrapper: {
    position: 'absolute',
    left: 13,
    top: 14,
  },
});

export default UserDetailCard;
