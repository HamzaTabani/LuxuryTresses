import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import TabNavigation from './TabNavigation';
import AppStatusBar from '../components/AppStatusBar';

const Stack = createNativeStackNavigator();

const Routes = () => {
<<<<<<< HEAD
    return (
        <>
            <AppStatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='AppNavigation' component={AppNavigation} />
                    <Stack.Screen name='TabNavigation' component={TabNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
=======
  return (
    <>
      <AppStatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="AppNavigation" component={AppNavigation} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
>>>>>>> 1ebc4971bf79a33a7f7568e53f4ceeb1e2b4d3bb

export default Routes;

const styles = StyleSheet.create({});
