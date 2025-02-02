import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons

const StatusCard = () => {
  return (
    <View style={styles.wrapper}>
      {/* Today Label */}
      <Text style={styles.todayText}>Today</Text>

      <View style={styles.cardContainer}>
        {/* Date and Location */}
        <View style={styles.dateLocationContainer}>
          <Text style={styles.dateText}>4th Jan 2022</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#4f5e70" />
            <Text style={styles.locationText}>Philippines, 34°C</Text>
          </View>
        </View>

        {/* Weather Description */}
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            It’s sunny today, make the most out of daylight.
          </Text>
          <Ionicons name="sunny-outline" size={24} color="#FFA500" />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Energy Stats */}
        <View style={styles.energyContainer}>
          <Text style={styles.energySaved}>
            ⚡ 90 watt saved
          </Text>
          <Text style={styles.energyUsed}>
            ⚡ 110 watt used
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 40,
  },
  todayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4f5e70",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: "6%",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    width: "88%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  dateLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4f5e70",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4f5e70",
    marginLeft: 5,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  weatherText: {
    fontSize: 12,
    color: "#4f5e70",
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  energyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  energySaved: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00AA00",
  },
  energyUsed: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D9534F",
  },
});

export default StatusCard;
