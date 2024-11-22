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
import Report from "../screens/AdminScreens/EReport"


const Tab = createBottomTabNavigator()

export default function BottomTabs() {

    const { user } = useSelector(state => state.auth);

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarShowLabel: false, // This hides the labels for all tab screens
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff', // Set background color for the tab bar
                    borderTopWidth: 0, // Remove top border
                    borderTopLeftRadius: 35, // Round the top-left corner
                    borderTopRightRadius: 35, // Round the top-right corner
                    borderBottomLeftRadius: 0, // Keep bottom-left corner square
                    borderBottomRightRadius: 0, // Keep bottom-right corner square
                    height: 60, // Adjust height of the tab bar
                    marginBottom: 0, // Optional: Add some space at the bottom
                    shadowColor: '#000', // Optional: Add shadow effect
                    shadowOffset: { width: 0, height: 10 }, // Shadow offset
                    shadowOpacity: 0.25, // Shadow opacity
                    shadowRadius: 3.5, // Shadow radius
                },
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
                    tabBarStyle: { display: 'none' }, // Hides the tab bar on this screen
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



            {user?.role === 'admin' && (
                <Tab.Screen
                    name="Reports"
                    component={Report}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => {
                            return <MaterialCommunityIcons name='alert-decagram' size={30} color={'#96a8fa'} />;
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
                    tabBarIcon: ({ color }) => {
                        // return <Avatar.Image size={30} source={{ uri: user.avatar.url }} />
                        return <MaterialCommunityIcons name='account-circle' size={35} color={'#96a8fa'} />
                    },
                }}
            />

        </Tab.Navigator>

    )
}