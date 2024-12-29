import React, { useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotifScreen() {
    const TEMPERATURE_THRESHOLD = 30;
    const HUMIDITY_THRESHOLD = 70;

    // Request notification permissions inside the component
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to receive notifications is required!');
            }
        };
        requestPermissions();

        const interval = setInterval(() => {
            simulateAndCheckConditions();
        }, 10000); // 10 seconds

        return () => clearInterval(interval); // Cleanup
    }, []); // Empty dependency array to run only once

    // Handle notifications
    Notifications.setNotificationHandler({
        handleNotification: async (notification) => {
            console.log('Received notification:', notification); // Log the notification
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            };
        },
    });

    const generateMockSensorData = () => {
        return {
            temperature: Math.floor(Math.random() * 50),
            humidity: Math.floor(Math.random() * 100),
        };
    };

    const sendNotification = async (title, body) => {
        console.log(`Sending notification: ${title} - ${body}`);
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data: { additionalData: 'This is simulated.' },
            },
            trigger: { seconds: 1 }, // Trigger notification immediately
        });
    };

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

    // Add listener for notifications in background or when app is closed
    Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received in background:', notification);
    });

    // Manually trigger notification
    const manualNotification = () => {
        sendNotification('Manual Notification', 'This is a manually triggered notification.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mock Testing Notifications</Text>
            <Button
                title="Trigger Manual Notification"
                onPress={manualNotification}
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
