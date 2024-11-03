import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import SendCode from '../../components/SendCode'
import { useSelector } from 'react-redux'

export default function ResetPasswordCode() {

    const { user } = useSelector(state => state.auth);

    return (
        <View style={{ flex: 1, }}>

            <View style={{ marginTop: 200 }}>
                <SendCode
                    recievingEmail={user.email}
                    isInputDisabled={true}
                    nextScreen={'Verification'}
                />
            </View>

        </View>
    )
}