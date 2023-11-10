import Signup from '../screens/auth/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from '../screens/auth/OTP';
import Welcome from '../screens/auth/Welcome';
import InitialProfile from '../screens/auth/InitialProfile';
import Profile from '../screens/main/Profile';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
<<<<<<< HEAD
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="otp" component={OTP} />
      <Stack.Screen name="initialprofile" component={InitialProfile} />
      {/* <Stack.Screen name="profile" component={Profile}/> */}
    </Stack.Navigator>
=======
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="initialprofile" component={InitialProfile} />
        <Stack.Screen name="profile" component={Profile}/>
      </Stack.Navigator>
>>>>>>> 1ebc4971bf79a33a7f7568e53f4ceeb1e2b4d3bb
  );
};

export default AppNavigation;
