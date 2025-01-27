import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* Hide the label for this drawer screen */}
        <Drawer.Screen
          name="Tabs"
          component={BottomTabs}
          options={{
            headerShown: false, // Hide the header
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
