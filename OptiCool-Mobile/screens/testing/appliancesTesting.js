// import React, { useEffect } from 'react';
// import { Button, View, StyleSheet } from 'react-native';
// import * as Notifications from 'expo-notifications';

// export default function AppliancesTesting() {
//     // Set thresholds
//     const TEMPERATURE_THRESHOLD = 30; // Example: 30°C
//     const HUMIDITY_THRESHOLD = 70; // Example: 70%

//     // Request notification permission
//     const requestNotificationPermission = async () => {
//         const { status } = await Notifications.requestPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Permission for notifications is required!');
//         }
//     };

//     // Function to simulate sensor data
//     const generateMockSensorData = () => {
//         return {
//             temperature: Math.floor(Math.random() * 50), // Random temperature between 0 and 50
//             humidity: Math.floor(Math.random() * 100),  // Random humidity between 0 and 100
//         };
//     };

//     // Function to check thresholds and trigger notifications
//     const checkConditions = () => {
//         const { temperature, humidity } = generateMockSensorData();
//         console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);

//         if (temperature > TEMPERATURE_THRESHOLD) {
//             triggerNotification('Temperature Alert', `Temperature exceeded: ${temperature}°C`);
//         }

//         if (humidity > HUMIDITY_THRESHOLD) {
//             triggerNotification('Humidity Alert', `Humidity exceeded: ${humidity}%`);
//         }
//     };

//     // Function to trigger a notification
//     const triggerNotification = async (title, body) => {
//         await Notifications.scheduleNotificationAsync({
//             content: {
//                 title,
//                 body,
//                 data: { report: 'Simulated Data' },
//             },
//             trigger: null, // Immediate notification
//         });
//     };

//     // Simulate data changes every 10 seconds
//     useEffect(() => {
//         // Request permissions once the app is mounted
//         requestNotificationPermission();

//         const interval = setInterval(() => {
//             checkConditions();
//         }, 10000); // 10 seconds interval

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Button title="Trigger Manual Check" onPress={checkConditions} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
