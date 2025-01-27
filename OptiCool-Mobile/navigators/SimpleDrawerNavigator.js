// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Ionicons } from '@expo/vector-icons';
// import { View, Text } from 'react-native';

// const Drawer = createDrawerNavigator();

// const Screen1 = () => (
//   <View>
//     <Text>Screen 1</Text>
//   </View>
// );

// const Screen2 = () => (
//   <View>
//     <Text>Screen 2</Text>
//   </View>
// );

// const SimpleDrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Screen1"
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: '#fff',
//           width: 240,
//         },
//         headerShown: false,
//         drawerActiveTintColor: '#96a8fa',
//         drawerInactiveTintColor: '#000',
//         drawerLabelStyle: {
//           fontSize: 16,
//         },
//       }}
//     >
//       <Drawer.Screen
//         name="Screen1"
//         component={Screen1}
//         options={{
//           drawerLabel: 'Screen 1',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Screen2"
//         component={Screen2}
//         options={{
//           drawerLabel: 'Screen 2',
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default SimpleDrawerNavigator;
