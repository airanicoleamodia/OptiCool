import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainRow = ({ weatherData }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.mainRow}>
        <View style={styles.weatherCard}>
          <Text style={styles.cityTemp}>27.60°</Text>
          <Text style={styles.cityName}>Taguig City</Text>
        </View>
        <View style={styles.applianceCard}>
          <Text style={styles.applianceText}>Air Condition</Text>
          <Text style={styles.applianceStatus}>Status: Active</Text>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.applianceCard}>
          <Text style={styles.applianceText}>Fans</Text>
          <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
        </View>
        <View style={styles.emptyCard} />
      </View>

      {/* Temperature Details */}
      <View style={styles.mainRow}>
        <View style={styles.weatherCard}>
          <Text style={styles.cityTemp}>
            {weatherData?.Temperature?.Metric?.Value || "--"}°C
          </Text>
          <Text style={styles.cityName}>Taguig City</Text>
        </View>
        <View style={styles.applianceCard}>
          <Text style={styles.applianceText}>Air Condition</Text>
          <Text style={styles.applianceStatus}>Status: Active</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 0,
    width: "100%",
  },
  weatherCard: {
    backgroundColor: "#b3e5fc",
    borderRadius: 20,
    padding: 16,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    minWidth: "45%", // Ensure minimum width
  },
  cityTemp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  cityName: {
    fontSize: 16,
    color: "#000",
  },
  applianceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: "center",
    minWidth: "45%", // Ensure minimum width
  },
  applianceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  applianceStatus: {
    color: "green",
  },
  applianceStatusInactive: {
    color: "red",
  },
  emptyCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginLeft: 10,
    minWidth: "45%", // Ensure minimum width
  },
});

export default MainRow;
