import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const InputField = () => {
  return (
      <View style={styles.inputStyle}>   
        <TextInput 
            placeholder='Address'
            placeholderTextColor={colors.gray}
            style={styles.input}
        />
        </View>
  )
}

export default InputField

const styles = StyleSheet.create({
    inputStyle:{
        borderWidth: 1,
        width: '75%',
        borderColor: colors.white,
        borderRadius: 100,
    },
    input:{
        marginLeft: hp('2%'),
        color: colors.white,
        marginTop: hp('0.4%'),
        fontSize: hp('2%')
    }
})