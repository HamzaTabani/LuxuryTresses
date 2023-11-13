import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import ProfileHeader from '../../components/ProfileHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import { historyImages } from '../../dummyData'
import images from '../../assets/images'
import colors from '../../assets/colors'
import ReviewCard from '../../components/ReviewCard'

const OrderHistory = () => {
    return (
        <Container>
            <ProfileHeader
                icon={true}
                text={'Omnis iste'}
                username={true}
            />
            <View style={styles.screen}>
                <View style={{ height: '100%' }}>
                    <Swiper
                        style={styles.wrapper}
                        paginationStyle={{ bottom: hp('78%') }}
                        autoplay
                        activeDotColor={'#D49621'}
                        dotStyle={{ borderWidth: 1, borderColor: colors.orange }}
                    >
                        {historyImages.map((item) => (
                            <Image
                                source={item.image}
                                borderRadius={15}
                                style={styles.image}
                            />
                        ))}
                    </Swiper>
                </View>
            </View>
        </Container>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%'),
        paddingTop: hp('2%')
    },
    wrapper: {
    },
    slideStyle: {
        alignItems: 'center',
    },
    image: {
        height: hp('25%'),
        width: '100%'
    }
})