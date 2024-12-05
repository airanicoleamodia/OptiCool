import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure this is only here once
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';
import AuthNavigation from './navigators/AuthNavigation';
import BottomTabs from './navigators/BottomTabs';
import { StatusBar } from 'react-native';
import MenuNavigation from './navigators/MenuNavigations';
import NotifScreen from './screens/MenuScreens/NotifScreen';

const Stack = createStackNavigator();

export default function Main() {
    const { isLogin } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            {isLogin ? (
                <>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >

                        {/* <MenuNavigation />
                        <BottomTabs /> */}

                        <Stack.Screen name='BottomTabs' component={BottomTabs} />
                        <Stack.Screen name='NotifScreen' component={NotifScreen} />

                    </Stack.Navigator>
                </>
            ) : (
                <AuthNavigation />
            )}
        </NavigationContainer>
    );
}
