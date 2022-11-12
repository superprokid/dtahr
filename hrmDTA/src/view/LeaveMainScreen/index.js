import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { LEAVE_REGISTER_TAB, LEAVE_TICKET_TAB } from '../../config/screen';
import LeaveRegisterScreen from './LeaveRegisterScreen';
import LeaveTicketScreen from './LeaveTicketScreen';
import Animated from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const LeaveMainScreen = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { marginTop: StatusBar.currentHeight }
      }}
    >
      <Tab.Screen name={LEAVE_REGISTER_TAB} options={{ tabBarLabel: "Leave Register" }} component={LeaveRegisterScreen} />
      <Tab.Screen name={LEAVE_TICKET_TAB} options={{ tabBarLabel: "Leave Ticket" }} component={LeaveTicketScreen} />
    </Tab.Navigator>
  );
}

export default LeaveMainScreen;