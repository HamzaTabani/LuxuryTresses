import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Subheading from '../../components/Subheading';
import Card from '../../components/Card';
import ProductCard from '../../components/ProductCard';
import ShortcutBox from '../../components/ShortcutBox';

const cartData = [
  {
    id: 1,
    img: require('../../assets/images/cart1.png'),
  },
  {
    id: 2,
    img: require('../../assets/images/cart2.png'),
  },
  {
    id: 3,
    img: require('../../assets/images/cart3.png'),
  },
];
const cartData2 = [
  {
    id: 1,
    img: require('../../assets/images/cart4.png'),
  },
  {
    id: 2,
    img: require('../../assets/images/cart5.png'),
  },
  {
    id: 3,
    img: require('../../assets/images/cart6.png'),
  },
];

const Home = ({ navigation }) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../../assets/images/homebg.png')}
          resizeMode="cover"
          style={styles.bg_home}>
          {/* home header */}
          <ProfileHeader text={'Hi Sarah,'} />
          <ScrollView style={{ flex: 1 }}>
            {/* home title */}
            <View>
              <View style={{ paddingHorizontal: wp('8%') }}>
                <Text style={styles.home_heading}>Hi Sarah,</Text>
                <Text style={styles.home_title}>Lets make a new style!</Text>
              </View>

              {/* home shorcuts boxes */}
              <View
                style={{
                  marginTop: 30,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp('8%'),
                }}>
                <Pressable onPress={() => navigation.navigate('trendings')}>
                  <ShortcutBox
                    title={'Trends'}
                    img={require('../../assets/images/trend.png')}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Nearby')}>
                  <ShortcutBox
                    title={'Nearby'}
                    img={require('../../assets/images/near.png')}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('recents')}>
                  <ShortcutBox
                    title={'Recents'}
                    img={require('../../assets/images/recent.png')}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('populars')}>
                  <ShortcutBox
                    title={'Popular'}
                    img={require('../../assets/images/popular.png')}
                  />
                </Pressable>
              </View>
              {/* Top Style */}
              <View
                style={{
                  marginVertical: 30,
                  paddingBottom: 40,
                  paddingTop: 30,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: '#D49621',
                }}>
                <View>
                  <View style={{ paddingHorizontal: wp('8%') }}>
                    <Subheading title={'Top stylists'} />
                  </View>
                  <ScrollView
                    style={{ marginTop: 20, marginLeft: 30 }}
                    horizontal>
                    {cartData.map(item => (
                     <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('StylistDetails')}> 
                      <Card key={item?.id} rating={3} item={item} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              {/* Recent */}
              <View
                style={{
                  marginBottom: 40,
                  paddingBottom: 40,
                  borderBottomWidth: 0.5,
                  borderColor: '#D49621',
                }}>
                <View>
                  <View style={{ paddingHorizontal: wp('8%') }}>
                    <Subheading title={'Recent products'} />
                  </View>

                  <ScrollView
                    style={{ marginTop: 20, marginLeft: 30 }}
                    horizontal>
                    {cartData2.map(item => (
                      <ProductCard key={item?.id} rating={3} item={item} />
                    ))}
                  </ScrollView>
                </View>
              </View>

              {/* banner 1 */}
              <View style={{ paddingHorizontal: wp('8%'), marginBottom: 8 }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: 200,
                    width: '100%',
                  }}>
                  <Image
                    source={require('../../assets/images/homebanner1.png')}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 35,
                      right: 12,
                      height: 50,
                      width: 50,
                    }}>
                    <Image
                      source={require('../../assets/images/topleftarrow.png')}
                      resizeMode="contain"
                      style={{
                        width: '100%',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 35,
                      right: 12,
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#fff',
                        textAlign: 'right',
                        fontSize: hp('2.5%'),
                      }}>
                      Let your hair
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#fff',
                        textAlign: 'right',
                        fontSize: hp('2.5%'),
                      }}>
                      Speak for itself
                    </Text>
                  </View>
                </View>
              </View>
              {/* banner 2 */}
              <View style={{ paddingHorizontal: wp('8%'), marginBottom: 80 }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: 200,
                    width: '100%',
                  }}>
                  <Image
                    source={require('../../assets/images/homebanner2.png')}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 18,
                      right: 20,
                      height: hp('35%'),
                      width: wp('35%'),
                    }}>
                    <Image
                      source={require('../../assets/images/banner2support.png')}
                      resizeMode="contain"
                      style={{
                        width: '100%',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 30,
                      left: 12,
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#000',
                        fontSize: hp('2.5%'),
                      }}>
                      Start your
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#000',
                        fontSize: hp('2.5%'),
                      }}>
                      hiar journey
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        marginTop: 10,
                      }}>
                      Explore stylists
                    </Text>
                    <Pressable>
                      <View
                        style={{
                          height: 40,
                          width: 120,
                          backgroundColor: '#111649',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          borderRadius: 5,
                          marginTop: 10,
                        }}>
                        <Image
                          source={require('../../assets/images/topleftarrow.png')}
                          resizeMode="contain"
                          style={{
                            width: 20,
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: '400',
                            color: '#EDBA1B',
                            fontSize: hp('1.5%'),
                          }}>
                          START NOW
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* bottom lines */}
              <View
                style={{
                  paddingHorizontal: wp('8%'),
                  marginBottom: 150,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/bottom_lines.png')}
                  resizeMode="contain"
                  style={{
                    width: 40,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg_home: {
    flex: 1,
    justifyContent: 'space-between',
  },
  home_heading: {
    fontSize: hp('5.5%'),
    color: '#fff',
  },
  home_title: {
    fontSize: hp('2%'),
    color: '#bbb9bd',
    marginTop: 10,
  },
});
