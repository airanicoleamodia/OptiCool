import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigators/AuthNavigation'
import { useSelector } from 'react-redux';
import BottomTabs from './navigators/BottomTabs';

export default function Main() {

    const { isLogin, user, token } = useSelector(state => state.auth);

    return (

        <NavigationContainer>

            {isLogin ?
                <BottomTabs />
                :
                <AuthNavigation />
            }

        </NavigationContainer>

    )
}