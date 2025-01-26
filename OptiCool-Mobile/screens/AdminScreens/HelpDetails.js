import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HelpDetails = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.date}>Last Updated: {new Date(post.updatedAt).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
});

export default HelpDetails;
