import { View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, TextInput, FAB, Text } from "react-native-paper";
import { removeAuth, setAuth } from "../../states/authSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

export default function UpdateProfile() {
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

      {/* User Information */}
      <TextInput
        mode="outlined"
        label="Username"
        disabled={!isEditing}
        onChangeText={(value) =>
          setUserData((prev) => ({ ...prev, username: value }))
        }
        value={userData.username}
        style={{ marginTop: 20 }}
      />

      <TextInput
        mode="outlined"
        label="Email"
        disabled={!isEditing}
        onChangeText={(value) =>
          setUserData((prev) => ({ ...prev, email: value }))
        }
        value={userData.email}
        style={{ marginTop: 10 }}
      />

      {/* Edit/Update Buttons */}
      {isEditing ? (
        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
          <Button
            style={{ flex: 1 }}
            mode="contained"
            onPress={() => {
              update(); // Call your update function
              navigation.goBack(); // Navigate back after updating
            }}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Update
          </Button>

          <Button
            style={{ flex: 1 }}
            mode="outlined"
            onPress={() => {
              setIsEditing(false);
              setUserOriginalInfo();
              navigation.goBack(); // Navigate back when canceling
            }}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Cancel
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          onPress={() => {
            setIsEditing(true);
          }}
          style={{ marginTop: 20 }}
        >
          Edit Profile
        </Button>
      )}

      {/* Change Password & Logout Buttons */}
      <Button
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
      </Button>
    </View>
  );
}
