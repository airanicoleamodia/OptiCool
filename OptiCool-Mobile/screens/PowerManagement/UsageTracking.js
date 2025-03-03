import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import dmt3API from "../../services/dmt3API"; // Import the API

const UsageTracking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [todayUsage, setTodayUsage] = useState(null);
  const [monthlyUsage, setMonthlyUsage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [powerData, setPowerData] = useState([]);

  useEffect(() => {
    console.log("Component mounted, fetching initial data...");
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.40.74:5000/power-consumption"); // Your API endpoint
      const data = await response.json();
  
      const labels = data.map((item) => item.timestamp.slice(11, 16)); // Extract time
      const values = data.map((item) => item.consumption);
  
      setChartData({
        labels: labels.length ? labels : ["No Data"],
        datasets: [{ data: values.length ? values : [0] }],
      });
  
      // Calculate today's and monthly usage
      setTodayUsage(values.length ? values[values.length - 1] : 0);
      setMonthlyUsage(values.reduce((acc, curr) => acc + curr, 0) / values.length);
      setPowerData(data); // Set power data for the table
    } catch (error) {
      Alert.alert("Error", "Failed to fetch usage data");
      console.error("Error fetching usage data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log("Search button pressed, fetching data for new date range...");
    fetchUsageData();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.icon}>🔌</Text>
              <Text style={styles.label}>Today</Text>
              <Text style={styles.value}>{todayUsage ? `${todayUsage} kWh` : "N/A"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.icon}>⚡</Text>
              <Text style={styles.label}>This Month</Text>
              <Text style={styles.value}>{monthlyUsage ? `${monthlyUsage.toFixed(2)} kWh` : "N/A"}</Text>
            </View>
          </View>

          <BarChart
            data={chartData || { labels: ["No Data"], datasets: [{ data: [0] }] }}
            width={Dimensions.get("window").width - 20}
            height={220}
            yAxisLabel="kW"
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientTo: "#08130D",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={styles.chart}
          />

          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={() => setOpenStartPicker(true)}
              style={styles.dateBox}
            >
              <Text style={styles.dateText}>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            <Text style={styles.dateRangeDivider}>To</Text>
            <TouchableOpacity
              onPress={() => setOpenEndPicker(true)}
              style={styles.dateBox}
            >
              <Text style={styles.dateText}>{endDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {openStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenStartPicker(false);
                if (selectedDate) setStartDate(selectedDate);
                console.log("Start date selected:", selectedDate);
              }}
            />
          )}

          {openEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenEndPicker(false);
                if (selectedDate) setEndDate(selectedDate);
                console.log("End date selected:", selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Power Consumption Data</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Timestamp</Text>
              <Text style={styles.tableHeaderText}>Consumption (kWh)</Text>
            </View>
            {powerData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{new Date(item.timestamp).toLocaleString()}</Text>
                <Text style={styles.tableCell}>{item.consumption}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  dateBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#000000",
  },
  dateRangeDivider: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    marginTop: 30,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10, 
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 0.5,
    backgroundColor: '#ccc',
    height: '60%',
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 18,
    marginBottom: 3,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: "center",
    color: "#000000",
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 14,
  },
});

export default UsageTracking;