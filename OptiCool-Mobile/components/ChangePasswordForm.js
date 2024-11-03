import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';
import { removeAuth } from '../states/authSlice';

export default function ChangePasswordForm({
    nextScreen = '',
}) {

    const { token, user } = useSelector(state => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const changePassword = async () => {

        setIsSubmitting(true)

        if (newPassword !== confirmPassword) {
            setIsSubmitting(false)
            return Alert.alert('Password does not match');
        }

        try {

            const { data } = await axios.put(`${baseURL}/users/update/${user._id}`, {
                password: newPassword,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setIsSubmitting(false)
            Alert.alert('', 'Password changed, please login')
            dispatch(removeAuth());

        } catch (err) {
            setIsSubmitting(false)
            console.log(err);
        }
    }

    return (
        <View style={{ gap: 30, paddingHorizontal: 10, }}>

            <Avatar.Icon
                icon={'lock'}
                style={{ alignSelf: 'center' }}
                size={75}
            />

            <TextInput
                placeholder='New password'
                textContentType='new password'
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
            />

            <TextInput
                placeholder='Confirm password'
                textContentType='new password'
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
            />

            <Button
                mode='contained'
                disabled={isSubmitting}
                loading={isSubmitting}
                onPress={changePassword}
            >
                Submit
            </Button>

        </View>
    )
}