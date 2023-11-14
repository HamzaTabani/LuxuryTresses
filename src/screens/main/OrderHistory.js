import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import ProfileHeader from '../../components/ProfileHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import { historyImages } from '../../dummyData'
import colors from '../../assets/colors'
import UserDetailCard from '../../components/UserDetailCard'

const OrderHistory = () => {
    return (
        <Container>
            <ProfileHeader
                icon={true}
                text={'Omnis iste'}
                username={true}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <View style={{ height: '15%' }}>
                    <Swiper
                        paginationStyle={{ bottom: hp('77%') }}
                        // autoplay
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
                <View style={{ paddingTop: hp('3%') }}>
                    <UserDetailCard />
                </View>
                <View style={{ paddingTop: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Status</Text>
                    <View style={styles.deliveredView}>
                        <Text style={styles.deliveredText}>Delivered</Text>
                    </View>
                </View>
                <View style={styles.line} />
                <Text style={styles.descriptionText}>Description</Text>
                <Text style={styles.textStyle}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem{'\n'}{'\n'} accusantium doloremque laudantium, totam rem aperiam, {'\n'}{'\n'} eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Text>
                <View style={styles.cardStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.price}>$24.00</Text>
                        <Text style={styles.quantityText}>Quantity:   <Text style={{ color: colors.white, fontSize: hp('2%'), fontWeight: 'bold' }}>2</Text></Text>
                    </View>
                    <View style={styles.line2} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('2.5%') }}>
                        <Text style={[styles.text,{fontSize: hp('2%')}]}>Tax</Text>
                        <Text style={styles.quantityText}>5.000</Text>
                    </View>
                    <View style={styles.line2} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('2.5%') }}>
                        <Text style={[styles.text,{fontSize: hp('2%')}]}>Total</Text>
                        <Text style={styles.price}>$24.00</Text>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%'),
        paddingTop: hp('2%')
    },
    slideStyle: {
        alignItems: 'center',
    },
    image: {
        height: hp('25%'),
        width: '100%'
    },
    text: {
        color: colors.white,
        fontSize: hp('2.5%')
    },
    deliveredView: {
        borderWidth: 1,
        borderRadius: 40,
        width: '30%',
        padding: hp('1%'),
        borderColor: colors.orange,
        alignSelf: 'center',
        alignItems: 'center'
    },
    deliveredText: {
        color: colors.orange
    },
    line: {
        borderBottomWidth: 0.4,
        marginTop: hp('4%'),
        borderBottomColor: colors.orange
    },
    descriptionText: {
        color: colors.white,
        marginTop: hp('3%'),
        fontWeight: 'bold',
        fontSize: hp('2.5%')
    },
    textStyle: {
        color: colors.white,
        marginTop: hp('2%')
    },
    cardStyle: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.gray,
        padding: hp('2%'),
        marginTop: hp('5%')
    },
    price: {
        color: colors.orange,
        marginLeft: hp('1%'),
        fontSize: hp('2.4%'),
        fontWeight: 'bold'
    },
    quantityText: {
        color: colors.white,
        alignSelf: 'center'
    },
    line2: {
        borderBottomColor: colors.white,
        marginTop: hp('2%'),
        borderBottomWidth: 0.5
    }
})