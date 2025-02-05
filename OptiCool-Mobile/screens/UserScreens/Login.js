import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Text, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { setAuth } from "../../states/authSlice";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, setSubmitting) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, values);

      dispatch(
        setAuth({
          user: data.user,
          token: data.token,
        })
      );

      setLoading(false);
      setSubmitting(false);
      navigation.navigate("Home"); // Navigate to Home screen after login
    } catch (err) {
      setLoading(false);
      setSubmitting(false);
      console.info(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/lock.png")} style={styles.logo} />
      <Text
        variant="headlineSmall"
        style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}
      >
        Welcome back!
      </Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
          setSubmitting,
        }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
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
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && !!errors.password}
            />
            <HelperText
              type="error"
              visible={touched.password && errors.password}
            >
              {errors.password}
            </HelperText>

            <Button
              mode="contained"
              onPress={() => {
                setSubmitting(true);
                handleSubmit();
              }}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText} // Apply custom text styling
            >
              Login
            </Button>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                paddingHorizontal: 5,
                marginTop: 15,
              }}
            >
              <Text style={{ alignSelf: "center" }}>
                Already have an account?
              </Text>
              <Text
                variant="labelLarge"
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Text>
            </View>
          </>
        )}
      </Formik>
      <Spinner
        visible={loading}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e2e2e7",
  },
  logo: {
    width: 100,
    height: 150,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: -150,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#000000', // Black background
    borderRadius: 9, // Remove rounding for squarish look
    paddingVertical: 8, // Adjust padding for better size
  },
  submitButtonText: {
    color: '#FFFFFF', // White font color
    fontWeight: 'bold', // Bold for emphasis
    textTransform: 'uppercase', // Optional for all caps
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  spinnerTextStyle: {
    color: '#aed6f2',
  },
});
