// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, Alert } from 'react-native';
// import { DataTable, Card } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import axios from 'axios'; // Import axios
// import baseURL from '../../assets/common/baseUrl'; // Adjust the path accordingly
// import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
// import opticoolImage from '../../assets/opticool.png';
// import {ImageBackground } from 'react-native';

// export default function EReport() {
//     const [reports, setReports] = useState([]);
//     const [latestReport, setLatestReport] = useState(null);

//     // Fetch all reports and show the pop-up notification every time the component comes into focus
//     useFocusEffect(
//         React.useCallback(() => {
//             const fetchReports = async () => {
//                 try {
//                     // Replace with the correct endpoint for fetching reports
//                     const response = await axios.get(`${baseURL}/ereports/getreport`); // Ensure your baseURL is correct
//                     const data = response.data;

//                     if (response.status === 200) {
//                         setReports(data.reports); // Set reports data
//                         if (data.reports.length > 0) {
//                             // Sort reports by date (descending order) and get the most recent report
//                             const sortedReports = [...data.reports].sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
//                             setLatestReport(sortedReports[0]); // Set the most recent report

//                             // Show the pop-up notification for the most recent report
//                             const appliance = sortedReports[0].appliance;
//                             const reportDate = formatDate(sortedReports[0].reportDate);
//                             const reportTime = sortedReports[0].reportTime;

//                             Alert.alert(
//                                 "Recent Report",
//                                 `${appliance} has been reported at ${reportDate} ${reportTime}`,
//                                 [{ text: "OK", onPress: () => console.log(`${appliance} report acknowledged`) }],
//                                 { cancelable: false }
//                             );
//                         }
//                     } else {
//                         console.error('Error fetching reports:', data.message);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching reports:', error);
//                 }
//             };

//             fetchReports(); // Trigger the fetch operation on focus
//         }, []) // Empty dependency array ensures this runs every time the screen comes into focus
//     );

//     // Function to format the report date to only show month and day
//     const formatDate = (date) => {
//         const options = { month: 'short', day: 'numeric' };
//         return new Date(date).toLocaleDateString(undefined, options); // Format to "Month Day"
//     };

//     return (
//         <SafeAreaView style={styles.container}>

//             <ImageBackground
//                 source={opticoolImage}
//                 style={styles.background}
//                 resizeMode="cover"
//             >
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.view}>
//                     <Card style={styles.card}>
//                         <Card.Title title="All Reports" titleStyle={styles.cardTitle} />
//                         <Card.Content>
//                             <DataTable>
//                                 <DataTable.Header>
//                                     <DataTable.Title style={[styles.tableTitle, styles.flexColumn]}>Appliance</DataTable.Title>
//                                     <DataTable.Title style={[styles.tableTitle, styles.flexColumn]}>Date</DataTable.Title>
//                                     <DataTable.Title style={[styles.tableTitle, styles.flexColumn]}>Time</DataTable.Title>
//                                 </DataTable.Header>

//                                 {reports.map((report, index) => (
//                                     <DataTable.Row key={index}>
//                                         <DataTable.Cell style={styles.flexColumn}>{report.appliance}</DataTable.Cell>
//                                         <DataTable.Cell style={styles.flexColumn}>{formatDate(report.reportDate)}</DataTable.Cell>
//                                         <DataTable.Cell style={styles.flexColumn}>{report.reportTime}</DataTable.Cell>
//                                     </DataTable.Row>
//                                 ))}
//                             </DataTable>
//                         </Card.Content>
//                     </Card>
//                 </View>
//             </ScrollView>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
//     scrollContainer: {
//         padding: 10,
//     },
//     view: {
//         marginBottom: 20,
//         justifyContent: 'space-evenly',
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         elevation: 5,
//     },
//     cardTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     tableTitle: {
//         fontWeight: 'bold',
//         color: '#555',
//     },
//     flexColumn: {
//         flex: 1,
//         justifyContent: 'center', 
//     },
// });






import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';
import { Card , Text} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit'; // Import BarChart
import opticoolImage from '../../assets/opticool.png';

export default function EReport() {
    const [reports, setReports] = useState([]);
    const [chartData, setChartData] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchReports = async () => {
                try {
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
                            labels: Object.keys(applianceCounts),
                            datasets: [
                                {
                                    data: adjustedFrequencies,
                                },
                            ],
                        });
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

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={opticoolImage} style={styles.background} resizeMode="cover">
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.view}>
                        <Card style={styles.card}>
                            <Card.Title title="Reports Overview" titleStyle={styles.cardTitle} />
                            <Card.Content>
                                {chartData ? (
                                    <BarChart
                                        data={{
                                            labels: chartData.labels,
                                            datasets: chartData.datasets,
                                        }}
                                        width={Dimensions.get('window').width - 20} // Adjust chart width
                                        height={220}
                                        fromZero={false} // Ensure the chart doesn’t start from zero
                                        yAxisInterval={1} // Increment y-axis by 1
                                        chartConfig={{
                                            backgroundColor: '#1cc910',
                                            backgroundGradientFrom: '#eff3ff',
                                            backgroundGradientTo: '#efefef',
                                            decimalPlaces: 0, // No decimals
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            style: {
                                                borderRadius: 8,
                                            },
                                            propsForBackgroundLines: {
                                                strokeDasharray: '', // Solid gridlines
                                            },
                                        }}
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 8,
                                        }}
                                        verticalLabelRotation={0} // Keep labels horizontal
                                    />
                                ) : (
                                    <View>
                                        <Text>Loading chart...</Text>
                                    </View>
                                )}
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>
            </ImageBackground>
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
        justifyContent: 'space-evenly',
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
    background: {
        flex: 1,
    },
});
