import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "../screens/UserScreens/Profile"
import Dashboard from "../screens/Dashboard"
import ProfileNavigation from "./ProfileNavigation"
import { Avatar } from "react-native-paper"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from 'react-native-vector-icons'

const Tab = createBottomTabNavigator()

export default function BottomTabs() {

    const { user } = useSelector(state => state.auth);

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
        >

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name='view-dashboard' size={30} color={color} />
                    },
                }}
            />

            <Tab.Screen
                name="Accounts"
                component={ProfileNavigation}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        // return <Avatar.Image size={30} source={{ uri: user.avatar.url }} />
                        return <MaterialCommunityIcons name='account-circle' size={35} color={color} />
                    },
                }}
            />

        </Tab.Navigator>

    )
}