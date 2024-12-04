import React from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Use BarChart instead of LineChart
import { SafeAreaView } from 'react-native-safe-area-context';

// Generate dummy temperature data between 16°C and 45°C without decimals
const generateDummyTemperatureData = () => {
    const dummyData = [];
    const totalDays = 7; 
    const hoursPerDay = 10; 

    for (let day = 1; day <= totalDays; day++) {
        const hourlyTemperatureInside = [];
        const hourlyTemperatureOutside = [];
        for (let hour = 1; hour <= hoursPerDay; hour++) {
            hourlyTemperatureInside.push(Math.floor(Math.random() * (45 - 16) + 16)); // Random inside temp between 16°C to 45°C
            hourlyTemperatureOutside.push(Math.floor(Math.random() * (45 - 16) + 16)); // Random outside temp between 16°C to 45°C
        }
        dummyData.push({
            date: new Date(2024, 0, day), // Assuming data starts from Jan 1, 2024
            hourlyTemperatureInside: hourlyTemperatureInside,
            hourlyTemperatureOutside: hourlyTemperatureOutside,
        });
    }
    return dummyData;
};

const TemperatureUsage = () => {
    const data = generateDummyTemperatureData();
    const dailyTemperatureInside = data[0].hourlyTemperatureInside;
    const dailyTemperatureOutside = data[0].hourlyTemperatureOutside;

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={{ fontSize: 24, marginVertical: 8, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                    TEMPERATURE REPORT
                </Text>

                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10 }}>
                    Daily Inside
                </Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: Array.from({ length: dailyTemperatureInside.length }, (_, i) => `H${i + 1}`),
                            datasets: [
                                {
                                    data: dailyTemperatureInside,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} 
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="°C"
                        chartConfig={{
                            backgroundColor: '#3c0f65',
                            backgroundGradientFrom: '#9564c2',
                            backgroundGradientTo: '#e982e0',
                            decimalPlaces: 0, 
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Inside bars color black
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginLeft: 16, // Adding margin to the left
                            marginRight: 16, // Adding margin to the right
                            padding: 2, // Adding padding inside the chart area
                        }}
                    />
                </ScrollView>

                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10 }}>
                    Daily Outside
                </Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: Array.from({ length: dailyTemperatureOutside.length }, (_, i) => `H${i + 1}`),
                            datasets: [
                                {
                                    data: dailyTemperatureOutside,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Outside temperature bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="°C"
                        chartConfig={{
                            backgroundColor: '#0a250e',
                            backgroundGradientFrom: '#09791a',
                            backgroundGradientTo: '#accb32',
                            decimalPlaces: 0, 
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Outside bars color black
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginLeft: 16, // Adding margin to the left
                            marginRight: 16, // Adding margin to the right
                            padding: 8, // Adding padding inside the chart area
                        }}
                    />
                </ScrollView>

                {/* Weekly Inside Temperature */}
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10 }}>
                    Weekly Inside 
                </Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: data.map((_, index) => `Day ${index + 1}`),
                            datasets: [
                                {
                                    data: data.map(dayData => {
                                        return Math.floor(dayData.hourlyTemperatureInside.reduce((a, b) => a + b, 0) / dayData.hourlyTemperatureInside.length); // No decimal values
                                    }),
                                    color: () => `rgba(0, 0, 0, 1)` // Inside temperature bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="°C"
                        chartConfig={{
                            backgroundColor: '#002569',
                            backgroundGradientFrom: '#4f8bf9',
                            backgroundGradientTo: '#cff7fa',
                            decimalPlaces: 0, // No decimals
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Inside bars color black
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginLeft: 16, // Adding margin to the left
                            marginRight: 16, // Adding margin to the right
                            padding: 8, // Adding padding inside the chart area
                        }}
                    />
                </ScrollView>

                {/* Weekly Outside Temperature */}
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10 }}>
                    Weekly Outside 
                </Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: data.map((_, index) => `Day ${index + 1}`),
                            datasets: [
                                {
                                    data: data.map(dayData => {
                                        return Math.floor(dayData.hourlyTemperatureOutside.reduce((a, b) => a + b, 0) / dayData.hourlyTemperatureOutside.length); // No decimal values
                                    }),
                                    color: () => `rgba(0, 0, 0, 1)` // Outside temperature bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="°C"
                        chartConfig={{
                            backgroundColor: '#690000',
                            backgroundGradientFrom: '#ab4444',
                            backgroundGradientTo: '#f7facf',
                            decimalPlaces: 0, // No decimals
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Outside bars color black
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginLeft: 16, 
                            marginRight: 16, 
                            padding: 5,
                        }}
                    />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TemperatureUsage;
