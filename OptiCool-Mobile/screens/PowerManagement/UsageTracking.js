import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const UsageTracking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartPicker, setOpenStartPicker] = useState(false);
  const [openEndPicker, setOpenEndPicker] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [20, 35, 15, 40, 75, 90, 30], // Dummy data for kWh
      },
    ],
  });

  const [todayUsage, setTodayUsage] = useState(93); // Example data for today's usage in kWh
  const [monthlyUsage, setMonthlyUsage] = useState(970.422); // Example data for monthly usage in kWh

  const handleSearch = () => {
    // Simulate fetching data for the selected date range
    // Update the chartData, totalUsage, and totalCost here if using real API
    alert(
      `Fetching data from ${startDate.toDateString()} to ${endDate.toDateString()}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Dropdown or Selector */}
      <TextInput style={styles.input} placeholder="Select" editable={true} />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        {/* Today's Usage */}
        <View style={styles.summaryItem}>
          <Text style={styles.icon}>🔌</Text>
          <Text style={styles.label}>Today</Text>
          <Text style={styles.value}>{todayUsage} kWh</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* This Month's Usage */}
        <View style={styles.summaryItem}>
          <Text style={styles.icon}>⚡</Text>
          <Text style={styles.label}>This Month</Text>
          <Text style={styles.value}>{monthlyUsage.toFixed(2)} kWh</Text>
        </View>
      </View>

      {/* Chart */}
      <BarChart
        data={chartData}
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

      {/* Date Range Picker */}
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

      {/* Start Date Picker */}
      {openStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setOpenStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* End Date Picker */}
      {openEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setOpenEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "45%", // Adjust as needed for spacing
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
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, // Reduced padding
    backgroundColor: '#f9f9f9',
    borderRadius: 8, // Smaller corners
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%', // Optional: Adjust width for a smaller container
    alignSelf: 'center', // Center the container horizontally
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 0.5, // Thinner vertical line
    backgroundColor: '#ccc',
    height: '60%', // Smaller height to match the reduced size
    marginHorizontal: 5, // Reduced spacing
  },
  icon: {
    fontSize: 18, // Smaller icon
    marginBottom: 3, // Reduced margin
  },
  label: {
    fontSize: 12, // Smaller label text
    color: '#888',
    marginBottom: 2,
  },
  value: {
    fontSize: 14, // Smaller value text
    fontWeight: 'bold',
  },
});

export default UsageTracking;
