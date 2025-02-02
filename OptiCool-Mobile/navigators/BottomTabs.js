import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/UserScreens/Profile";
import Dashboard from "../screens/Dashboard";
import DeviceInfo from "../screens/PowerManagement/DeviceInfo";
import ElectricityUsage from "../screens/PowerManagement/ElectricityUsage";
import ProfileNavigation from "./ProfileNavigation";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Environment from "../screens/EStatusScreens/EnvironmentStatus";
import Report from "../screens/AdminScreens/EReport";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarActiveTintColor: "#000000", // Black color for active state
        tabBarInactiveTintColor: "#7a7a7a", // Optional: Gray color for inactive state
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "#000000" : "#7a7a7a"; // Black when active, gray when inactive
            return (
              <MaterialCommunityIcons name="home" size={30} color={iconColor} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Status"
        component={Environment}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "#000000" : "#7a7a7a"; // Black when active, gray when inactive
            return (
              <MaterialCommunityIcons
                name="widgets"
                size={30}
                color={iconColor}
              />
            );
          },
          // tabBarStyle: { display: "none" }, // Optional: Hides the tab bar on this screen
        }}
      />

      <Tab.Screen
        name="Usage"
        component={ElectricityUsage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "#000000" : "#7a7a7a"; // Black when active, gray when inactive
            return (
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={30}
                color={iconColor} // Use dynamic iconColor
              />
            );
          },
        }}
      />

      {user.role === "admin" && (
        <Tab.Screen
          name="Reports"
          component={Report}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const iconColor = focused ? "#000000" : "#7a7a7a"; // Black when active, gray when inactive
              return (
                <MaterialCommunityIcons
                  name="alert-decagram"
                  size={30}
                  color={iconColor} // Use dynamic iconColor
                />
              );
            },
          }}
        />
      )}

      <Tab.Screen
        name="Accounts"
        component={ProfileNavigation}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "#000000" : "#7a7a7a"; // Black when active, gray when inactive
            // return <Avatar.Image size={30} source={{ uri: user.avatar.url }} />;
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={30}
                color={iconColor} // Use dynamic iconColor
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
