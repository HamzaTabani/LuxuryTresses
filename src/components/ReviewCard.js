import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress';
import images from '../assets/images';

const ReviewCard = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
            <View>
                <Text style={styles.reviewText}>Customer reviews</Text>
                <Text style={styles.text}>152 customer rating</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: hp('2%') }}>
                    <Text style={styles.reviewText}>4.5 rating</Text>
                    <Text style={[styles.text, { alignSelf: 'center' }]}>out of 5</Text>
                </View>
                <View style={styles.progressView}>
                    <Progress.Circle progress={0.7}
                        color={colors.lightgreen}
                        size={40.5}
                        style={{ marginTop: hp('0.5%') }}
                        borderColor='transparent'
                    />
                    <View style={styles.imageWrapper}>
                        <Image
                            source={images.star}
                            style={{ height: hp('2.5%'), width: hp('2.5%') }}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.orange,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: hp('2.5%')
    },
    reviewText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    text: {
        color: colors.white,
        marginTop: hp('0.5%')
    },
    progressView: {
        backgroundColor: colors.white,
        alignItems: 'center',
        height: hp('6%'),
        width: hp('6%'),
        borderRadius: 100
    },
    imageWrapper: {
        position: 'absolute',
        top: hp('2%')
    }
})