import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/UserScreens/Profile";
import ResetPasswordCode from "../screens/UserScreens/ResetPasswordCode";
import AdminDashboard from "../screens/AdminScreens/AdminDashboard";
import ChangePassword from "../screens/UserScreens/ChangePassword";
import Verification from "../screens/UserScreens/Verification";

const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="ResetPasswordCode"
        component={ResetPasswordCode}
        options={{ headerShown: true, headerTitle: "Reset Password" }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: true, headerTitle: "Change Password" }}
      />

      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: true, headerTitle: "Verification code" }}
      />
    </Stack.Navigator>
  );
}
