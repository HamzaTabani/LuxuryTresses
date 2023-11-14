import { StyleSheet, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapHeader from '../../components/MapHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LocationCard from '../../components/LocationCard'
import colors from '../../assets/colors'

const SelectLocation = () => {
    return (
        <View>
            <MapView
                initialRegion={{
                    latitude: 44.466621,
                    longitude: -70.250395,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType='terrain'
                style={styles.mapStyle}
            >
                <Marker
                    coordinate={{ latitude: 44.463691, longitude: -70.250495 }}
                />
            </MapView>
            <MapHeader />
            <View style={styles.radiusWrapper}>
                <View style={styles.mapRadius} />
            </View>
            <LocationCard />
        </View>
    )
}

export default SelectLocation

const styles = StyleSheet.create({
    mapStyle: {
        height: '100%',
        width: '100%'
    },
    workingmapView: {
        position: 'absolute'
    },
    radiusWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0
    },
    mapRadius: {
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.orange,
        position: 'absolute',
        padding: hp('15%'),
        backgroundColor: 'rgba(239, 229, 204, 0.3)'
    },
})