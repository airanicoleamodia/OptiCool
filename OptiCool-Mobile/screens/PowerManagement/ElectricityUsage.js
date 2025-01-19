import React from "react";
import { View, Dimensions, FlatList, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import UsageTracking from "./UsageTracking";
import DeviceInfo from "./DeviceInfo";
import HumidityUsage from "./HumidityUsage";
import TemperatureUsage from "./TemperatureUsage";

const generateDummyData = () => {
  const dummyData = [];
  const totalDays = 60;
  const hoursPerDay = 12;

  for (let day = 1; day <= totalDays; day++) {
    const hourlyUsage = [];
    for (let hour = 1; hour <= hoursPerDay; hour++) {
      hourlyUsage.push(parseFloat((Math.random() * 5 + 1).toFixed(2)));
    }
    dummyData.push({
      day: day,
      date: new Date(2024, 0, day),
      hourlyUsage: hourlyUsage,
    });
  }
  return dummyData;
};

const aggregateData = (data) => {
  const weeklyData = [];
  const monthlyData = [];

  let weekTotal = 0;
  let monthTotal = 0;
  let weekCount = 0;

  data.forEach((dayData, index) => {
    const dailyTotal = dayData.hourlyUsage.reduce((a, b) => a + b, 0);
    weekTotal += dailyTotal;
    monthTotal += dailyTotal;

    if ((index + 1) % 5 === 0) {
      weeklyData.push(parseFloat(weekTotal.toFixed(2)));
      weekTotal = 0;
      weekCount += 1;
    }

    if (weekCount === 4) {
      monthlyData.push(parseFloat(monthTotal.toFixed(2)));
      monthTotal = 0;
      weekCount = 0;
    }
  });

  return { weeklyData, monthlyData };
};

const ElectricityUsage = () => {
  const data = generateDummyData();
  const { weeklyData, monthlyData } = aggregateData(data);
  const hourlyData = data[0].hourlyUsage;

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "usageTracking":
        return <UsageTracking />;
      case "deviceInfo":
        return <DeviceInfo />;
      case "lineChart":
        return (
          <LineChart
            data={{
              labels: item.labels,
              datasets: [{ data: item.data }],
            }}
            width={Dimensions.get("window").width - 16}
            height={300}
            yAxisSuffix=" kWh"
            chartConfig={{
              backgroundColor: item.colors.background,
              backgroundGradientFrom: item.colors.gradientFrom,
              backgroundGradientTo: item.colors.gradientTo,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        );
      case "humidityUsage":
        return <HumidityUsage data={data} />;
      case "temperatureUsage":
        return <TemperatureUsage data={data} />;
      default:
        return null;
    }
  };

  const sections = [
    { type: "usageTracking" },
    { type: "deviceInfo" },
    {
      type: "lineChart",
      labels: Array.from({ length: hourlyData.length }, (_, i) => `H${i + 1}`),
      data: hourlyData,
      colors: {
        background: "#154003",
        gradientFrom: "#5aa739",
        gradientTo: "#e2e93e",
      },
    },
    {
      type: "lineChart",
      labels: weeklyData.map((_, index) => `W${index + 1}`),
      data: weeklyData,
      colors: {
        background: "#8b3204",
        gradientFrom: "#cd591d",
        gradientTo: "#e2e93e",
      },
    },
    {
      type: "lineChart",
      labels: monthlyData.map((_, index) => `Month ${index + 1}`),
      data: monthlyData,
      colors: {
        background: "#36048b",
        gradientFrom: "#834be0",
        gradientTo: "#e93e91",
      },
    },
    { type: "humidityUsage" },
    { type: "temperatureUsage" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ElectricityUsage;
