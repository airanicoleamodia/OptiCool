import { View, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';  // Importing axios
import styles from './EnvironmentDesign';
import opticoolImage from '../../assets/opticool.png';
import baseURL from '../../assets/common/baseUrl';

export default function EnvironmentStatus() {
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
            
            <ImageBackground
                source={opticoolImage}
                style={styles.background}
                resizeMode="cover"
            >
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
                        onPress={() => handleReport('Exhaust Fan', 'Inactive', setSubmitting)} // Passing setSubmitting
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
                        onPress={() => handleReport('Power Consumption Meter', 'Inactive', setSubmitting)} // Passing setSubmitting
                    >
                        <Text style={styles.reportButtonText}>Report</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
