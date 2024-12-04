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
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import HumidityUsage from './HumidityUsage';
import TemperatureUsage from './TemperatureUsage';
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
            date: new Date(2024, 0, day), 
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
            <Text style={{ fontSize: 24, marginVertical: 8, 
                fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 20, marginLeft: 5 }}>POWER CONSUMPTION REPORT</Text>

                <View>
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Daily</Text>
    
                    <LineChart
                        data={{
                            labels: Array.from({ length: hourlyData.length }, (_, i) => `H${i + 1}`),
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
                            backgroundColor: '#154003',
                            backgroundGradientFrom: '#5aa739',
                            backgroundGradientTo: '#e2e93e',
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

                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Weekly</Text>

                <View>
                    <LineChart
                        data={{
                            labels: weeklyData.map((_, index) => `W${index + 1}`),
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
                            backgroundColor: '#8b3204',
                            backgroundGradientFrom: '#cd591d',
                            backgroundGradientTo: '#e2e93e',
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

                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Monthly</Text>

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
                            backgroundColor: '#36048b',
                            backgroundGradientFrom: '#834be0',
                            backgroundGradientTo: '#e93e91',
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

                
                <HumidityUsage data={data} />
                <TemperatureUsage data={data} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ElectricityUsage;
