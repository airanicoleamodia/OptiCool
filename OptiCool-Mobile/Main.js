import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure this is only here once
import { useSelector } from 'react-redux';
import AuthNavigation from './navigators/AuthNavigation';
import BottomTabs from './navigators/BottomTabs';

export default function Main() {
    const { isLogin } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>
            {isLogin ? (
                <BottomTabs />
            ) : (
                <AuthNavigation />
            )}
        </NavigationContainer>
    );
}
