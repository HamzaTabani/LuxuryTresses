import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import ProfileHeader from '../../components/ProfileHeader'
import images from '../../assets/images'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import Container from '../../components/Container'
import ReviewCard from '../../components/ReviewCard'
import { stylistImages } from '../../dummyData'
import TimingCard from '../../components/TimingCard'
import PrimaryButton from '../../components/PrimaryButton'
import OutlineButton from '../../components/OutlineButton'
import MessageOption from '../../components/MessageOption'

const StylistDetails = () => {
    return (
        <Container>
            <ProfileHeader username={true}
                icon={true}
                text={'Omnis iste'}
            />
            <ScrollView contentContainerStyle={styles.screen}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.wrapper}>
                    <Image
                        source={images.stylist1}
                        style={styles.imageStyle}
                        borderRadius={20}
                    />
                    <View style={styles.textWrapper}>
                        <Text style={styles.name}>Omnis Iste</Text>
                        <Text style={styles.location}>1609 Oak, St. <Text style={{ color: colors.white, fontWeight: 'bold' }}>(2km)</Text></Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image
                                    source={images.tab1}
                                />
                            </View>
                            <View style={[styles.iconView, { marginLeft: hp('1%') }]}>
                                <Image
                                    source={images.tab2}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: hp('7%') }}>
                        <Image
                            source={images.stylist2}
                            style={styles.exploreImage}
                            borderRadius={10}
                        />
                        <Text style={styles.exploreText}>Explore</Text>
                    </View>
                </View>
                <View style={{ paddingTop: hp('5%') }}>
                    <ReviewCard />
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>About Omnis iste</Text>
                        <Text style={styles.message}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem {'\n'}{'\n'} accusantium doloremque laudantium, totam rem aperiam, eaque {'\n'}{'\n'} ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        {stylistImages.map((item) => (
                            <>
                                <Image
                                    source={item.image}
                                    borderRadius={15}
                                    blurRadius={item.id == 4 ? 25 : 0}
                                    style={styles.image}
                                />
                                <Text style={styles.moreText}>{item.id == 4 && 'More'}</Text>
                            </>
                        ))}
                    </View>
                    <View style={{ paddingTop: hp('4%') }}>
                        <TimingCard />
                        <View style={{ paddingTop: hp('5%'), flexDirection: 'row' }}>
                            <OutlineButton
                                title={'BOOK NOW'}
                                buttonStyle={{ width: '80%' }}
                                textStyle={{ color: colors.white }}
                            />
                           <View style={{marginLeft: hp('2%')}}> 
                            <MessageOption />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

export default StylistDetails

const styles = StyleSheet.create({
    screen: {
        padding: hp('2%'),
        paddingBottom: hp('22%'),
        paddingTop: hp('4%')
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        height: hp('18%'),
        width: '38%'
    },
    textWrapper: {
        paddingTop: hp('5%')
    },
    name: {
        color: colors.white,
        fontSize: hp('2.4%'),
        fontWeight: 'bold'
    },
    location: {
        color: colors.white,
        marginTop: hp('1%')
    },
    iconView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        marginTop: hp('1.4%'),
        height: hp('4%'),
        width: hp('4%'),
        borderRadius: 50
    },
    exploreImage: {
        height: hp('8%'),
        width: hp('9%')
    },
    exploreText: {
        marginTop: hp('1%'),
        color: colors.white,
        fontSize: hp('2%'),
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    heading: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    textContainer: {
        paddingTop: hp('3%'),
        marginLeft: hp('1%')
    },
    message: {
        marginTop: hp('2%'),
        color: colors.white
    },
    image: {
        height: hp('10%'),
        width: hp('10%')
    },
    imageWrapper: {
        paddingTop: hp('5%'),
        flexDirection: 'row',
        gap: 10,
    },
    moreText: {
        color: colors.white,
        position: 'absolute',
        right: hp('3.6%'),
        fontWeight: 'bold',
        top: hp('8.5%'),
        fontSize: hp('2%')
    },
})