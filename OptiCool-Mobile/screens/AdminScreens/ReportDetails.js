import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"; // Import axios for API calls
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for the logo
import baseURL from "../../assets/common/baseUrl";
import io from "socket.io-client"; // Import socket.io-client

const socket = io(baseURL); // Initialize socket.io

const ReportDetails = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${baseURL}/ereports/getreport`, {
          params: {
            populate: "user", // Populate the user field
          },
        });
        const sortedReports = response.data.reports.sort(
          (a, b) => new Date(b.reportDate) - new Date(a.reportDate)
        );
        console.log("Fetched Reports:", sortedReports); // Log the fetched reports
        setReports(sortedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleMoreDetails = (report) => {
    console.log("Selected Report:", report); // Log the selected report
    setSelectedReport(report);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReport(null);
  };

  const handleSolveReport = async () => {
    try {
      // Send a notification to the user through socket.io
      socket.emit("reportSolved", {
        userId: selectedReport.user._id,
        message: `Your report for ${selectedReport.appliance} has been marked as solved.`,
      });

      Alert.alert("Report Solved", "The report has been marked as solved and the user has been notified.");
      closeModal();
    } catch (error) {
      console.error("Error solving report:", error);
      Alert.alert("Error", "There was an error marking the report as solved. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listContainer}>
          {/* Column Headers */}
          <View style={[styles.listItem, styles.headerRow]}>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>
              Appliance
            </Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>
              Status
            </Text>
            <Text style={[styles.listText, styles.headerColumn, { flex: 1 }]}>
              Details
            </Text>
          </View>
          {/* Data Rows */}
          {reports.map((report, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.listText, { flex: 1 }]}>
                {report.appliance}
              </Text>
              <Text style={[styles.listText, { flex: 1 }]}>
                {report.status}
              </Text>
              <TouchableOpacity
                style={styles.moreDetailsButton}
                onPress={() => handleMoreDetails(report)}
              >
                <MaterialIcons name="info" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {selectedReport && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Report Details</Text>
              <Text style={styles.modalText}>
                Date Reported: {new Date(selectedReport.reportDate).toLocaleDateString()}
              </Text>
              <Text style={styles.modalText}>
                Time Reported: {selectedReport.timeReported}
              </Text>
              <Text style={styles.modalText}>
                Reported By: {selectedReport.user ? `${selectedReport.user.username} - ${selectedReport.user.email}` : "Unknown"}
              </Text>
              <TouchableOpacity style={styles.solveButton} onPress={handleSolveReport}>
                <Text style={styles.solveButtonText}>Mark as Solved</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    width: "100%",
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
  moreDetailsButton: {
    flex: 1,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  solveButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    borderRadius: 5,
  },
  solveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ReportDetails;
