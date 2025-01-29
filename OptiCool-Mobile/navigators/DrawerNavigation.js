import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import BottomTabs from './BottomTabs';
import ProfileNavigation from './ProfileNavigation';
import AuthNavigation from './AuthNavigation';
import NotifScreen from '../screens/MenuScreens/NotifScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack navigator for NotifScreen
function NotifStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotifScreen" component={NotifScreen} />
    </Stack.Navigator>
  );
}

export default function DrawerNavigation() {
  const { isLogin, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return null; // Placeholder for loading state
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {isLogin ? (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Home" component={BottomTabs} />
          <Drawer.Screen name="Profile" component={ProfileNavigation} />
          <Drawer.Screen name="NotifScreen" component={NotifStack} options={{ drawerLabel: 'Notifications' }} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}
