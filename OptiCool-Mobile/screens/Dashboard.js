import { View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';
import { removeAuth } from '../states/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {

    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <View>
                <Text variant='titleLarge'>Dashboard</Text>
                <Button mode='outlined' onPress={() => dispatch(removeAuth())}>Logout</Button>
            </View>
        </SafeAreaView>
    )
}