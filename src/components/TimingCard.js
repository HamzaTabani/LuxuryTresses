import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Arrow from 'react-native-vector-icons/SimpleLineIcons'

const TimingCard = () => {
    return (
        <View style={styles.cardStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{marginLeft: hp('1%')}}>
                    <Text style={styles.heading}>See Times</Text>
                    <View style={styles.line} />
                </View>
                <Text style={styles.time}>24 hours</Text>
            </View>
            <Arrow
                name={'arrow-down'}
                color={colors.white}
                size={35}
                style={{alignSelf: 'center'}}
            />
        </View>
    )
}

export default TimingCard

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: colors.orange,
        borderRadius: 15,
        padding: hp('1%')
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    time: {
        color: colors.white,
        marginRight: hp('2%'),
    },
    line: {
        borderBottomColor: colors.black,
        paddingTop: hp('2%'),
        width: '415%',
        borderBottomWidth: 0.7,
    }
})