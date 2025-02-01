import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";
import BottomTabs from "./BottomTabs";
import Environment from "../screens/EStatusScreens/EnvironmentStatus";
import ElectricityUsage from "../screens/PowerManagement/ElectricityUsage";
import Report from "../screens/AdminScreens/EReport";
import Profile from "../screens/UserScreens/Profile";
import AuthNavigation from "./AuthNavigation";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { isLogin, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {isLogin ? (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: { width: 280 },
          }}
        >
          <Drawer.Screen name="Home" component={BottomTabs} />
          <Drawer.Screen name="Status" component={Environment} />
          <Drawer.Screen name="Usage" component={ElectricityUsage} />
          {user.role === "admin" && <Drawer.Screen name="Reports" component={Report} />}
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigation />
      )}
    </>
  );
}