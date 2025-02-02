import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../states/authSlice";  
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigation = useNavigation();

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

  useEffect(() => {
    setUserOriginalInfo();
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      {/* App Name */}
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>OptiCool</Text>
      </View>

      {/* Drawer Header */}
      <View style={styles.header}>
        <Image source={{ uri: userData.avatar?.url }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>

      {/* Drawer Items List */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Additional Custom Options */}
      <View style={styles.drawerOptions}>
        <DrawerItem
          label="Log out"
          icon={({ color, size }) => <IconButton icon="logout" size={size} color={color} />}
          onPress={() => dispatch(removeAuth())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appNameContainer: {
    paddingVertical: 15,
    backgroundColor: "#000000",
    alignItems: "left",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10, // Square with slightly rounded corners
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  email: {
    fontSize: 14,
    color: "#cccccc",
  },
  drawerOptions: {
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#dddddd",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default CustomDrawerContent;
