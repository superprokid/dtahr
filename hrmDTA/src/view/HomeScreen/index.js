import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './style';
import colors from '../../assets/colors';
import { CHECKIN_SCREEN, HISTORY_SCREEN, LEAVE_SCREEN, OVERTIME_SCREEN } from '../../config/screen';
import Checin from '../CheckinScreen';
import HistoryScreen from '../HistoryScreen';
import LeaveMainScreen from '../LeaveMainScreen';
import OverTimeMainScreen from '../OverTimeScreen';

const Tab = createBottomTabNavigator();

export default Home = () => {


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primaryColor,
                tabBarInactiveTintColor: colors.secondaryColor,
                tabBarStyle: styles.bottom_tab,
                tabBarShowLabel: true,
                headerShown: false
            }}>
            <Tab.Screen
                name={CHECKIN_SCREEN}
                component={Checin}
                options={{
                    tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/dashboard.png')} style={{ width: 25, height: 25, tintColor: color }} />,
                    tabBarLabel: 'Checin',
                    headerShown: true,
                    headerTitle: "Check in",
                    headerTitleAlign: 'center'
                }} />
            <Tab.Screen
                name={HISTORY_SCREEN}
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/history.png')} style={{ width: 25, height: 25, tintColor: color }} />,
                    tabBarLabel: 'My Page',
                    headerShown: true,
                    headerTitle: "History",
                    headerTitleAlign: 'center'
                }} />
            <Tab.Screen
                name={OVERTIME_SCREEN}
                component={OverTimeMainScreen}
                options={{
                    tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/history.png')} style={{ width: 25, height: 25, tintColor: color }} />,
                    tabBarLabel: 'OverTime',
                    headerShown: false,
                    // headerTitle: "History",
                    // headerTitleAlign: 'center'
                }} />
            <Tab.Screen
                name={LEAVE_SCREEN}
                component={LeaveMainScreen}
                options={{
                    tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/leave.png')} style={{ width: 25, height: 25, tintColor: color }} />,
                    tabBarLabel: 'Leave',
                    headerShown: false,
                    // headerTitle: "History",
                    // headerTitleAlign: 'center'
                }} />
        </Tab.Navigator>
    );
}