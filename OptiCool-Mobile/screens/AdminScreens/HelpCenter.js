import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

// Mock data for help topics
const helpTopics = [
  {
    id: 1,
    title: 'How to Reset Your Password',
    description: 'Follow these steps to reset your password and regain access to your account.',
  },
  {
    id: 2,
    title: 'How to Contact Support',
    description: 'Learn how to reach our support team for assistance with any issues.',
  },
  {
    id: 3,
    title: 'How to Update Your Profile',
    description: 'A guide on how to update your personal details and preferences.',
  },
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(helpTopics);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterTopics(query);
  };

  const filterTopics = (query) => {
    const filtered = helpTopics.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder="Search for help topics..."
      />
      <View style={styles.topicsList}>
        {filteredTopics.length === 0 ? (
          <Text>No help topics found.</Text>
        ) : (
          <FlatList
            data={filteredTopics}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.topicItem}>
                <Text style={styles.topicTitle}>{item.title}</Text>
                <Text style={styles.topicDescription}>{item.description}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  topicsList: {
    flex: 1,
  },
  topicItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HelpCenter;
