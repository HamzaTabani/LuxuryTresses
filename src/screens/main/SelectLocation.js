import {StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import MapHeader from '../../components/MapHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LocationCard from '../../components/LocationCard';
import colors from '../../assets/colors';
import {initialRegion} from '../../dummyData';
import images from '../../assets/images';

const SelectLocation = () => {
  const [currentRegion, setCurrentregion] = useState(null);
  const mapRef = useRef(null);
  let circleRadius = 1500;
  console.log('initialRegion: ', initialRegion);
  console.log('currentRegion---: ', currentRegion);
  const dataReigions = data => {
    setCurrentregion(data);
  };

  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.008 * (15 / 20),
      },
      2000,
    );
  }
  return (
    <>
      {currentRegion != null ? (
        <MapView
          ref={mapRef}
          initialRegion={currentRegion}
          //   onRegionChangeComplete={currentRegion}
          mapType="terrain"
          style={styles.mapStyle}>
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
            image={images.locationMarker}
          />
          <Circle
            center={currentRegion}
            strokeWidth={0.5}
            radius={circleRadius}
            fillColor="rgba(239, 229, 204, 0.3)"
            strokeColor={colors.orange}
          />
        </MapView>
      ) : (
        <MapView
          initialRegion={initialRegion}
          mapType="terrain"
          style={styles.mapStyle}>
          {/* <Marker
          coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude}}
          image={images.locationMarker}
        />
        <Circle
          center={{latitude: currentRegion.latitude, longitude: currentRegion.longitude}}
          strokeWidth={0.5}
          radius={circleRadius}
          fillColor="rgba(239, 229, 204, 0.3)"
          strokeColor={colors.orange}
        /> */}
        </MapView>
      )}
      <MapHeader />
      <LocationCard
        reigions={dataReigions}
        mapRef={mapRef}
        moveToLocation={(lat, long) => moveToLocation(lat, long)}
      />
    </>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  mapStyle: {
    height: '100%',
    width: '100%',
  },
  workingmapView: {
    position: 'absolute',
  },
  radiusWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  mapRadius: {
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.orange,
    position: 'absolute',
    padding: hp('15%'),
    backgroundColor: 'rgba(239, 229, 204, 0.3)',
  },
});
