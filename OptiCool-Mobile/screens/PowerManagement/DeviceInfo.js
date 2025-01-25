import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const devices = [
  { id: '1', name: 'Aircon', time: '1h 45m', power: '0.002kWh' },
  { id: '2', name: 'Fan', time: '1h 50m', power: '0.023kWh' },
  { id: '3', name: 'Exhaust (Inwards)', time: '1h 55m', power: '0.012kWh' },
  { id: '4', name: 'Exhaust (Outwards)', time: '2h 02m', power: '0.005kWh' },
];

export default function DeviceInfo() {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🖥️</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceTime}>{item.time}</Text>
        </View>
        <Text style={styles.powerUsage}>{item.power}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Appliances Status</Text>
        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={true} // Enables proper scrolling inside ScrollView
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedf0',
  },
  scrollContent: {
    padding: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 0,
    width: 320,
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceTime: {
    fontSize: 14,
    color: '#777',
  },
  powerUsage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
