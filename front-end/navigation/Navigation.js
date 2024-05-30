import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';
import PendingApprovalScreen from '../screens/Auth/PendingApprovalScreen';
import Home from '../screens/Home';
import BottomTabs from './BottomTabs';
import AddTreatment from '../screens/doctorPortal/Prescription/AddTreatment';
import PatientInf from '../screens/doctorPortal/component/PatientInf';
import TreatmentList from '../screens/doctorPortal/Prescription/TreatmentList';
export default function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PendingApprovalScreen" component={PendingApprovalScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="AddTreatment" component={AddTreatment} options={{ headerShown: false }}/>
        <Stack.Screen name="TreatmentList" component={TreatmentList} />
        <Stack.Screen name="PatientInf" component={PatientInf} options={{ headerShown: false }}/>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
