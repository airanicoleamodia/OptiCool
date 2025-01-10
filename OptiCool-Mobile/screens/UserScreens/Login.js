import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, HelperText, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { setAuth } from '../../states/authSlice';
import { useDispatch } from 'react-redux';

export default function Login({ navigation }) {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });


    const handleSubmit = async (values, setSubmitting) => {
        try {

            const { data } = await axios.post(`${baseURL}/users/login`, values);

            dispatch(setAuth({
                user: data.user,
                token: data.token,
            }))

            Alert.alert('Account logged in!')

            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
            console.info(err)
        }
    };

    return (
        <View style={styles.container}>
            <Text variant='headlineSmall' style={{ textAlign: 'center', marginBottom: 20, fontSize: 20 }}>Welcome back!</Text>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    setSubmitting
                }) => (
                    <>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={touched.email && !!errors.email}
                        />
                        <HelperText type="error" visible={touched.email && errors.email}>
                            {errors.email}
                        </HelperText>

                        <TextInput
                            label="Password"
                            mode="outlined"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={touched.password && !!errors.password}
                        />
                        <HelperText type="error" visible={touched.password && errors.password}>
                            {errors.password}
                        </HelperText>

                        <Button
                            mode="contained"
                            onPress={() => {
                                setSubmitting(true)
                                handleSubmit()
                            }}
                            style={styles.submitButton}
                        >
                            Login
                        </Button>
                        <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: 5, marginTop: 15 }}>
                            <Text style={{ alignSelf: 'center' }}>Already have an account?</Text>
                            <Text variant='labelLarge' onPress={() => navigation.navigate('Register')}>Register</Text>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#e2e2e7', 
    },
    submitButton: {
        marginTop: 0,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});