import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/FontAwesome"; // Use FontAwesome for icons or any other icon set

const ElectricityUsage = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  // Dummy data
  const weeklyData = Array.from({ length: 4 }, () => Math.random() * 50 + 20);
  const monthlyData = Array.from(
    { length: 2 },
    () => Math.random() * 200 + 100
  );

  const renderChart = (
    labels,
    data,
    backgroundColor,
    gradientFrom,
    gradientTo
  ) => (
    <LineChart
      data={{
        labels,
        datasets: [{ data }],
      }}
      width={Dimensions.get("window").width - 32}
      height={300}
      yAxisSuffix=" kWh"
      chartConfig={{
        backgroundColor: backgroundColor,
        backgroundGradientFrom: gradientFrom,
        backgroundGradientTo: gradientTo,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={styles.chart}
    />
  );

  const renderContent = () => {
    switch (activeTab) {
      case "weekly":
        return renderChart(
          weeklyData.map((_, i) => `W${i + 1}`),
          weeklyData,
          "#8b3204",
          "#cd591d",
          "#e2e93e"
        );
      case "monthly":
        return renderChart(
          monthlyData.map((_, i) => `M${i + 1}`),
          monthlyData,
          "#36048b",
          "#834be0",
          "#e93e91"
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabBox}>
        <TouchableOpacity
          onPress={() => setActiveTab("weekly")}
          style={[
            styles.tabButton,
            activeTab === "weekly" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "weekly" && styles.activeTabButtonText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("monthly")}
          style={[
            styles.tabButton,
            activeTab === "monthly" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "monthly" && styles.activeTabButtonText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chart Content */}
      {renderContent()}

      {/* Persistent Menus */}
      <View style={styles.menuContainer}>
        <View style={styles.rectangle}>
          <View style={styles.menuItem}>
            <Icon
              name="tachometer"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.menuText}>Usage Tracker</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rectangle}>
          <View style={styles.menuItem}>
            <Icon name="cloud" size={24} color="black" style={styles.icon} />
            <Text style={styles.menuText}>Humidity Report</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rectangle}>
          <View style={styles.menuItem}>
            <Icon
              name="thermometer-half"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.menuText}>Temperature Report</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebedf0",
    padding: 16,
  },
  tabBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000",
    borderRadius: 20,
    marginBottom: 10,
    padding: 5,
    marginTop: 30,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 15,
  },
  activeTabButton: {
    backgroundColor: "#ffffff",
  },
  tabButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  activeTabButtonText: {
    color: "black",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  menuContainer: {
    flexDirection: 'column', // Stack items vertically
  },
  rectangle: {
    backgroundColor: '#ffffff', // Light gray background for the rectangle
    height: 80,
    padding: 10, // Padding inside the rectangle
    borderRadius: 8, // Rounded corners
    marginBottom: 10, // Space between menu items
    elevation: 0, // Add a slight shadow for elevation (Android)
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Horizontally center content
  },
  menuItem: {
    flexDirection: 'row', // Align icon, text, and button horizontally
    alignItems: 'center', // Vertically align items
    justifyContent: 'space-between', // Space between icon/text and button
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  menuText: {
    flex: 1, // Take up remaining space
  },
  detailButton: {
    backgroundColor: '#000000', // Button background color
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  detailText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ElectricityUsage;
