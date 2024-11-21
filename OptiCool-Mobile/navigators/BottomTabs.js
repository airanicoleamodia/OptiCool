import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Profile from "../screens/UserScreens/Profile"
import Dashboard from "../screens/Dashboard"
import HomePage from "../screens/HomePage"
import ControlPage from "../screens/ControlPage"
import ElectricityUsage from "../screens/ElectricityUsage"
import ProfileNavigation from "./ProfileNavigation"
import { Avatar } from "react-native-paper"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import Environment from "../screens/EStatusScreens/EnvironmentStatus"

const Tab = createBottomTabNavigator()

export default function BottomTabs() {

    const { user } = useSelector(state => state.auth);

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarShowLabel: false, // This hides the labels for all tab screens
                headerShown: false,
            }}
        >

            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name='home' size={30} color={'#96a8fa'} />
                    },
                }}
            />


        

           

            <Tab.Screen
                name="Environment Status"
                component={Environment}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {

                        return <MaterialCommunityIcons name='widgets' size={35} color={'#96a8fa'} />
                    },
                }}
            />


            <Tab.Screen
                name="ElectricityUsage"
                component={ElectricityUsage}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name='lightning-bolt' size={30} color={'#96a8fa'} />
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
                        return <MaterialCommunityIcons name='account-circle' size={35} color={'#96a8fa'} />
                    },
                }}
            />

        </Tab.Navigator>

    )
}