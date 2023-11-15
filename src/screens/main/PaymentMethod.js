import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import OutlineButton from '../../components/OutlineButton';
import Back from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors'; 

const PaymentMethod = () => {
  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Payment Options'} />
      <ScrollView style={styles.container}>
        {/* checkout product list */}
        <View
          style={{
            paddingBottom: 40,
            borderColor: '#D49621',
            borderBottomWidth: 0.3,
          }}>
          <ImageBackground
            source={require('../../assets/images/homebanner2.png')}
            style={{
              width: '100%',
              height: 180,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            borderRadius={20}>
            <View style={{margin: hp('2.5%')}}>
              <Text style={styles.userCartText}>Sarah.J</Text>
            </View>
            <View style={{margin: hp('2.5%')}}>
              <Text style={styles.userCartText}>4242 4242 4242 4242</Text>
              <Text
                style={{
                  fontWeight: 'light',
                  color: '#efefef',
                  fontSize: hp('1.5%'),
                }}>
                12 / 24
              </Text>
            </View>
          </ImageBackground>
          {/* <CheckoutProductCard /> */}
          {/* <CheckoutProductCard /> */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <OutlineButton title="Add New Card" textStyle={{color: '#fff'}} />
          </View>
        </View>
        {/* checkou summary */}
        <View style={{marginTop: 15}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              marginBottom: 20,
            }}>
            Other payment method
          </Text>

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
                  source={require('../../assets/images/chatuser.png')}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%'}}
                />
                {/* online status button */}
              </View>

              <View style={{justifyContent: 'center'}}>
                <Text style={{color: '#fff', fontSize: hp('2.0%')}}>
                  Master card / Visa
                </Text>
                <Text
                  style={{
                    color: '#efefef',
                    fontSize: hp('1.5%'),
                    marginTop: 2,
                  }}>
                  1512 1212 **** ****
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#000015',
                margin: 3,
                paddingHorizontal: 10,
                padding: 3,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#D49621',
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Back name={'arrow-forward'} color={colors.orange} size={20} />
            </View>
          </View>

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
                  source={require('../../assets/images/chatuser.png')}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%'}}
                />
                {/* online status button */}
              </View>

              <View style={{justifyContent: 'center'}}>
                <Text style={{color: '#fff', fontSize: hp('2.0%')}}>
                  Master card / Visa
                </Text>
                <Text
                  style={{
                    color: '#efefef',
                    fontSize: hp('1.5%'),
                    marginTop: 2,
                  }}>
                  1512 1212 **** ****
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#000015',
                margin: 3,
                paddingHorizontal: 10,
                padding: 3,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#D49621',
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Back name={'arrow-forward'} color={colors.orange} size={20} />
            </View>
          </View>
        </View>

        {/* Pay Button */}
        <View style={{marginTop: 5, alignItems: 'center'}}>
          <PrimaryButton title="Pay now" />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#D49621',
    padding: 10,
  },
  summaryItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  summaryItemTitleText: {
    color: '#efefef',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalPrice: {
    color: '#D49621',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  chatHeader: {
    height: 80,
    width: '100%',
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: '#D49621',
    padding: 3,
    flexDirection: 'row',
    backgroundColor: '#000015',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  userCartText: {
    fontWeight: 'light',
    color: '#fff',
    fontSize: hp('3.5%'),
  },
});

export default PaymentMethod;
