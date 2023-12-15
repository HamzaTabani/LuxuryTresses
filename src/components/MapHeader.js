import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Back from 'react-native-vector-icons/Ionicons'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Search from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const MapHeader = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.headerView}>
            <View style={styles.iconView}>
                <Back
                    name={'arrow-back'}
                    color={colors.orange}
                    size={35}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <LinearGradient style={styles.searchView} colors={[colors.secondary, colors.white]}
                start={{x: 0, y: 0}} end={{x: 0, y: 4}}
            >
                    <Search 
                        name={'search1'}
                        color={colors.white}
                        size={32}
                    />
            </LinearGradient>
        </View>
    )
}

export default MapHeader

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        left: hp('3%'),
        top: hp('6%'),
        position: 'absolute'
    },
    iconView: {
        borderWidth: 1.5,
        borderColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('8%'),
        width: hp('8%'),
        borderRadius: 50
    },
    searchView: {
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        left: hp('27%'),
        borderRadius: 50,
        height: hp('8%'),
        width: hp('8%')
    }
})