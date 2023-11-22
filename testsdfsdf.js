import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Home = props => {
  const {t, i18n} = props.screenProps;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          margin: 20,
          fontSize: 30,
        }}>
        {t('Hey Yo Im at home')} //Here I am passing the string to translator
        function
      </Text>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('en')} //Here I change the language to "en" English
          style={Styles.button}>
          <Text style={{color: '#fff'}}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('es')} //Here I change the language to "es" Spanish
          style={Styles.button}>
          <Text style={{color: '#fff'}}>ES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
