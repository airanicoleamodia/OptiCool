import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { Ionicons } from "@expo/vector-icons"; // Add this import

const HelpCenter = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts/getAllPosts`);
      setPosts(response.data.posts); // Ensure this matches your backend's key for posts.
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate("HelpDetails", { post: item })}
    >
      <View style={styles.postContentContainer}>
        <View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.content.substring(0, 50)}...</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#555" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 10,
    marginTop: 15, // Add margin on top of the list
  },
  postCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  postContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15, // Revert to original padding
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 30, // Add margin to push the text down
  },
});

export default HelpCenter;
