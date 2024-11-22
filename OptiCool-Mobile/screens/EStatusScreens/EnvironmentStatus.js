import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';  // Importing axios
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Import the icons
import baseURL from '../../assets/common/baseUrl';
import { useNavigation } from '@react-navigation/native'; // Use this hook


  
export default function EnvironmentStatus() {
    const navigation = useNavigation(); // Initialize navigation
    const [submitting, setSubmitting] = useState(false);  // Initialize submitting state

    const handleReport = async (appliance, status, setSubmitting) => {
        setSubmitting(true); // Set submitting to true when the report is being sent

        try {
            // Send the report data to the server using axios
            const { data } = await axios.post(`${baseURL}/ereports/ereport`, { appliance, status });

            if (data.success) {
                Alert.alert(
                    "Report",
                    data.message,
                    [{ text: "OK", onPress: () => console.log(`${appliance} report acknowledged`) }],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    "Error",
                    data.message,
                    [{ text: "OK" }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            Alert.alert(
                "Network Error",
                "Could not send the report. Please try again later.",
                [{ text: "OK" }],
                { cancelable: false }
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerText}>DMT Room 3</Text>

                <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu pressed')}>
                    <MaterialCommunityIcons name="dots-vertical" size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.background}>
                <View style={styles.mainRow}>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Temperature Sensor 1</Text>
                        <Text style={styles.applianceStatus}>Status: Active</Text>
                    </View>

                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Temperature Sensor 2</Text>
                        <Text style={styles.applianceStatus}>Status: Active</Text>
                    </View>
                </View>

                <View style={styles.mainRow}>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Temperature Sensor 3</Text>
                        <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                    </View>

                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Temperature Sensor 4</Text>
                        <Text style={styles.applianceStatus}>Status: Active</Text>
                    </View>
                </View>

                <View style={styles.mainRow}>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Exhaust Fan</Text>
                        <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => handleReport('Exhaust Fan', 'Inactive', setSubmitting)}
                    >
                        <Text style={styles.reportButtonText}>Report</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainRow}>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Power Consumption Meter</Text>
                        <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => handleReport('Power Consumption Meter', 'Inactive', setSubmitting)}
                    >
                        <Text style={styles.reportButtonText}>Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Move the styles definition here (you only need to declare it once)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf2fd',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    backButton: {
        padding: 10,
    },
    menuButton: {
        padding: 10,
    },
    background: {
        backgroundColor: '#eaf2fd',
        flex: 1,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    applianceCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        marginBottom: 10,
    },
    applianceText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    applianceStatus: {
        color: 'green',
        fontSize: 14,
    },
    applianceStatusInactive: {
        color: 'red',
        fontSize: 14,
    },
    reportButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
