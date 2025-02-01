import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../states/authSlice";  // Going up one level first
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

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
      {/* Drawer Header */}
      <View style={styles.header}>
        <Avatar.Image source={{ uri: userData.avatar?.url }} size={80} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>

      {/* Drawer Options */}
      <View style={styles.drawerOptions}>
        {[ 
          { label: "Dashboard", icon: "view-dashboard", route: "AdminDashboard" },
          { label: "Settings", icon: "cog", route: "Settings" },
          { label: "Log out", icon: "logout", action: () => dispatch(removeAuth()) },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={item.action ? item.action : () => navigation.navigate(item.route)}
          >
            <IconButton icon={item.icon} size={20} color="#000" />
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  drawerOptions: {
    flex: 1,
    paddingTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
});

export default CustomDrawerContent;
