import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { OVERTIME_REGISTER_TAB, OVERTIME_TICKET_TAB } from '../../config/screen';
import OverTimeRegisterScreen from './OverTimeRegisterScreen';
import OverTimeTicketScreen from './OverTimeTicketScreen';
import Animated from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const OverTimeMainScreen = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { marginTop: StatusBar.currentHeight }
      }}
    >
      <Tab.Screen name={OVERTIME_REGISTER_TAB} options={{ tabBarLabel: "Overtime Register" }} component={OverTimeRegisterScreen} />
      <Tab.Screen name={OVERTIME_TICKET_TAB} options={{ tabBarLabel: "Overtime Ticket" }} component={OverTimeTicketScreen} />
    </Tab.Navigator>
  );
}

export default OverTimeMainScreen;