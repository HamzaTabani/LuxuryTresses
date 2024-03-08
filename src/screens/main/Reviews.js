import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
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
import UserDetailCard from '../../components/UserDetailCard';
import FontAwesome5 from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ReviewDetailCard from '../../components/ReviewDetailCard';
import images from '../../assets/images';
import {PostReview, stylistReviewById} from '../../redux/slices/StylistSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import StarRating from 'react-native-star-rating-widget';
import colors from '../../assets/colors';
import {ShowToast} from '../../utils';

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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {name, email, img, id} = route?.params;
  const [rating, setRating] = useState('');
  const [postComment, setPostComment] = useState('');
  // console.log('ididddd-->', id);
  const {stylistReview, stylistReview_loading, stylistReview_error} =
    useSelector(state => state.stylistReducer);

  const {pic_url, user} = useSelector(state => state.userData);
  console.log('sigined in user---->', id);
  useEffect(() => {
    if (!stylistReview[id]) {
      fetchProfileReview();
    }
  }, [id]);

  const fetchProfileReview = async () => {
    await dispatch(stylistReviewById(id));
  };

  const onHandleSubmit = async () => {
    if (rating == '' && postComment == '') {
      return ShowToast('please enter rating or comment');
    } else {
      const res = await dispatch(
        PostReview({
          userId: id,
          userRating: rating,
          userComment: postComment,
        }),
      );
      if (res.payload.success) {
        // navigation.navigate('home');
        // return(

        ShowToast(res.payload.message);
        await dispatch(stylistReviewById(id));
        // )
      } else {
        return ShowToast(res.payload.message);
      }
    }
  };

  const headerComponent = () => {
    return (
      <View
        style={{
          // height: hp('25%'),
          backgroundColor: '#D49621',
          borderRadius: 20,
          borderColor: colors.gray,
          borderWidth: 0.5,
          marginTop: hp('5%'),
          padding: hp('1.5%'),
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: hp('2%'),
          }}>
          Add your review
        </Text>
        <StarRating
          rating={rating}
          starSize={30}
          color={colors.white}
          starStyle={{marginTop: hp('5%')}}
          onChange={setRating}
        />
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: colors.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp('3%'),
            marginHorizontal: hp('1%'),
            marginBottom: 10,
            // backgroundColor:'red'
          }}>
          <TextInput
            placeholder="Add comment"
            style={{marginLeft: 10, color: colors.white}}
            placeholderTextColor={colors.white}
            value={postComment}
            onChangeText={text => setPostComment(text)}
          />
          <TouchableOpacity onPress={() => onHandleSubmit()}>
            <Ionicons
              name="send"
              type="AntDesign"
              color={colors.white}
              size={22}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
        {stylistReview_loading ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Loader size={'large'} />
          </View>
        ) : (
          // : stylistReview_error !== '' ? (
          //   <View
          //     style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          //     <Text style={styles.errorMessage}>detail_error</Text>
          //   </View>
          // )
          <View style={{marginBottom: hp('28')}}>
            <View
              style={{
                marginTop: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderColor: '#D49621',
              }}>
              <UserDetailCard username={name} email={email} image={img} />
            </View>

            {/*/////////////  filter items container ////////////// */}
            {/* reviews listing */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always">
              <View
                style={{
                  // height: hp('25%'),
                  backgroundColor: '#D49621',
                  borderRadius: 20,
                  borderColor: colors.gray,
                  borderWidth: 0.5,
                  marginTop: hp('5%'),
                  padding: hp('1.5%'),
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: hp('2%'),
                  }}>
                  Add your review
                </Text>
                <StarRating
                  rating={rating}
                  starSize={30}
                  color={colors.white}
                  starStyle={{marginTop: hp('5%')}}
                  onChange={setRating}
                />
                <View
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: colors.white,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: hp('3%'),
                    marginHorizontal: hp('1%'),
                    marginBottom: 10,
                  }}>
                  <TextInput
                    multiline
                    // numberOfLines={4}
                    placeholder="Add comment"
                    style={{marginLeft: 10, color: colors.white, width: wp(68)}}
                    placeholderTextColor={colors.white}
                    value={postComment}
                    onChangeText={text => setPostComment(text)}
                  />
                  <TouchableOpacity onPress={() => onHandleSubmit()}>
                    <Ionicons
                      name="send"
                      type="AntDesign"
                      color={colors.white}
                      size={22}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                keyboardDismissMode={'on-drag'}
                showsVerticalScrollIndicator={false}
                data={[...stylistReview?.reviews].reverse()}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  // console.log('stylistReview items-->', item);
                  return (
                    <ReviewDetailCard
                      profilePic={item.user.profile_pic}
                      name={item.user.first_name + ' ' + item.user.last_name}
                      commentTime={item.created_at}
                      comment={item.comment}
                      commentRating={item.rating}
                    />
                  );
                }}
                // ListHeaderComponent={headerComponent}
                ListEmptyComponent={
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    No Review Found!
                  </Text>
                }
                contentContainerStyle={{paddingBottom: hp('2')}}
              />
            </ScrollView>
          </View>
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
