import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AdminDashboard = () => {
  const navigation = useNavigation(); // Get access to navigation object
  const [viewMode, setViewMode] = useState('icons'); // Default view mode

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const menuItems = [
    { id: 1, name: 'Activity Logs', icon: '📊', color: '#000000', onPress: () => navigation.navigate('ActivityLog') },
    { id: 2, name: 'Reports', icon: '📑', color: '#000000', onPress: () => navigation.navigate('ActivityUsers') },
    { id: 3, name: 'FAQs', icon: '⚙️', color: '#000000', onPress: () => navigation.navigate('HelpCenter') },
    { 
      id: 4, 
      name: 'Users', 
      icon: '👤', 
      color: '#000000', 
      onPress: () => navigation.navigate('UsersAll') // Navigate to UsersAll screen
    },
    { id: 5, name: 'Active Users', icon: '🚪', color: '#000000', onPress: () => navigation.navigate('ActiveUsers') },
  ];

  return (
    <View style={styles.dashboard}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleViewChange('icons')} style={styles.button}>
          <Text style={styles.buttonText}>Icons</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleViewChange('list')} style={styles.button}>
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.menuBox, { backgroundColor: item.color }]} 
            onPress={item.onPress} // Add onPress handler for navigation
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window'); // Get screen width
const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: 20,
    marginTop: 26,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuBox: {
    width: (width - 60) / 2, // Two items per row with padding
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: '#fff',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AdminDashboard;
