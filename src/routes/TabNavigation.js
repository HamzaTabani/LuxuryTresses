import Home from '../screens/main/Home';
import Setting from '../screens/main/Setting';
import Cart from '../screens/main/Cart';
import Location from '../screens/main/Location';
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
import StylistDetails from '../screens/main/StylistDetails';
import Chat from '../screens/main/Chat';
import RecentProducts from '../screens/main/RecentProducts';
import TopStylists from '../screens/main/TopStylists';
import SingleProduct from '../screens/main/SingleProduct';
import Checkout from '../screens/main/Checkout';
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
      <Tab.Screen name="StylistDetails" component={StylistDetails} />
      <Tab.Screen name="RecentProducts" component={RecentProducts} />
      <Tab.Screen name="TopStylists" component={TopStylists} />
      <Tab.Screen name="SingleProduct" component={SingleProduct} />
    </Stack.Navigator>
  );
};

const SecondaryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Checkout" component={Checkout} />
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
                  padding: 15,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
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
        name="location"
        component={Location}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: 15,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
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
        name="cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: 15,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
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
        name="settings"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  padding: 15,
                  backgroundColor: '#291E20',
                  borderRadius: 50,
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
