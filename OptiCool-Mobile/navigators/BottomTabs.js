import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "../screens/UserScreens/Profile"
import Dashboard from "../screens/Dashboard"
import ProfileNavigation from "./ProfileNavigation"
import { Avatar } from "react-native-paper"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import Environment from "../screens/EStatusScreens/EnvironmentStatus"
import Application from "../screens/AStatusScreens/ApplicationStatus"
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
                name="Environment Status"
                component={Environment}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {
                        
                        return <MaterialCommunityIcons name='leaf-circle' size={35} color={color} />
                    },
                }}
            />


            <Tab.Screen
                name="Application Status"
                component={Application}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {
                        
                        return <MaterialCommunityIcons name='power-settings' size={35} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Account"
                component={ProfileNavigation}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        
                        return <MaterialCommunityIcons name='account-circle' size={35} color={color} />
                    },
                }}
            />

        </Tab.Navigator>

    )
}