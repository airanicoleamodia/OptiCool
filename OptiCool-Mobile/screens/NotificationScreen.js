import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import io from "socket.io-client";
import baseURL from "../assets/common/baseUrl";

const socket = io(baseURL); // Initialize socket.io

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications
    socket.on("notification", (message) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now().toString(), message },
      ]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationContainer: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotificationScreen;
