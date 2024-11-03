import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import ChangePasswordForm from '../../components/ChangePasswordForm'

export default function ChangePassword() {
    return (
        <View>

            <View style={{ marginTop: 50, }}>
                <ChangePasswordForm nextScreen='Login' />
            </View>

        </View>
    )
}