import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import TabNavigation from './TabNavigation';
import AppStatusBar from '../components/AppStatusBar';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Routes = () => {

  const { token } = useSelector(state => state.userData)

  return (
    <>
      <AppStatusBar />
      <NavigationContainer
        theme={{ colors: { background: 'transparent' } }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {token ?
            <Stack.Screen name="TabNavigation" component={TabNavigation} />
            :
            <Stack.Screen name="AppNavigation" component={AppNavigation} />

          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;

const styles = StyleSheet.create({});
