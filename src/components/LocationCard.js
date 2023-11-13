import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import InputField from './InputField'
import images from '../assets/images'
import OutlineButton from './OutlineButton'

const LocationCard = () => {
    return (
        <View style={styles.cardStyle}>
            <Text style={styles.addressText}>Your Address</Text>
           <View style={{paddingTop: hp('2%'), flexDirection: 'row'}}> 
            <InputField />
            <View style={styles.locationStyle}>
                    <Image 
                        source={images.locationIcon}
                    />
            </View>
            </View>
            <OutlineButton 
                buttonStyle={styles.button}
                title={'SET UP YOUR LOCATION'}
            />
        </View>
    )
}

export default LocationCard

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        borderRadius: 15,
        backgroundColor: colors.orange,
        bottom: hp('5%'),
        alignSelf: 'center',
        padding: hp('2%')
    },
    addressText:{
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    locationStyle:{
        backgroundColor: colors.darkblue,
        borderRadius: 100,
        marginLeft: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('7%'),
        width: hp('7%')
    },
    button:{
        backgroundColor: colors.darkblue,
        alignSelf: 'center',
        marginTop: hp('2%')
    }

})