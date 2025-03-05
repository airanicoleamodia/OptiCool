import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import BottomTabs from "./navigators/BottomTabs";
import AuthNavigation from "./navigators/AuthNavigation";
import DrawerNavigation from "./navigators/DrawerNavigation"; // Updated import
import { StatusBar } from "react-native";
import UsageNavigations from "./navigators/UsageNavigations"; // Stack for usage-related screens
import MenuNavigation from "./navigators/MenuNavigations"; // Stack for menu-related screens
import MockupDashboard from "./screens/UserScreens/MockupDashboard"; // Import the mock-up dashboard screen

// Other individual screens
import NotifScreen from "./screens/MenuScreens/NotifScreen";
import UpdateProfile from "./screens/UserScreens/UpdateProfile";
import AdminDashboard from "./screens/AdminScreens/AdminDashboard";
import ActiveUsers from "./screens/AdminScreens/ActiveUsers";
import ActivityLog from "./screens/AdminScreens/ActivityLog";
import HelpCenter from "./screens/AdminScreens/HelpCenter";
import UsersAll from "./screens/AdminScreens/UsersAll";
import UsageTracking from "./screens/PowerManagement/UsageTracking";
import CreatePosts from "./screens/AdminScreens/CreatePosts";
import EditPosts from "./screens/AdminScreens/EditPosts"; // Ensure correct import
import HelpDetails from "./screens/AdminScreens/HelpDetails";
import ReportDetails from "./screens/AdminScreens/ReportDetails"; // Ensure correct import
import PostList from "./screens/AdminScreens/PostList"; // Ensure correct import
import NotificationScreen from "./screens/NotificationScreen";

const Stack = createStackNavigator();

export default function Main() {
  const { isLogin, role } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {isLogin ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* BottomTabs as the main entry point */}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />

          {/* Other stack navigators */}
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen name="UsageNavigations" component={UsageNavigations} />
          <Stack.Screen name="MenuNavigation" component={MenuNavigation} />

          {/* Role-based screens */}
          {role === 'SuperAdmin' && (
            <>
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
              <Stack.Screen name="ActiveUsers" component={ActiveUsers} />
              <Stack.Screen name="ActivityLog" component={ActivityLog} />
              <Stack.Screen name="UsersAll" component={UsersAll} />
              <Stack.Screen name="HelpCenter" component={HelpCenter} />
              <Stack.Screen name="CreatePosts" component={CreatePosts} />
              <Stack.Screen name="EditPosts" component={EditPosts} />
              <Stack.Screen name="PostList" component={PostList} />
              <Stack.Screen
                name="ReportDetails"
                component={ReportDetails}
                options={{ title: "Report Details", headerShown: true }}
              />
              <Stack.Screen
                name="HelpDetails"
                component={HelpDetails}
                options={{ title: "Help Details" }}
              />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
            </>
          )}
          {role === 'Admin' && (
            <>
              <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
              <Stack.Screen name="ActiveUsers" component={ActiveUsers} />
              <Stack.Screen name="ActivityLog" component={ActivityLog} />
              <Stack.Screen name="UsersAll" component={UsersAll} />
              <Stack.Screen name="HelpCenter" component={HelpCenter} />
              <Stack.Screen name="CreatePosts" component={CreatePosts} />
              <Stack.Screen name="EditPosts" component={EditPosts} />
              <Stack.Screen name="PostList" component={PostList} />
              <Stack.Screen
                name="ReportDetails"
                component={ReportDetails}
                options={{ title: "Report Details", headerShown: true }}
              />
              <Stack.Screen
                name="HelpDetails"
                component={HelpDetails}
                options={{ title: "Help Details" }}
              />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
              />
            </>
          )}
          {role === 'User' && (
            <>
              <Stack.Screen name="MockupDashboard" component={MockupDashboard} />
              <Stack.Screen name="NotifScreen" component={NotifScreen} />
              <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            </>
          )}
        </Stack.Navigator>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}


