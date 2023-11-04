import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const OTP = ({navigation}) => {
  return (
    <View>
      <Text> OTP </Text>
      <Button
        title="Go to Singup"
        onPress={() => navigation.navigate('tabs')}
      />
    </View>
  );
};

export default OTP;
const styles = StyleSheet.create({});
