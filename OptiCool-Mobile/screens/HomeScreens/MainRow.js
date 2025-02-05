import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const WeatherCard = ({ weatherData, onPress }) => {
  const temperature = weatherData?.Temperature?.Metric?.Value || "--";
  const weatherText = weatherData?.WeatherText || "Light Rain Shower";
  const weatherIcon = weatherData?.WeatherIcon || "rainy";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']} // Gradient colors for lifelike background
        style={styles.gradient}
      >
        <View style={styles.row}>
          <Image source={getWeatherIcon(weatherIcon)} style={styles.icon} />
          <View style={styles.column}>
            <Text style={styles.temperature}>{temperature}°C</Text>
            <Text style={styles.description}>{weatherText}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getWeatherIcon = (weatherType) => {
  switch (String(weatherType).toLowerCase()) {
    case "sunny":
      return require("../../assets/sunny.png");
    case "cloudy":
      return require("../../assets/cloudy.png");
    case "rainy":
      return require("../../assets/rainy.png");
    default:
      return require("../../assets/cloudy.png");
  }
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: 130,
    borderRadius: 20,
    overflow: 'hidden', // Ensure the gradient doesn't overflow the card
    marginVertical: 10,
  },
  gradient: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  temperature: {
    fontSize: 40, // Increase font size
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "monospace", // Use monospace font for digital clock effect
  },
  description: {
    fontSize: 14,
    color: "#fff",
  },
});

export default WeatherCard;
