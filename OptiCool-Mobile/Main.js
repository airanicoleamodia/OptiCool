import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure this is only here once
import { useSelector } from 'react-redux';
import AuthNavigation from './navigators/AuthNavigation';
import BottomTabs from './navigators/BottomTabs';
import { StatusBar } from 'react-native';

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
                <BottomTabs />
            ) : (
                <AuthNavigation />
            )}
        </NavigationContainer>
    );
}
