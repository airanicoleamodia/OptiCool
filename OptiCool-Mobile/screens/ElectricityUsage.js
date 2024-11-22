// import { View } from 'react-native'
// import React from 'react'
// import { Button, Text } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function ElectricityUsage() {

//     return (
//         <SafeAreaView>
//             <View>

//             </View>
//         </SafeAreaView>
//     )
// }




import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

// Generate dummy data
const generateDummyData = () => {
    const dummyData = [];
    const totalDays = 60; // 60 days of reports
    const hoursPerDay = 12;

    for (let day = 1; day <= totalDays; day++) {
        const hourlyUsage = [];
        for (let hour = 1; hour <= hoursPerDay; hour++) {
            hourlyUsage.push(parseFloat((Math.random() * 5 + 1).toFixed(2))); // Random usage between 1 to 6 kWh
        }
        dummyData.push({
            day: day,
            date: new Date(2024, 0, day), // Assuming data starts from Jan 1, 2024
            hourlyUsage: hourlyUsage,
        });
    }
    return dummyData;
};

// Aggregate data by week and month
const aggregateData = (data) => {
    const weeklyData = [];
    const monthlyData = [];

    let weekTotal = 0;
    let monthTotal = 0;
    let weekCount = 0;

    data.forEach((dayData, index) => {
        const dailyTotal = dayData.hourlyUsage.reduce((a, b) => a + b, 0);
        weekTotal += dailyTotal;
        monthTotal += dailyTotal;

        if ((index + 1) % 5 === 0) {
            weeklyData.push(parseFloat(weekTotal.toFixed(2)));
            weekTotal = 0;
            weekCount += 1;
        }

        if (weekCount === 4) {
            monthlyData.push(parseFloat(monthTotal.toFixed(2)));
            monthTotal = 0;
            weekCount = 0;
        }
    });

    return { weeklyData, monthlyData };
};

const ElectricityUsage = () => {
    const data = generateDummyData();
    const { weeklyData, monthlyData } = aggregateData(data);

    // Hourly data for the first day
    const hourlyData = data[0].hourlyUsage;

    return (
        <SafeAreaView>
            <ScrollView>
                {/* Hourly Chart */}
                <View>
                    <LineChart
                        data={{
                            labels: Array.from({ length: hourlyData.length }, (_, i) => `Hr ${i + 1}`),
                            datasets: [
                                {
                                    data: hourlyData,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={300}
                        yAxisSuffix=" kWh"
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>

                {/* Weekly Chart */}
                <View>
                    <LineChart
                        data={{
                            labels: weeklyData.map((_, index) => `Week ${index + 1}`),
                            datasets: [
                                {
                                    data: weeklyData,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={300}
                        yAxisSuffix=" kWh"
                        chartConfig={{
                            backgroundColor: '#1e2923',
                            backgroundGradientFrom: '#08130d',
                            backgroundGradientTo: '#1e2923',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>

                {/* Monthly Chart */}
                <View>
                    <LineChart
                        data={{
                            labels: monthlyData.map((_, index) => `Month ${index + 1}`),
                            datasets: [
                                {
                                    data: monthlyData,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={300}
                        yAxisSuffix=" kWh"
                        chartConfig={{
                            backgroundColor: '#022173',
                            backgroundGradientFrom: '#1E3A8A',
                            backgroundGradientTo: '#3B82F6',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ElectricityUsage;
