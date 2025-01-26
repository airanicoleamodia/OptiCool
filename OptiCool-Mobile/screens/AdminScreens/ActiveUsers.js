import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios'; // Assuming you use Axios for API requests
import baseURL from '../../assets/common/baseUrl';

const ActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/all`); // Changed URL to use baseURL
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
        setError('Failed to load active users');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading active users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()} // Adjust to match your user object structure
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.user}>
              {item.username} - {item.email}
            </Text>
            <Text style={[styles.status, item.isActive ? styles.online : styles.offline]}>
              {item.isActive ? 'Online' : 'Offline'}
            </Text>
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  user: {
    fontSize: 18,
    marginVertical: 5,
  },
  userContainer: {
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    marginVertical: 5,
  },
  online: {
    color: 'green',
    fontWeight: 'bold',
  },
  offline: {
    color: 'red',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default ActiveUsers;
