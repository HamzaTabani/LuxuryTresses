import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Back from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PayMethodCard = ({ image, cardname, number }) => {
  return (
    <View style={styles.chatHeader}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardView}>
          <Image source={image} resizeMode="cover" style={styles.imageStyle}
          />
          {/* online status button */}
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{cardname}</Text>
          <Text style={styles.cardNumber}>{number}</Text>
        </View>
      </View>
      <View style={styles.iconView}>
        <Back name={'arrow-forward'} color={colors.orange} size={20} />
      </View>
    </View>
  )
}

export default PayMethodCard

const styles = StyleSheet.create({
  chatHeader: {
    height: 80,
    width: '100%',
    borderRadius: 15,
    borderWidth: 0.3,
    borderColor: '#D49621',
    padding: 3,
    flexDirection: 'row',
    backgroundColor: '#000015',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  iconView: {
    backgroundColor: '#000015',
    margin: 3,
    paddingHorizontal: 10,
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D49621',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  cardNumber: {
    color: '#efefef',
    fontSize: hp('1.5%'),
    marginTop: 2,
  },
  cardView: {
    width: 70,
    height: 70,
  },
  cardWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
  text: {
    color: colors.white,
    fontSize: hp('2.0%')
  },
  textWrapper: {
    justifyContent: 'center'
  }
})