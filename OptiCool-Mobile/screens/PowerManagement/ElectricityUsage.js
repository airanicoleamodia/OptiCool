import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DeviceInfo from "./DeviceInfo";

const ElectricityUsage = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const navigation = useNavigation();

  const weeklyData = Array.from({ length: 4 }, () => Math.random() * 50 + 20);
  const monthlyData = Array.from({ length: 2 }, () => Math.random() * 200 + 100);

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

  const menuItems = [
    {
      icon: "tachometer",
      title: "Usage Tracker",
      navigateTo: "UsageTracking",
    },
    {
      icon: "cloud",
      title: "Humidity Report",
    },
    {
      icon: "thermometer-half",
      title: "Temperature Report",
    },
  ];

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
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
          {activeTab === "weekly"
            ? renderChart(
                weeklyData.map((_, i) => `W${i + 1}`),
                weeklyData,
                "#8b3204",
                "#cd591d",
                "#e2e93e"
              )
            : renderChart(
                monthlyData.map((_, i) => `M${i + 1}`),
                monthlyData,
                "#36048b",
                "#834be0",
                "#e93e91"
              )}
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.rectangle}>
          <View style={styles.menuItem}>
            <Icon name={item.icon} size={24} color="black" style={styles.icon} />
            <Text style={styles.menuText}>{item.title}</Text>
            {item.navigateTo && (
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => navigation.navigate("UsageNavigations", { screen: "UsageTracking" })}
              >
                <Text style={styles.detailText}>Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      ListFooterComponent={<DeviceInfo />}
    />
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
    marginTop: 40,
    width: 300,
    alignSelf: "center", // Center horizontally within the parent container
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
    alignSelf: "center",
  },
  rectangle: {
    backgroundColor: "#ffffff",
    height: 80,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 0,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    alignItems: "center",
    width: 330,
    alignSelf: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    flex: 1,
  },
  detailButton: {
    backgroundColor: "#000000",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  detailText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ElectricityUsage;
