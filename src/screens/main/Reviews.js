import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import PageWrapper from '../../components/PageWrapper';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VenderCardBox from '../../components/VenderCardBox';
import UserDetailCard from '../../components/UserDetailCard';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ReviewDetailCard from '../../components/ReviewDetailCard';
import images from '../../assets/images';

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

const Reviews = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {name, email, img} = route?.params;
  return (
    <PageWrapper>
      <ProfileHeader username={true} />
      <View style={styles.trendingContainer}>
        {/* ///////// title and filter buttons container ///////*/}
        <View style={styles.filterContainer}>
          <Text style={styles.mainTitleText}>Reviews</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            {/* filter icon */}
            <Pressable onPress={() => navigation.goBack()}>
              <View style={styles.filterButton}>
                <FontAwesome5
                  name="close"
                  type="AntDesign"
                  color="#D49621"
                  size={22}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            paddingBottom: 20,
            borderBottomWidth: 0.5,
            borderColor: '#D49621',
          }}>
          <UserDetailCard username={name} email={email} image={img} />
        </View>
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#D49621',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 17,
            padding: 3,
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Add comment"
            style={{marginLeft: 10}}
            placeholderTextColor="gray"
          />
          <Ionicons
            name="send"
            type="AntDesign"
            color="#D49621"
            size={22}
            style={{marginRight: 10}}
          />
        </View>

        {/*/////////////  filter items container ////////////// */}
        {/* reviews listing */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <ReviewDetailCard />
          <ReviewDetailCard />
          <ReviewDetailCard />
          <ReviewDetailCard />
        </ScrollView>
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
});

export default Reviews;
