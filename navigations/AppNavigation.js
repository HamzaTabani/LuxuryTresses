import {NavigationContainer} from '@react-navigation/native';
import Signup from '../screens/Auth/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTP from '../screens/Auth/OTP';
import TabNavigation from './TabNavigation';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="tabs" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
