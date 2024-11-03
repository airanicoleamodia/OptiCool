import { View, Text, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';
import { useSelector } from 'react-redux';

export default function SendCode({ nextScreen = '', recievingEmail = '', isInputDisabled = false }) {

    const [email, setEmail] = useState();
    const { token, user } = useSelector(state => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            console.log(recievingEmail);
            setEmail(recievingEmail);
        }, [])
    )

    const sendCode = async () => {

        setIsSubmitting(true)

        try {

            const { data } = await axios.get(`${baseURL}/users/sendcode/${user._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setIsSubmitting(false)

            Alert.alert('Reset Password', data.message);

            navigation.navigate(nextScreen);

        } catch (error) {
            setIsSubmitting(false)
            console.error(error);
        }
    }


    return (
        <View style={{ gap: 20, paddingHorizontal: 10 }}>
            <TextInput
                value={email}
                dense
                label={'Email'}
                readOnly={isInputDisabled}
                disabled={isInputDisabled}
            />
            <Button
                mode='contained'
                loading={isSubmitting}
                onPress={sendCode}
                disabled={isSubmitting}
            >
                Send Code
            </Button>
        </View>
    )
}