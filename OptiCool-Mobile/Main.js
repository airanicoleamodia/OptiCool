import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure this is only here once
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux';
import AuthNavigation from './navigators/AuthNavigation';
import BottomTabs from './navigators/BottomTabs';
import { StatusBar } from 'react-native';
import MenuNavigation from './navigators/MenuNavigations';
import NotifScreen from './screens/MenuScreens/NotifScreen';
import UpdateProfile from './screens/UserScreens/UpdateProfile';
import AdminDashboard from './screens/AdminScreens/AdminDashboard';
import ActiveUsers from './screens/AdminScreens/ActiveUsers';
import ActivityLog from './screens/AdminScreens/ActivityLog';
import HelpCenter from './screens/AdminScreens/HelpCenter';
import UsersAll from './screens/AdminScreens/UsersAll';

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
                        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                        <Stack.Screen name="ActiveUsers" component={ActiveUsers} />
                        <Stack.Screen name="ActivityLog" component={ActivityLog} />
                        <Stack.Screen name="UsersAll" component={UsersAll} />
                        <Stack.Screen name="HelpCenter" component={HelpCenter} />

                    </Stack.Navigator>
                </>
            ) : (
                <AuthNavigation />
            )}
        </NavigationContainer>
    );
}
