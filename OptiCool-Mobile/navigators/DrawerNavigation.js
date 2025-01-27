import React from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();


export default function TestNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* Nest the Bottom Tabs into the Drawer */}
        <Drawer.Screen name="Tabs" component={BottomTabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
