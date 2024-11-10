import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from '../screens/UserScreens/WelcomePage';
import Login from '../screens/UserScreens/Login';
import Register from '../screens/UserScreens/Register';

const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName="WelcomePage">
            {/* Welcome Page */}
            <Stack.Screen
                name="WelcomePage"
                component={WelcomePage}
                options={{ headerShown: false }}
            />

            {/* Login Page */}
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            {/* Register Page */}
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
