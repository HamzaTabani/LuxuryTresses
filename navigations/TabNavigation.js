import Home from '../screens/TabScreen/Home';
import Setting from '../screens/TabScreen/Setting';
import Cart from '../screens/TabScreen/Cart';
import Location from '../screens/TabScreen/Location';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native';
import Profile from '../screens/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
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
          tabBarIcon: ({focused}) =>
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
          tabBarIcon: ({focused}) =>
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
          tabBarIcon: ({focused}) =>
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
          tabBarIcon: ({focused}) =>
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
