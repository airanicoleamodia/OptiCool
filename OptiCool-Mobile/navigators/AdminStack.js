import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/AdminScreens/AdminDashboard';
import ActiveUsers from '../screens/AdminScreens/ActiveUsers';
import ActivityLog from '../screens/AdminScreens/ActivityLog';
import UsersAll from '../screens/AdminScreens/UsersAll';
import HelpCenter from '../screens/AdminScreens/HelpCenter';
import CreatePosts from '../screens/AdminScreens/CreatePosts';
import HelpDetails from '../screens/AdminScreens/HelpDetails';

const Stack = createStackNavigator();

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="ActiveUsers" component={ActiveUsers} />
    <Stack.Screen name="ActivityLog" component={ActivityLog} />
    <Stack.Screen name="UsersAll" component={UsersAll} />
    <Stack.Screen name="HelpCenter" component={HelpCenter} />
    <Stack.Screen name="CreatePosts" component={CreatePosts} />
    <Stack.Screen name="HelpDetails" component={HelpDetails} options={{ title: "Help Details" }} />
  </Stack.Navigator>
);

export default AdminStack;
