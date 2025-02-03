import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState('icons');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleFaqsPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const menuItems = [
    { id: 1, name: 'Activity Logs', icon: '📊', color: '#000000', onPress: () => navigation.navigate('ActivityLog') },
    { id: 2, name: 'Reports', icon: '📑', color: '#000000', onPress: () => navigation.navigate('ActivityUsers') },
    { id: 3, name: 'FAQs', icon: '⚙️', color: '#000000', onPress: handleFaqsPress },
    { id: 4, name: 'Users', icon: '👤', color: '#000000', onPress: () => navigation.navigate('UsersAll') },
    { id: 5, name: 'Active Users', icon: '🚪', color: '#000000', onPress: () => navigation.navigate('ActiveUsers') },
  ];

  return (
    
    <View style={styles.dashboard}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.dashboardText}>Dashboard</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleViewChange('icons')} style={styles.button}>
            <Text style={styles.buttonText}>Icons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleViewChange('list')} style={styles.button}>
            <Text style={styles.buttonText}>List</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.menuBox, { backgroundColor: item.color }]} 
            onPress={item.onPress}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>FAQs</Text>
            <View style={styles.choiceContainer}>
              <TouchableOpacity 
                style={styles.choiceBox} 
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('HelpCenter');
                }}
              >
                <Text style={styles.choiceText}>View Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.choiceBox} 
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('CreatePosts');
                }}
              >
                <Text style={styles.choiceText}>Create Post</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: 20,
    marginTop: 26,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust to space between for alignment
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
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: '#fff',
  },
  dashboardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left', // Align text to the left
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  choiceBox: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 10,
    margin: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdminDashboard;
