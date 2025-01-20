import { createStackNavigator } from '@react-navigation/stack'
import testing from '../screens/MenuScreens/testing';
import NotifScreen from '../screens/MenuScreens/NotifScreen';

const Stack = createStackNavigator();

export default function MenuNavigation() {
    return (
        <Stack.Navigator
            initialRouteName='NotifScreen'
        >

            <Stack.Screen name='NotifScreen' component={NotifScreen}
                options={{ headerShown: true }}
            />

        </Stack.Navigator>
    )
}