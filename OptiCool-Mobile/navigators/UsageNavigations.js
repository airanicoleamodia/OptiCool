// UsageNavigations.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ElectricityUsage from "../screens/PowerManagement/ElectricityUsage";
import UsageTracking from "../screens/PowerManagement/UsageTracking";

const Stack = createStackNavigator();

const UsageNavigations = () => {
  return (
    <Stack.Navigator initialRouteName="ElectricityUsage">
      <Stack.Screen name="ElectricityUsage" component={ElectricityUsage} />
      <Stack.Screen name="UsageTracking" component={UsageTracking} />
    </Stack.Navigator>
  );
};

export default UsageNavigations;
