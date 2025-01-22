import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit'; // Import BarChart
// import UsersAll from './UsersAll';

export default function EReport() {
    const [reports, setReports] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [latestReport, setLatestReport] = useState(null);

    // Fetch all reports and show the pop-up notification every time the component comes into focus
    useFocusEffect(
        React.useCallback(() => {
            const fetchReports = async () => {
                try {
                    // Fetch the reports from the server
                    const response = await axios.get(`${baseURL}/ereports/getreport`);
                    const data = response.data;

                    if (response.status === 200) {
                        setReports(data.reports);

                        // Aggregate data for the chart
                        const applianceCounts = data.reports.reduce((acc, report) => {
                            acc[report.appliance] = (acc[report.appliance] || 0) + 1;
                            return acc;
                        }, {});

                        const frequencies = Object.values(applianceCounts);

                        // Ensure y-axis starts at 1 by including at least a frequency of 1 in the dataset
                        const adjustedFrequencies = frequencies.length > 0 ? frequencies.concat(1) : [1];

                        setChartData({
                            labels: Object.keys(applianceCounts).map(label =>
                                label.length > 5 ? label.slice(0, 5) + '...' : label
                            ), // Truncate labels if they exceed 5 characters
                            datasets: [
                                {
                                    data: adjustedFrequencies,
                                },
                            ],
                        });

                        if (data.reports.length > 0) {
                            // Sort reports by date (descending order) and get the most recent report
                            const sortedReports = [...data.reports].sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
                            setLatestReport(sortedReports[0]); // Set the most recent report

                            // Show the pop-up notification for the most recent report
                            const appliance = sortedReports[0].appliance;
                            const reportDate = formatDate(sortedReports[0].reportDate);
                            const reportTime = sortedReports[0].reportTime;

                            Alert.alert(
                                "Recent Report",
                                `${appliance} has been reported at ${reportDate} ${reportTime}`,
                                [{ text: "OK", onPress: () => console.log(`${appliance} report acknowledged`) }],
                                { cancelable: false }
                            );
                        }
                    } else {
                        console.error('Error fetching reports:', data.message);
                    }
                } catch (error) {
                    console.error('Error fetching reports:', error);
                }
            };

            fetchReports();
        }, [])
    );

    // Function to format the report date to only show month and day
    const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options); // Format to "Month Day"
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.view}>
                    <Card style={styles.card}>
                        <Card.Title
                            title="Reports Overview"
                            titleStyle={styles.cardTitle}
                        />
                        <Card.Content>
                            {chartData ? (
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <BarChart
                                        data={{
                                            labels: chartData.labels,
                                            datasets: chartData.datasets,
                                        }}
                                        width={Dimensions.get('window').width} // Set width to 100% of screen
                                        height={400} // Increased height to ensure labels are fully visible
                                        fromZero={false}
                                        yAxisInterval={1}
                                        chartConfig={{
                                            backgroundColor: '#1cc910',
                                            backgroundGradientFrom: '#eff3ff',
                                            backgroundGradientTo: '#efefef',
                                            decimalPlaces: 0, // No decimals
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            style: {
                                                borderRadius: 5,
                                            },
                                            propsForBackgroundLines: {
                                                strokeDasharray: '', // Solid gridlines
                                            },
                                            barPercentage: 1,
                                            categoryPercentage: 0.5,
                                        }}
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 5,
                                            alignItems: 'flex-start',
                                            paddingVertical: 30, // Remove any extra left padding

                                        }}
                                        verticalLabelRotation={270} // Rotate the labels to be vertical
                                        horizontal={true} // Make the bars horizontal
                                    />
                                </ScrollView>
                            ) : (
                                <View>
                                    <Text>Loading chart...</Text>
                                </View>
                            )}
                        </Card.Content>
                    </Card>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 10,
    },
    view: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
