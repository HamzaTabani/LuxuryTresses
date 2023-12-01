import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import images from '../assets/images'
import * as Progress from 'react-native-progress';

const HistoryCard = ({ image, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardStyle} activeOpacity={0.9} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={image}
                    style={styles.image}
                    borderRadius={15}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>Omnis iste</Text>
                    <Text style={styles.location}>1609 Oak, St. <Text style={{ color: colors.white }}>(2km)</Text></Text>
                    <Text style={styles.completedText}>Completed</Text>
                </View>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.iconView}>
                    <Image
                        source={images.bag}
                    />
                </View>
                <View>
                    <View style={styles.ratingView}>
                        <View style={styles.ratingCard}>
                            <Progress.Circle progress={0.7}
                                color={colors.lightgreen}
                                size={26}
                                borderColor='transparent'
                            />
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={images.star}
                                    style={{ height: hp('1.5%'), width: hp('1.5%') }}
                                />
                            </View>
                        </View>
                        <Text style={styles.ratingText}>4.5 Rating</Text>
                    </View>
                    <View style={{ marginTop: hp('1%'), alignItems: 'flex-end' }}>
                        <Text style={styles.location}>Date</Text>
                        <Text style={styles.location}>18.10.2023</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HistoryCard;

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: colors.primary,
        marginBottom: hp('3%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#2B1F2F',
        borderRadius: 20,
        padding: hp('2%')
    },
    image: {
        height: hp('10%'),
        width: hp('10%')
    },
    text: {
        color: colors.white,
        fontSize: hp('2%'),
        fontWeight: 'bold',
    },
    textWrapper: {
        marginLeft: hp('2%'),
        marginTop: hp('0.5%')
    },
    location: {
        color: 'lightgrey',
        marginTop: hp('0.4%')
    },
    completedText: {
        color: colors.lightgreen,
        marginTop: hp('0.4%'),
        fontSize: hp('1.7%')
    },
    iconView: {
        backgroundColor: colors.white,
        marginRight: hp('1%'),
        height: hp('3.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: hp('3.5%')
    },
    ratingView: {
        backgroundColor: colors.orange,
        justifyContent: 'space-around',
        height: hp('4%'),
        width: '85%',
        flexDirection: 'row',
        borderRadius: 10,
    },
    ratingCard: {
        backgroundColor: colors.white,
        marginTop: hp('0.2%'),
        height: hp('3.5%'),
        borderRadius: 50,
        width: hp('3.5%')
    },
    imageWrapper: {
        position: 'absolute',
        left: 8,
        top: 8
    },
    ratingText: {
        color: colors.white,
        fontSize: hp('1.4%'),
        marginTop: hp('0.8%'),
        marginLeft: hp('0.4%')
    },
    wrapper: {
        flexDirection: 'row',
        position: 'absolute',
        right: 14,
        top: 15,
    }
})