import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors'

const Loader = ({size,style}) => {
  return (
            <ActivityIndicator
                color={colors.orange}
                size={size}
                style={[{alignSelf: 'center'}, style]}
            />
  )
}

export default Loader

const styles = StyleSheet.create({})