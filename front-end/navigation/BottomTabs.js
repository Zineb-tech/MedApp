import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/doctorPortal/HomeScreen';
import Profile from '../screens/doctorPortal/Profile';
import Booking from '../screens/doctorPortal/Booking';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName='HomeScreen'
    screenOptions={{
      activeTintColor: Colors.primary, 
      inactiveTintColor: Colors.titleColor,
      labelStyle: {
        fontSize: 12, 
        fontWeight: 'bold', 
      },
    }}
>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown: false,

        tabBarIcon: ({ color }) => (
          <Icon name="home" size={20} color={color} />
        )
      }}
      />
      <Tab.Screen name="Profile" component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon name="user" size={20} color={color} />
        )
      }}/>
      <Tab.Screen name="Booking" component={Booking}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Icon name="calendar" size={20} color={color} />
        )
      }}/>
     
    </Tab.Navigator>
  );
}




