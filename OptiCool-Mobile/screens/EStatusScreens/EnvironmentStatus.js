import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';

export default function EnvironmentStatus() {
    const navigation = useNavigation();
    const [submitting, setSubmitting] = useState(false);

    const handleReport = async (appliance, status, setSubmitting) => {
        setSubmitting(true);

        try {
            const { data } = await axios.post(`${baseURL}/ereports/ereport`, { appliance, status });

            if (data.success) {
                Alert.alert(
                    'Report',
                    data.message,
                    [{ text: 'OK', onPress: () => console.log(`${appliance} report acknowledged`) }],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Error',
                    data.message,
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            Alert.alert(
                'Network Error',
                'Could not send the report. Please try again later.',
                [{ text: 'OK' }],
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

            {/* Circular Display */}
            <View style={styles.circleContainer}>
                {/* Outer Circle */}
                <View style={styles.outerCircle}>
                    {/* Inner Circle */}
                    <View style={styles.innerCircle}>
                        <Text style={styles.coolingText}>COOLING</Text>
                        <Text style={styles.temperatureText}>28°</Text>
                        <Text style={styles.snowflakeIcon}>❄</Text>
                    </View>
                </View>
                {/* Target Temperature Display */}
                {/* <Text style={styles.targetTemperature}>20°</Text> */}
                <View style={styles.statusRow}>
                    {/* Ceiling Fan Card */}
                    <View style={styles.statusCard}>
                        <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" />
                        <Text style={styles.statusCardText}>Ceiling Fan</Text>
                        <Text style={styles.statusCardStatus}>Active</Text>
                    </View>

                    {/* Exhaust Fan Card */}
                    <View style={styles.statusCard}>
                        <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" />
                        <Text style={styles.statusCardText}>Exhaust</Text>
                        <Text style={styles.statusCardStatus}>Active</Text>
                    </View>
                </View>
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
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    outerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#EAF6FF',
        borderWidth: 30,
        borderColor: '#96a8fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#F5FAFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coolingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#9eaab8',
        marginTop: 15,
        marginBottom: -5,
    },
    temperatureText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#4f5e70',
        marginVertical: 5,
    },
    snowflakeIcon: {
        fontSize: 20,
        color: '#6C9AB2',
        marginTop: 5,
    },
    targetTemperature: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Add space between cards
        marginHorizontal: 20, // Add padding on the sides
        marginTop: 20,
    },
    statusCard: {
        backgroundColor: '#c3cfdd',
        borderRadius: 40,
        width: 150,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 10, // Add horizontal spacing between cards
    },
    statusCardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    statusCardStatus: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
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
