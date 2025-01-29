import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import BottomTabs from './BottomTabs';
import ProfileNavigation from './ProfileNavigation';
import AdminDashboard from '../screens/AdminScreens/AdminDashboard';
import WelcomePage from '../screens/UserScreens/WelcomePage';
import AuthNavigation from './AuthNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { isLogin, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is initialized
  useEffect(() => {
    if (user !== null) {
      setIsLoading(false); // Set loading to false once user data is available
    }
  }, [user]);

  if (isLoading) {
    // Show loading state (e.g., spinner) while the authentication state is being checked
    return null; // Or you can replace this with a loading spinner or placeholder
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
          <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
        </Drawer.Navigator>
      ) : (
        // Render WelcomePage if not logged in
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}
