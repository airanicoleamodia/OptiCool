import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';  // Import axios for API calls
import baseURL from '../../assets/common/baseUrl';

const ReportDetails = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  const fetchReports = async (page) => {
    try {
      const response = await axios.get(`${baseURL}/ereports/getreport?page=${page}`);  // Corrected API URL
      const sortedReports = response.data.reports.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
      setReports(sortedReports);
      setTotalPages(response.data.totalPages);
      setTotalReports(response.data.totalReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listContainer}>
          {/* Column Headers */}
          <View style={[styles.listItem, styles.headerRow]}>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Appliance</Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Status</Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>Date Reported</Text>
          </View>
          {/* Data Rows */}
          {reports.map((report, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listText, { flex: 1 }]}>{report.appliance}</Text>
              <Text style={[styles.listText, { flex: 1 }]}>{report.status}</Text>
              <Text style={[styles.listText, { flex: 1 }]}>{new Date(report.reportDate).toLocaleDateString()}</Text>
            </View>
          ))}
        </View>
        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
            <Text style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>Page {currentPage} of {totalPages} (Total Reports: {totalReports})</Text>
          <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
            <Text style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}>Next</Text>
          </TouchableOpacity>
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  paginationButton: {
    fontSize: 16,
    color: "#2F80ED",
  },
  disabledButton: {
    color: "#ccc",
  },
  paginationText: {
    fontSize: 16,
    color: "#000",
  },
});

export default ReportDetails;
