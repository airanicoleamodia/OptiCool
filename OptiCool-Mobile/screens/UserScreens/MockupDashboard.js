import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MockupDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mockup Dashboard</Text>
      <Text>This is a mock-up dashboard for regular users.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MockupDashboard;
