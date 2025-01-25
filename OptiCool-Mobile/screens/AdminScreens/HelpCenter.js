import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const HelpCenter = ({ navigation }) => {
  const [helpTopics, setHelpTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelpTopics();
  }, []);

  const fetchHelpTopics = async () => {
    try {
      const response = await axios.get(`${baseURL}/help/getAllTopics`);
      setHelpTopics(response.data.topics);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch help topics.");
    } finally {
      setLoading(false);
    }
  };

  const renderHelpTopic = ({ item }) => (
    <TouchableOpacity
      style={styles.topicCard}
      onPress={() => navigation.navigate("HelpDetails", { topic: item })}
    >
      <Text style={styles.topicTitle}>{item.title}</Text>
      <Text style={styles.topicDescription}>{item.description.substring(0, 50)}...</Text>
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
      <FlatList
        data={helpTopics}
        keyExtractor={(item) => item._id}
        renderItem={renderHelpTopic}
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
  },
  topicCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  topicDescription: {
    fontSize: 14,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HelpCenter;
