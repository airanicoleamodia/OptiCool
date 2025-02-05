import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CircleContainer = () => {
  const [temperature, setTemperature] = useState(20);
  const [minutesLeft, setMinutesLeft] = useState(23);

  const circleRadius = 110;
  const circumference = 2 * Math.PI * circleRadius;
  const percentage = (temperature - 16) / (30 - 16);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View style={styles.container}>
      <Svg width="240" height="240" viewBox="0 0 240 240">
        {[...Array(60)].map((_, index) => {
          const angle = (index * 6 * Math.PI) / 180;
          const x1 = 120 + Math.cos(angle) * 110;
          const y1 = 120 + Math.sin(angle) * 110;
          const x2 = 120 + Math.cos(angle) * 105;
          const y2 = 120 + Math.sin(angle) * 105;
          return (
            <Path
              key={index}
              d={`M${x1},${y1} L${x2},${y2}`}
              stroke="#000000"
              strokeWidth="2"
            />
          );
        })}

        <Circle
          cx="120"
          cy="120"
          r={circleRadius}
          stroke="#4A90E2"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <View style={styles.innerCircle}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.label}>Celsius</Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusCard}>
          <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.iconStyle} />
          <View>
            <Text style={styles.statusCardText}>Ceiling Fan</Text>
            <Text style={styles.statusCardStatus}>Active</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.iconStyle} />
          <View>
            <Text style={styles.statusCardText}>Exhaust</Text>
            <Text style={styles.statusCardStatus}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    position: "absolute",
    top: 40, // Adjust this value to center the inner circle vertically
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  label: {
    fontSize: 12,
    color: "#9eaab8",
    marginTop: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
    marginBottom: 20,
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 10,
  },
  statusCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginRight: 10,
  },
  statusCardStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CircleContainer;
