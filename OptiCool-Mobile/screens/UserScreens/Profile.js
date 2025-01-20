import { View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  TextInput,
  FAB,
  Text,
  IconButton,
} from "react-native-paper";
import { removeAuth, setAuth } from "../../states/authSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";
import AdminDashboard from '../AdminScreens/AdminDashboard'; // Go one level up, then into AdminScreens
import baseURL from "../../assets/common/baseUrl";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    avatar: "",
    username: "",
    email: "",
  });

  const setUserOriginalInfo = async () => {
    const { data } = await axios.get(`${baseURL}/users/getsingle/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setUserData({
      avatar: data.user.avatar,
      username: data.user.username,
      email: data.user.email,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setUserOriginalInfo();
    }, [user])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShown: false,
    });
  }, [navigation]);

  const handleAvatarSelection = async () => {
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
      setUserData((prev) => ({
        ...prev,
        avatar: { public_id: "", url: result.assets[0].uri },
      }));
    }
  };

  const update = async () => {
    try {
      setIsSubmitting(true);

      const FORM_DATA = new FormData();

      if (!userData.avatar.public_id) {
        const newImageUri =
          "file:///" + userData.avatar.url.split("file:/").join("");

        FORM_DATA.append("avatar", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri?.split("/").pop(),
        });
      }

      FORM_DATA.append("username", userData.username);
      FORM_DATA.append("email", userData.email);

      const { data } = await axios.put(
        `${baseURL}/users/update/${user._id}`,
        FORM_DATA,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(
        setAuth({
          user: data.user,
          token: data.token,
        })
      );

      setUserOriginalInfo();
      setIsEditing(false);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        Profile
      </Text>

      {/* Avatar and Edit Button */}
      <View style={{ alignSelf: "center", marginTop: 30 }}>
        {isEditing && (
          <FAB
            icon="pen"
            style={{ position: "absolute", zIndex: 1, marginTop: -10 }}
            size="small"
            onPress={handleAvatarSelection}
            disabled={isSubmitting}
          />
        )}
        <Avatar.Image source={{ uri: userData.avatar?.url }} size={120} />
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        {userData.username}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#555",
          alignSelf: "center",
          marginTop: -5,
          marginBottom: 10,
        }}
      >
        {userData.email}
      </Text>

      {user.role === "admin" ? (
        // If user is admin, show both buttons in a row
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Button
            mode="contained"
            onPress={() => navigation.navigate("UpdateProfile")} // Navigates to UpdateProfile.js
            style={{
              backgroundColor: "#000000",
              width: "48%", // Adjust width to fit both buttons in a row
            }}
          >
            Edit Profile
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("AdminDashboard")} // Navigates to Dashboard screen
            style={{
              backgroundColor: "#FFFFFF",
              width: "48%", // Adjust width to fit both buttons in a row
            }}
            icon="view-dashboard" // Dashboard icon
            textColor="#000000"
          >
            Dashboard
          </Button>
        </View>
      ) : (
        // If user is not admin, only show the Edit Profile button
        <Button
          mode="contained"
          onPress={() => navigation.navigate("UpdateProfile")} // Navigates to UpdateProfile.js
          style={{
            marginTop: 10,
            backgroundColor: "#000000",
            width: "60%",
            alignSelf: "center",
          }}
        >
          Edit Profile
        </Button>
      )}

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: "#ccc",
          marginVertical: 35,
        }}
      ></View>

      <View
        style={{
          marginTop: -30,
          alignItems: "flex-start",
          width: "100%",
          paddingLeft: 20,
        }}
      >
        {[
          { label: "Settings", icon: "cog", route: "Settings" },
          { label: "Details", icon: "credit-card", route: "BillingDetails" },
          {
            label: "Information",
            icon: "information-outline",
            route: "Information",
          },
          {
            label: "Log out",
            icon: "logout",
            action: () => dispatch(removeAuth()),
          },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              marginVertical: 10,
            }}
          >
            {/* Icon and Text */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Rounded Cube for Icon */}
              <View
                style={{
                  backgroundColor: "#f0f0f0", // Light background for better visibility
                  borderRadius: 10, // Rounded corners
                  width: 36,
                  height: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <IconButton
                  icon={item.icon}
                  size={20}
                  color="#000000"
                  style={{ margin: 0 }} // Remove additional margins from IconButton
                />
              </View>
              {/* Menu Text */}
              <Button
                mode="text"
                onPress={
                  item.action
                    ? item.action
                    : () => navigation.navigate(item.route)
                }
                textColor="#000000"
                contentStyle={{
                  justifyContent: "flex-start",
                }}
                style={{ margin: 0 }}
              >
                {item.label}
              </Button>
            </View>

            {/* Arrow Icon (exclude for Log out if needed) */}
            {!item.action && (
              <IconButton
                icon="chevron-right"
                size={20}
                color="#000000"
                style={{ margin: 0 }}
              />
            )}
          </View>
        ))}
      </View>

      {/* <Button
        mode="contained"
        onPress={() => navigation.navigate("ResetPasswordCode")}
        style={{ marginTop: 20 }}
      >
        Change password
      </Button>

      <Button
        mode="outlined"
        onPress={() => dispatch(removeAuth())}
        style={{ marginTop: 10 }}
      >
        Logout
      </Button> */}
    </View>
  );
}
