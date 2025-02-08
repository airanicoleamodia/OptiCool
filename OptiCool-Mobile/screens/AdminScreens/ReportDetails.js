import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';  // Import axios for API calls
import baseURL from '../../assets/common/baseUrl';

const ReportDetails = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${baseURL}/reports/getAllReports`);  // Corrected API URL
        setReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listContainer}>
          {/* Column Headers */}
          <View style={[styles.listItem, styles.headerRow]}>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Name</Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Email</Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Appliance</Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Date Reported</Text>
          </View>
          {/* Data Rows */}
          {reports.map((report, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listText, { flex: 1 }]}>{report.user.name}</Text>
              <Text style={[styles.listText, { flex: 1 }]}>{report.user.email}</Text>
              <Text style={[styles.listText, { flex: 1 }]}>{report.appliance}</Text>
              <Text style={[styles.listText, { flex: 1 }]}>{new Date(report.reportDate).toLocaleDateString()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebedf0",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  listContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    width: '100%',
    minWidth: 300, // Set minimum width
    maxWidth: 1000, // Extended width
    elevation: 3,
    marginTop: -20,
  },
  headerRow: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#B0BEC5",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#000",
  },
  headerColumn: {
    fontWeight: "bold",
    color: "#263238",
  },
});

export default ReportDetails;
