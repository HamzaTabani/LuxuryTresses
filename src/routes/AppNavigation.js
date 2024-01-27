import Signup from '../screens/auth/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTP from '../screens/auth/OTP';
import Welcome from '../screens/auth/Welcome';
import InitialProfile from '../screens/auth/InitialProfile';
import Login from '../screens/auth/Login';
import ForgetPassword from '../screens/auth/ForgetPassword';
import ChangePassword from '../screens/auth/ChangePassword';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="initialprofile" component={InitialProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
