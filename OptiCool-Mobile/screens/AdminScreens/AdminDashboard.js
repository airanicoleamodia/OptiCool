import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminDashboard = () => {
  const [viewMode, setViewMode] = useState('icons'); // Default view mode

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Reports', icon: '📑' },
    { id: 3, name: 'Settings', icon: '⚙️' },
    { id: 4, name: 'Profile', icon: '👤' },
    { id: 5, name: 'Logout', icon: '🚪' },
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
      <View style={[styles.menu, viewMode === 'icons' ? styles.icons : styles.list]}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            {viewMode === 'icons' ? (
              <Text style={styles.icon}>{item.icon}</Text>
            ) : (
              <Text style={styles.listItem}>{item.name}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  icons: {
    alignItems: 'center',
  },
  list: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 30,
  },
  listItem: {
    fontSize: 18,
  },
});

export default AdminDashboard;
