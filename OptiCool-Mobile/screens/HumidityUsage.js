import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Use BarChart instead of LineChart
import { SafeAreaView } from 'react-native-safe-area-context';

// Generate dummy humidity data between 30% and 70% without decimals
const generateDummyHumidityData = () => {
    const dummyData = [];
    const totalDays = 7; 
    const hoursPerDay = 10; 

    for (let day = 1; day <= totalDays; day++) {
        const hourlyHumidityInside = [];
        const hourlyHumidityOutside = [];
        for (let hour = 1; hour <= hoursPerDay; hour++) {
            hourlyHumidityInside.push(Math.floor(Math.random() * (51 - 30) + 30)); // Random inside humidity between 30 to 70%
            hourlyHumidityOutside.push(Math.floor(Math.random() * (51 - 30) + 30)); // Random outside humidity between 30 to 70%
        }
        dummyData.push({
            date: new Date(2024, 0, day), // Assuming data starts from Jan 1, 2024
            hourlyHumidityInside: hourlyHumidityInside,
            hourlyHumidityOutside: hourlyHumidityOutside,
        });
    }
    return dummyData;
};

const HumidityUsage = () => {
    const data = generateDummyHumidityData();
    const dailyHumidityInside = data[0].hourlyHumidityInside;
    const dailyHumidityOutside = data[0].hourlyHumidityOutside;

    return (
        <SafeAreaView>
            <ScrollView>

            <Text style={{ fontSize: 24, marginVertical: 8, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>HUMIDITY REPORT</Text>
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Daily Inside Humidity</Text>
                
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: Array.from({ length: dailyHumidityInside.length }, (_, i) => `H${i + 1}`),
                            datasets: [
                                {
                                    data: dailyHumidityInside,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} 
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="%"
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
                            padding: 2, // Adding padding inside the chart area
                        }}
                    />
                </ScrollView>

                {/* Label for daily outside humidity */}
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Daily Outside Humidity</Text>
                
                {/* Daily Outside Humidity Bar Chart */}
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: Array.from({ length: dailyHumidityOutside.length }, (_, i) => `H${i + 1}`),
                            datasets: [
                                {
                                    data: dailyHumidityOutside,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Outside humidity bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="%"
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
                            marginLeft: 16, // Adding margin to the left
                            marginRight: 16, // Adding margin to the right
                            padding: 8, // Adding padding inside the chart area
                        }}
                    />
                </ScrollView>

                {/* Weekly Inside Humidity */}
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Weekly Inside Humidity</Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: data.map((_, index) => `Day ${index + 1}`),
                            datasets: [
                                {
                                    data: data.map(dayData => {
                                        return Math.floor(dayData.hourlyHumidityInside.reduce((a, b) => a + b, 0) / dayData.hourlyHumidityInside.length); // No decimal values
                                    }),
                                    color: () => `rgba(0, 0, 0, 1)` // Inside humidity bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="%"
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

                {/* Weekly Outside Humidity */}
                <Text style={{ fontSize: 18, marginVertical: 8, fontWeight: 'bold', marginLeft: 10  }}>Weekly Outside Humidity</Text>
                <ScrollView horizontal>
                    <BarChart
                        data={{
                            labels: data.map((_, index) => `Day ${index + 1}`),
                            datasets: [
                                {
                                    data: data.map(dayData => {
                                        return Math.floor(dayData.hourlyHumidityOutside.reduce((a, b) => a + b, 0) / dayData.hourlyHumidityOutside.length); // No decimal values
                                    }),
                                    color: () => `rgba(0, 0, 0, 1)` // Outside humidity bars black
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 1.5} // Make the chart wider to enable scrolling
                        height={300}
                        fromZero={true} // Ensure the y-axis starts from zero
                        yAxisSuffix="%"
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

export default HumidityUsage;
