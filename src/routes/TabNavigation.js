import Home from '../screens/main/Home';
import Cart from '../screens/main/Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';
import Profile from '../screens/main/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Trendings from '../screens/main/Trendings';
import Recents from '../screens/main/Recents';
import Popular from '../screens/main/Populars';
import Nearby from '../screens/main/Nearby';
import ProfileDetail from '../screens/main/ProfileDetail';
import Chat from '../screens/main/Chat';
import RecentProducts from '../screens/main/RecentProducts';
import TopStylists from '../screens/main/TopStylists';
import SingleProduct from '../screens/main/SingleProduct';
import Checkout from '../screens/main/Checkout';
import PaymentMethod from '../screens/main/PaymentMethod';
import Reviews from '../screens/main/Reviews';
import Booking from '../screens/main/Booking';
import OrderHistory from '../screens/main/OrderHistory';
import SelectLocation from '../screens/main/SelectLocation';
import InitialProfile from '../screens/auth/InitialProfile';
import ChangePassword from '../screens/auth/ChangePassword';
import AddNewCard from '../screens/main/AddNewCard';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="trendings" component={Trendings} />
      <Tab.Screen name="recents" component={Recents} />
      <Tab.Screen name="populars" component={Popular} />
      <Tab.Screen name="Nearby" component={Nearby} />
      <Tab.Screen name="ProfileDetail" component={ProfileDetail} />
      <Tab.Screen name="RecentProducts" component={RecentProducts} />
      <Tab.Screen name="TopStylists" component={TopStylists} />
      <Tab.Screen name="SingleProduct" component={SingleProduct} />
      <Tab.Screen name="Reviews" component={Reviews} />
      <Tab.Screen name="Booking" component={Booking} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="InitialProfile" component={InitialProfile} />
    </Stack.Navigator>
  )
}


const SecondaryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Checkout" component={Checkout} />
      <Tab.Screen name="PaymentMethod" component={PaymentMethod} />
      <Tab.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name='AddNewCard' component={AddNewCard} />
    </Stack.Navigator>
  )
}


const TabNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='BottomStack' component={BottomStack} />
      <Stack.Screen name='SecondaryStack' component={SecondaryStack} />
    </Stack.Navigator>
  )
}

const BottomStack = () => {
  return (
    <Tab.Navigator

      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 80,
          backgroundColor: '#0C0A22',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          bottom: 0,
          left: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="homestack"
        component={HomeStacks}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                <FontAwesome5
                  name="home"
                  type="Octicons"
                  color="#D49621"
                  size={22}
                />
              </View>
            ) : (
              <View>
                <FontAwesome5
                  name="home"
                  type="Octicons"
                  color="#D49621"
                  size={22}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={Nearby}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                <Feather
                  name="map-pin"
                  type="Feather"
                  color="#D49621"
                  size={25}
                />
              </View>
            ) : (
              <View>
                <Feather
                  name="map-pin"
                  type="Feather"
                  color="#D49621"
                  size={25}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                <Feather
                  name="shopping-cart"
                  type="Feather"
                  color="#D49621"
                  size={22}
                />
              </View>
            ) : (
              <View>
                <Feather
                  name="shopping-cart"
                  type="Feather"
                  color="#D49621"
                  size={22}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                <AntDesign
                  name="setting"
                  type="AntDesign"
                  color="#D49621"
                  size={22}
                />
              </View>
            ) : (
              <View>
                <AntDesign
                  name="setting"
                  type="AntDesign"
                  color="#D49621"
                  size={22}
                />
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
