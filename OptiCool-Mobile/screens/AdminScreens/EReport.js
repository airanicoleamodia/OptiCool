import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert, Dimensions } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";

export default function EReport() {
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [latestReport, setLatestReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${baseURL}/ereports/getreport`);
      const data = response.data;

      if (response.status === 200) {
        setReports(data.reports);

        const applianceCounts = data.reports.reduce((acc, report) => {
          acc[report.appliance] = (acc[report.appliance] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(applianceCounts),
          datasets: [{ data: Object.values(applianceCounts) }],
        });

        if (data.reports.length > 0) {
          const sortedReports = [...data.reports].sort(
            (a, b) => new Date(b.reportDate) - new Date(a.reportDate)
          );
          setLatestReport(sortedReports[0]);

          Alert.alert(
            "Recent Report",
            `${sortedReports[0].appliance} reported on ${new Date(
              sortedReports[0].reportDate
            ).toDateString()}`,
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        <Card style={styles.chartCard}>
          <Card.Title
            title="Reports Overview"
            titleStyle={[styles.cardTitle, { fontSize: 16, color: "#2F80ED" }]}
          />
          <Card.Content>
            {chartData ? (
              <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 100} // Maximized width
                height={220} // Adjusted height
                yAxisLabel=""
                yAxisSuffix=""
                fromZero={true} // Ensures bars start from zero
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(47, 128, 237, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.6, // Adjusted for better spacing
                  propsForLabels: {
                    fontSize: 10, // Smaller labels to fit well
                    rotation: -15, // Rotated labels for better spacing
                  },
                  propsForDots: {
                    r: "3", // Smaller dots for better clarity
                  },
                }}
                style={{ marginVertical: 10, borderRadius: 8 }}
                showValuesOnTopOfBars // Shows values above bars
                yLabelsOffset={50} // Adjust y-axis to the left
              />
            ) : (
              <Text style={styles.loadingText}>Loading Chart...</Text>
            )}
          </Card.Content>
        </Card>

        <View style={styles.metricsContainer}>
          <Card style={[styles.metricCard, { backgroundColor: "#ffffff" }]}>
            <Text style={styles.metricText}>Reports</Text>
            <Text style={styles.metricValue}>{reports.length}</Text>
          </Card>
          <Card style={[styles.metricCard, { backgroundColor: "#ffffff" }]}>
            <Text style={styles.metricText}>Appliances</Text>
            <Text style={styles.metricValue}>
              {Object.keys(chartData?.labels || {}).length}
            </Text>
          </Card>
        </View>

        <Card style={styles.listCard}>
          <Card.Title
            title="Top Reported Appliances"
            titleStyle={[styles.cardTitle, { fontSize: 16, color: "#2F80ED" }]}
          />
          <Card.Content>
            {Object.entries(chartData?.datasets[0].data || {}).map(([appliance, count], index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listText}>{chartData.labels[index]}</Text>
                <Text style={styles.listNumber}>{count}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the title
    paddingHorizontal: 20,
    marginTop: -2,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#9eaab8",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    color: "#000000",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  metricText: {
    color: "#000000",
    fontSize: 14,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F80ED",
  },
  listCard: {
    backgroundColor: "#ffffff",
    padding: 5, // Further reduced padding
    borderRadius: 8,
    marginBottom: 100,
    width: '100%', // Keep the same width
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3, // Further reduced padding
  },
  listText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14, // Smaller font size
    color: "#000000",
  },
  listNumber: {
    fontSize: 14, // Smaller font size
    color: "#000000",
    marginRight: 10,
  },
});
