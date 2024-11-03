import { View, Text } from 'react-native'
import React from 'react'
import VerifyCode from '../../components/VerifyCode'

export default function Verification() {
    return (
        <View>

            <View style={{ marginTop: 100 }}>
                <VerifyCode nextScreen='ChangePassword' />
            </View>

        </View>
    )
}