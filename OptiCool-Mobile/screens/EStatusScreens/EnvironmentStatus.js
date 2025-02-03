import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';

export default function EnvironmentStatus() {
    const navigation = useNavigation();
    const [submitting, setSubmitting] = useState(false);
    const [isOn, setIsOn] = useState(false); // State to track the power status

    // Function to toggle power status
    const togglePower = () => {
        setIsOn(!isOn);
    };

    const [fan1On, setFan1On] = useState(false);
    const [fan2On, setFan2On] = useState(false);
    const [fan3On, setFan3On] = useState(false);
    const [ACOn, setACOn] = useState(false);
    const [AC2On, setAC2On] = useState(false);

    // Function to toggle power status for a specific fan
    const toggleFanPower = (fanNumber) => {
        switch (fanNumber) {
            case 1:
                setFan1On(!fan1On);
                break;
            case 2:
                setFan2On(!fan2On);
                break;
            case 3:
                setFan3On(!fan3On);
                break;
            case 4:
                setACOn(!ACOn);
                break;
            case 5:
                setAC2On(!AC2On);
                break;
            default:
                break;
        }
    };

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
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
                        <MaterialCommunityIcons name="arrow-left" size={30} color="#9eaab8" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>DMT Room 3</Text>

                    <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu pressed')}>
                        <MaterialCommunityIcons name="dots-vertical" size={30} color="#9eaab8" />
                    </TouchableOpacity>
                </View>

                {/* Circular Display */}
                <View style={styles.circleContainer}>
                    {/* Outer Circle */}
                    <View style={styles.outerCircle}>
                        {/* Timer Lines */}
                        {[...Array(60)].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.timerLine,
                                    { transform: [{ rotate: `${index * 6}deg` }] },
                                ]}
                            />
                        ))}
                        {/* Inner Circle */}
                        <View style={styles.innerCircle}>
                            <Text style={styles.coolingText}>COOLING</Text>
                            <Text style={styles.temperatureText}>28°</Text>
                            <Text style={styles.snowflakeIcon}>❄</Text>
                        </View>
                    </View>

                    <View style={styles.statusRow}>
                        {/* Ceiling Fan Card */}
                        <View style={styles.statusCard}>
                            <MaterialCommunityIcons
                                name="fan"
                                size={30}
                                color="#6C9AB2"
                                style={styles.iconStyle}
                            />
                            <View>
                                <Text style={styles.statusCardText}>Ceiling Fan</Text>
                                <Text style={styles.statusCardStatus}>Active</Text>
                            </View>
                        </View>

                        {/* Exhaust Fan Card */}
                        <View style={styles.statusCard}>
                            <MaterialCommunityIcons
                                name="fan"
                                size={30}
                                color="#6C9AB2"
                                style={styles.iconStyle}
                            />
                            <View>
                                <Text style={styles.statusCardText}>Exhaust</Text>
                                <Text style={styles.statusCardStatus}>Active</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.appliancesContainer}>
                    <View style={styles.appliancesContainer}>
                        <View style={styles.backgroundWrapper}>
                            {/* Fan 1 */}
                            <View style={styles.contentCard}>
                                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.contentCardText}>Fan</Text>
                                    <Text style={[styles.contentCardStatus, { color: fan1On ? 'green' : 'red' }]}>
                                        {fan1On ? 'On' : 'Off'}
                                    </Text>
                                </View>
                                <View style={styles.cardbuttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.powerButton, { backgroundColor: fan1On ? '#4CAF50' : '#FF5252' }]}
                                        onPress={() => toggleFanPower(1)}
                                    >
                                        <MaterialCommunityIcons
                                            name={fan1On ? 'power' : 'power-on'}
                                            size={30}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() => handleReport('Fan', fan1On ? 'Active' : 'Inactive', setSubmitting)}
                                    >
                                        <Text style={styles.reportButtonText}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Fan 2 */}
                            <View style={styles.contentCard}>
                                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.contentCardText}>Fan 2</Text>
                                    <Text style={[styles.contentCardStatus, { color: fan2On ? 'green' : 'red' }]}>
                                        {fan2On ? 'On' : 'Off'}
                                    </Text>
                                </View>
                                <View style={styles.cardbuttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.powerButton, { backgroundColor: fan2On ? '#4CAF50' : '#FF5252' }]}
                                        onPress={() => toggleFanPower(2)}
                                    >
                                        <MaterialCommunityIcons
                                            name={fan2On ? 'power' : 'power-on'}
                                            size={30}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() => handleReport('Fan 2', fan2On ? 'Active' : 'Inactive', setSubmitting)}
                                    >
                                        <Text style={styles.reportButtonText}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Fan 3 */}
                            <View style={styles.contentCard}>
                                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.contentCardText}>Fan 3</Text>
                                    <Text style={[styles.contentCardStatus, { color: fan3On ? 'green' : 'red' }]}>
                                        {fan3On ? 'On' : 'Off'}
                                    </Text>
                                </View>
                                <View style={styles.cardbuttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.powerButton, { backgroundColor: fan3On ? '#4CAF50' : '#FF5252' }]}
                                        onPress={() => toggleFanPower(3)}
                                    >
                                        <MaterialCommunityIcons
                                            name={fan3On ? 'power' : 'power-on'}
                                            size={30}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() => handleReport('Fan 3', fan3On ? 'Active' : 'Inactive', setSubmitting)}
                                    >
                                        <Text style={styles.reportButtonText}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* Aircon */}
                            <View style={styles.contentCard}>
                                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.contentCardText}>Aircon</Text>
                                    <Text style={[styles.contentCardStatus, { color: ACOn ? 'green' : 'red' }]}>
                                        {ACOn ? 'On' : 'Off'}
                                    </Text>
                                </View>
                                <View style={styles.cardbuttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.powerButton, { backgroundColor: fan3On ? '#4CAF50' : '#FF5252' }]}
                                        onPress={() => toggleFanPower(4)}
                                    >
                                        <MaterialCommunityIcons
                                            name={fan3On ? 'power' : 'power-on'}
                                            size={30}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() => handleReport('Aircon', ACOn ? 'Active' : 'Inactive', setSubmitting)}
                                    >
                                        <Text style={styles.reportButtonText}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* Aircon 2 */}
                            <View style={styles.contentCard}>
                                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.contentCardText}>Aircon 2</Text>
                                    <Text style={[styles.contentCardStatus, { color: AC2On ? 'green' : 'red' }]}>
                                        {AC2On ? 'On' : 'Off'}
                                    </Text>
                                </View>
                                <View style={styles.cardbuttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.powerButton, { backgroundColor: AC2On ? '#4CAF50' : '#FF5252' }]}
                                        onPress={() => toggleFanPower(5)}
                                    >
                                        <MaterialCommunityIcons
                                            name={AC2On ? 'power' : 'power-on'}
                                            size={30}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() => handleReport('Aircon 2', AC2On ? 'Active' : 'Inactive', setSubmitting)}
                                    >
                                        <Text style={styles.reportButtonText}>Report</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
                    </View>
                </View>


                <View style={styles.background}>
                    <View style={styles.mainRow}>
                        {/* <View style={styles.applianceCard}>
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
                        </View> */}
                    </View>

                    {/* <View style={styles.mainRow}>
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


                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf2fd',
    },
    scrollContainer: {
        flexGrow: 1, // Ensures the content stretches to fill the screen height
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
        color: '#9eaab8',
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
        position: 'relative',
    },
    timerLine: {
        position: 'absolute',
        width: 2,
        height: 20,
        backgroundColor: '#96a8fa',
        top: 0,
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
    cardbuttonContainer: {
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'flex-end', // Push buttons to the far right
        alignItems: 'center', // Center buttons vertically
        marginLeft: 'auto', // Ensures alignment to the right
    },
    backgroundWrapper: {
        backgroundColor: '#fff', // White background
        padding: 20, // Padding to make the background larger
        borderRadius: 15, // Rounded corners
        alignItems: 'center', // Center the card horizontally
        justifyContent: 'center', // Center the card vertically
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        margin: 0, // Space around the wrapper
    },
    statusCard: {
        flexDirection: "row", // Align elements horizontally
        alignItems: "center", // Center items vertically
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginRight: 10, // Add space between the cards
    },
    contentCard: {
        flexDirection: "row", // Align elements horizontally
        alignItems: "center", // Center items vertically
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginRight: 10, // Space between cards if needed
        width: "100%", // Adjust width to make the card wider (90% of the parent container)
        alignSelf: "center", // Center the card horizontally
        marginBottom: 10,
    },

    contentCardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
        marginRight: 10
    },
    contentCardStatus: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    iconStyle: {
        marginRight: 10,
        marginLeft: 10,
    },
    contentIconStyle: {
        marginRight: 20,
        marginLeft: 10,
    },
    statusCardText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
        marginRight: 10
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
        backgroundColor: 'red',
        borderRadius: 6,
        padding: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    reportButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
