import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/UserScreens/Login';
import Register from '../screens/UserScreens/Register';

const Stack = createStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator>

            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='Register' component={Register}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}