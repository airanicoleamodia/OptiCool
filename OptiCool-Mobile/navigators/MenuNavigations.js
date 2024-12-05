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

            {/* <Stack.Screen name='ResetPasswordCode' component={ResetPasswordCode}
                options={{ headerShown: true, headerTitle: 'Reset Password' }}
            />

            <Stack.Screen name='ChangePassword' component={ChangePassword}
                options={{ headerShown: true, headerTitle: 'Change Password' }}
            />

            <Stack.Screen name='Verification' component={Verification}
                options={{ headerShown: true, headerTitle: 'Verification code' }}
            /> */}

        </Stack.Navigator>
    )
}