import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigators/AuthNavigation'
import { useSelector } from 'react-redux';
import Dashboard from './screens/Dashboard';

export default function Main() {

    const { isLogin, user, token } = useSelector(state => state.auth);

    console.log(token)
    console.log(user);

    return (

        <NavigationContainer>

            {isLogin ?
                <Dashboard />
                :
                <AuthNavigation />
            }

        </NavigationContainer>

    )
}