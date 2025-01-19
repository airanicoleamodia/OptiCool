// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Ionicons } from '@expo/vector-icons';
// import BottomTabs from './BottomTabs';
// import CustomDrawerContent from './CustomDrawerContent';
// import ProfileNavigation from './ProfileNavigation';
// import { useSelector } from 'react-redux';

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   const { user } = useSelector((state) => state.auth);
//   const isAdmin = user.role === 'admin';

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: '#fff', // Drawer background color
//           width: 240, // Width of the drawer
//         },
//         headerShown: false, // Hide header in Drawer screens
//         drawerActiveTintColor: '#96a8fa', // Active item color
//         drawerInactiveTintColor: '#000', // Inactive item color
//         drawerLabelStyle: {
//           fontSize: 16, // Font size for the labels
//         },
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={BottomTabs}
//         options={{
//           drawerLabel: 'Home',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileNavigation}
//         options={{
//           drawerLabel: 'Profile',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       {isAdmin && (
//         <Drawer.Screen
//           name="Admin Panel"
//           component={BottomTabs} // Replace this with a specific admin component if needed
//           options={{
//             drawerLabel: 'Admin Panel',
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       )}
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
