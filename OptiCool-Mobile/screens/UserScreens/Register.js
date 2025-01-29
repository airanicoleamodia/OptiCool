import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import {
  Avatar,
  Button,
  Text,
  HelperText,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

export default function Register({ navigation }) {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarSelection = async () => {
    if (avatar) {
      // If an image is already selected, remove it
      setAvatar(null);
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    // avatar: Yup.object().required('Avatar is required'),
  });

  const register = async (formData) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Account created!", "Login your account");

      navigation.navigate("Login");
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const submit = async (userData, setSubmitting) => {
    const formData = new FormData();

    const newImageUri = "file:///" + avatar?.split("file:/").join("");

    userData.avatar = {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri?.split("/").pop(),
    };

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await register(formData);

    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          avatar: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldError,
          setSubmitting,
          isSubmitting,
        }) => (
          <>
            {/* Display the avatar preview if an image is selected */}
            {avatar !== null ? (
              <Avatar.Image
                source={{ uri: avatar }}
                size={125}
                style={styles.avatarPreview}
              />
            ) : (
              <Avatar.Icon
                icon={"account"}
                size={125}
                style={styles.avatarPreview}
              />
            )}

            <Button
              icon={avatar ? "delete" : "camera"}
              mode="outlined"
              onPress={() => {
                handleAvatarSelection();
                setFieldError("avatar", null);
              }}
              labelStyle={{ color: "#000000" }} // Set text color to black
            >
              {avatar ? "Remove Avatar" : "Select Avatar"}
            </Button>

            <HelperText type="error" visible={touched.avatar && errors.avatar}>
              {errors.avatar}
            </HelperText>

            <TextInput
              label="Username"
              mode="outlined"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={touched.username && !!errors.username}
            />
            <HelperText
              type="error"
              visible={touched.username && errors.username}
            >
              {errors.username}
            </HelperText>

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

            <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              error={touched.confirmPassword && !!errors.confirmPassword}
            />
            <HelperText
              type="error"
              visible={touched.confirmPassword && errors.confirmPassword}
            >
              {errors.confirmPassword}
            </HelperText>

            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              mode="contained"
              onPress={() => {
                setSubmitting(true);
                setFieldValue("avatar", avatar);
                handleSubmit();
              }}
              style={styles.submitButton}
            >
              Register
            </Button>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                paddingHorizontal: 5,
                marginTop: 10,
              }}
            >
              <Text style={{ alignSelf: "center" }}>
                Already have an account?
              </Text>
              <Text
                variant="labelLarge"
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </View>
          </>
        )}
      </Formik>
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
  avatarPreview: {
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#000000",
  },
  submitButton: {
    marginTop: 5,
    backgroundColor: "#000000", // Black background
    borderRadius: 9, // Remove rounding for squarish look
    paddingVertical: 8, // Adjust padding for better size
  },
  submitButtonText: {
    color: "#FFFFFF", // White font color
    fontWeight: "bold", // Bold for emphasis
    textTransform: "uppercase", // Optional for all caps
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
