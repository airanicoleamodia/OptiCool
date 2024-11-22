import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ElectricityUsage() {

    return (
        <SafeAreaView>
            <View>

            </View>
        </SafeAreaView>
    )
}

// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView, Animated } from 'react-native';
// import { Text, Card, Title, Button, DataTable } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LineChart } from 'react-native-chart-kit';
// import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

// // Dummy Data
// const electricityConsumptionData = {
//   day: Array.from({ length: 24 }, (_, index) => ({
//     hour: `${index}:00`,
//     usage_kWh: (Math.random() * 1.5 + 1.5).toFixed(2),
//   })),
//   week: Array.from({ length: 30 }, (_, index) => {
//     const dailyUsage = Array.from({ length: 24 }, (_, i) => parseFloat((Math.random() * 1.5 + 1.5).toFixed(2)));
//     const totalUsage = dailyUsage.reduce((sum, current) => sum + current, 0);
//     const cost = (totalUsage * 0.8).toFixed(2); // Example: Cost per kWh = 0.8

//     return {
//       date: `2024-11-${(index + 1).toString().padStart(2, '0')}`,
//       usage_kWh: totalUsage.toFixed(2),
//       cost: cost,
//     };
//   }),
//   month: Array.from({ length: 30 }, (_, index) => {
//     const weeklyData = electricityConsumptionData.week.slice(index * 7, (index + 1) * 7); // Select 7 days for each week
//     const totalUsageForMonth = weeklyData.reduce((sum, record) => sum + parseFloat(record.usage_kWh), 0);
//     const totalCostForMonth = weeklyData.reduce((sum, record) => sum + parseFloat(record.cost), 0);

//     return {
//       date: `2024-11-${(index + 1).toString().padStart(2, '0')}`,
//       usage_kWh: totalUsageForMonth.toFixed(2),
//       cost: totalCostForMonth.toFixed(2),
//     };
//   }),
// };

// const ElectricityUsage = () => {
//   const [view, setView] = useState('week'); // Default view is weekly
//   const scale = new Animated.Value(1); // To control the zoom scale

//   // Handle pinch gesture scaling
//   const onPinchGestureEvent = Animated.event(
//     [{ nativeEvent: { scale } }],
//     { useNativeDriver: true }
//   );

//   // Prepare data for the chart
//   const prepareChartData = (data) => {
//     return {
//       labels: data ? data.map((record) => record.hour || record.date) : [],
//       datasets: [
//         {
//           data: data ? data.map((record) => parseFloat(record.usage_kWh)) : [],
//         },
//       ],
//     };
//   };

//   // Check if data exists for the selected view, and prepare the chart data
//   const chartData = prepareChartData(electricityConsumptionData[view] || []); // Add fallback to avoid undefined error

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.buttonsContainer}>
//           <Button mode="contained" onPress={() => setView('day')}>
//             Daily
//           </Button>
//           <Button mode="contained" onPress={() => setView('week')}>
//             Weekly
//           </Button>
//           <Button mode="contained" onPress={() => setView('month')}>
//             Monthly
//           </Button>
//         </View>

//         <View style={styles.reportContainer}>
//           <GestureHandlerRootView style={{ flex: 1 }}>
//             <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
//               <Animated.View style={{ transform: [{ scale }] }}>
//                 <LineChart
//                   data={chartData}
//                   width={350}
//                   height={220}
//                   chartConfig={{
//                     backgroundColor: '#e26a00',
//                     backgroundGradientFrom: '#fb8c00',
//                     backgroundGradientTo: '#ffdd00',
//                     decimalPlaces: 2,
//                     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                     style: {
//                       borderRadius: 16,
//                     },
//                   }}
//                   style={styles.chart}
//                 />
//               </Animated.View>
//             </PinchGestureHandler>
//           </GestureHandlerRootView>

//           {/* Data Table */}
//           <Card style={styles.card}>
//             <Title style={styles.cardTitle}>{`${view.charAt(0).toUpperCase() + view.slice(1)} Report`}</Title>
//             <DataTable>
//               <DataTable.Header>
//                 <DataTable.Title>{view === 'day' ? 'Hour' : 'Date'}</DataTable.Title>
//                 <DataTable.Title numeric>Usage (kWh)</DataTable.Title>
//               </DataTable.Header>

//               {electricityConsumptionData[view] && electricityConsumptionData[view].map((record, index) => (
//                 <DataTable.Row key={index}>
//                   <DataTable.Cell>{record.hour || record.date}</DataTable.Cell>
//                   <DataTable.Cell numeric>{record.usage_kWh}</DataTable.Cell>
//                 </DataTable.Row>
//               ))}
//             </DataTable>
//           </Card>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 10,
//   },
//   scrollView: {
//     paddingBottom: 20,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   reportContainer: {
//     marginTop: 10,
//   },
//   card: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   chart: {
//     marginBottom: 20,
//   },
// });

// export default ElectricityUsage;
