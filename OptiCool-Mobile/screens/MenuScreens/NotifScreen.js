import React, { useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure Notification Behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
export default function NotifScreen() {
   // Simulated thresholds
   const TEMPERATURE_THRESHOLD = 30;
   const HUMIDITY_THRESHOLD = 70;

   // Mock function to generate random data
   const generateMockSensorData = () => {
       return {
           temperature: Math.floor(Math.random() * 50), // 0-50
           humidity: Math.floor(Math.random() * 100), // 0-100
       };
   };

   // Function to trigger a notification
   const sendNotification = async (title, body) => {
       await Notifications.scheduleNotificationAsync({
           content: {
               title,
               body,
               data: { additionalData: 'This is simulated.' },
           },
           trigger: null, // Send immediately
       });
   };

   // Simulate sensor conditions and check thresholds
   const simulateAndCheckConditions = () => {
       const { temperature, humidity } = generateMockSensorData();
       console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);

       if (temperature > TEMPERATURE_THRESHOLD) {
           sendNotification(
               'Temperature Alert 🚨',
               `Temperature exceeded: ${temperature}°C!`
           );
       }

       if (humidity > HUMIDITY_THRESHOLD) {
           sendNotification(
               'Humidity Alert 💧',
               `Humidity exceeded: ${humidity}%!`
           );
       }
   };

   // Simulate periodic checks every 10 seconds
   useEffect(() => {
       const interval = setInterval(() => {
           simulateAndCheckConditions();
       }, 10000); // 10 seconds

       return () => clearInterval(interval); // Cleanup
   }, []);

   return (
       <View style={styles.container}>
           <Text style={styles.title}>Mock Testing Notifications</Text>
           <Button
               title="Trigger Manual Notification"
               onPress={simulateAndCheckConditions}
           />
       </View>
   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
});