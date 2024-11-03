import { View, Text, SafeAreaView, StyleSheet, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 65,
        lineHeight: 38,
        fontSize: 30,
        borderWidth: 2,
        borderColor: '#00000060',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 6;

export default function VerifyCode({
    nextScreen = '',
}) {

    const { token, user } = useSelector(state => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const sendCode = async () => {

        setIsSubmitting(true)

        try {

            const { data } = await axios.get(`${baseURL}/users/sendcode/${user._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setIsSubmitting(false)
            setValue('');

            Alert.alert('', data.message);

        } catch (error) {
            setIsSubmitting(false)
            console.error(error);
        }
    }

    const submitCode = async () => {
        try {

            setIsSubmitting(true)

            try {

                const { data } = await axios.post(`${baseURL}/users/verifycode/${user._id}`,
                    {
                        code: value
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })

                setIsSubmitting(false)

                Alert.alert('', data.message);

                navigation.navigate(nextScreen);

            } catch (error) {
                setIsSubmitting(false)
                const message = error?.response?.data?.message
                if (message) {
                    Alert.alert('', message);
                };
                console.log(error);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ paddingHorizontal: 15, gap: 20 }}>

            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />

            <Button
                onPress={sendCode}
                disabled={isSubmitting}
            >
                Resend Code
            </Button>
            <Button
                onPress={submitCode}
                mode='contained'
                disabled={isSubmitting}
                loading={isSubmitting}
            >
                Submit
            </Button>

        </View>
    )
}