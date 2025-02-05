import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = () => {
  const [selected, setSelected] = useState('AC');

  const menuItems = [
    { name: 'AC', icon: 'air-conditioner' },
    { name: 'Fan', icon: 'fan' },
    { name: 'Exhaust', icon: 'fan-off' },
    { name: 'Blower', icon: 'air-filter' }
  ];

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.menuItem, selected === item.name && styles.selectedItem]}
          onPress={() => setSelected(item.name)}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
            color={selected === item.name ? '#ffffff' : '#9eaab8'}
          />
          <Text style={[styles.menuText, selected === item.name && styles.selectedText]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ebedf0',
    borderRadius: 10
  },
  menuItem: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 70,
    marginTop: 25,
  },
  selectedItem: {
    backgroundColor: '#2F80ED',
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: '#9eaab8'
  },
  selectedText: {
    color: '#ffffff'
  }
});

export default Menu;
