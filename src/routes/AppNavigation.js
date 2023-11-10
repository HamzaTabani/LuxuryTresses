import { NavigationContainer } from '@react-navigation/native';
import Signup from '../screens/auth/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from '../screens/auth/OTP';
import Welcome from '../screens/auth/Welcome';
import InitialProfile from '../screens/auth/InitialProfile';
// import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="initialprofile" component={InitialProfile} />
        {/* <Stack.Screen name="profile" component={Profile}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
