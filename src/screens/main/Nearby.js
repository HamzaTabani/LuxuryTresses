import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import ProfileHeader from '../../components/ProfileHeader'
import MapView, { Marker } from 'react-native-maps';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import { kilometers, markerImages, tabs } from '../../dummyData';
import { Picker } from '@react-native-picker/picker';
import images from '../../assets/images';

const Nearby = () => {
    const [changeTab, setChangeTab] = useState(1)
    const [selectKilometers, setSelectKilometers] = useState("")

    return (
        <PageWrapper>
            <ProfileHeader username={true} />
            <View style={styles.screen}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    mapType='terrain'
                    style={styles.mapStyle}
                >
                    {markerImages.map((item) => (
                        <Marker
                            image={item.image}
                            coordinate={{ latitude: item.lat, longitude: item.long }}
                        />
                    ))}
                </MapView>
                <View style={styles.workingmapView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.tabView}>
                            {tabs.map((item) => (
                                <TouchableOpacity activeOpacity={0.9} onPress={() => setChangeTab(item.id)}
                                    style={changeTab == item.id && styles.background}
                                >
                                    <Image
                                        source={item.icon}
                                        style={{ height: hp('2.2%'), width: hp('2.2%') }}
                                    />
                                </TouchableOpacity>
                            ))
                            }
                        </View>
                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={selectKilometers}
                                dropdownIconColor={colors.orange}
                                dropdownIconRippleColor={colors.orange}
                                onValueChange={(itemValue) =>
                                    setSelectKilometers(itemValue)
                                }
                            >
                                {kilometers.map((item) => (
                                    <Picker.Item label={item.text} value={item.text} style={{ color: colors.black }} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.locationView}>
                            <Image
                                source={images.locationIcon}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </PageWrapper>
    )
}

export default Nearby

const styles = StyleSheet.create({
    screen: {
        overflow: 'hidden',
        marginTop: hp('4%'),
        borderRadius: 30,
    },
    mapStyle: {
        height: '100%',
        width: '100%'
    },
    workingmapView: {
        position: 'absolute',
    },
    tabView: {
        padding: hp('0.1%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: hp('1%'),
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderRadius: 50,
        alignItems: 'center',
        width: hp('16%'),
        top: 20,
        left: 10,
        backgroundColor: colors.white2
    },
    background: {
        backgroundColor: '#ffffff',
        paddingHorizontal: hp('3%'),
        borderRadius: 50,
        padding: hp('1.7%')
    },
    pickerStyle: {
        backgroundColor: colors.white2,
        borderWidth: 2,
        borderColor: 'lightgrey',
        left: 10,
        borderRadius: 50,
        top: 20,
        width: '40%',
        padding: hp('0.4%')
    },
    locationView: {
        backgroundColor: colors.darkblue,
        top: 24,
        left: 40,
        height: hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: hp('7%')
    }
})