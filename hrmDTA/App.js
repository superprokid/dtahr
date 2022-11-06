import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HOME_SCREEN, LOGIN_SCREEN, SPLASH_SCREEN } from './src/config/screen';
import SplashScreen from './src/view/SplashScreen';
import LoginScreen from './src/view/LoginScreen';
import CheckinScreen from './src/view/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={SPLASH_SCREEN}
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={LOGIN_SCREEN}
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Group
                    screenOptions={{ headerTitleAlign: 'center' }}>
                    <Stack.Screen
                        name={HOME_SCREEN}
                        component={CheckinScreen}
                        options={{ headerShown: false }}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


