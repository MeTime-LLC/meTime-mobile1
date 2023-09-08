import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {useTheme} from '../App';
import ContinueClient from './clientContinue';

const LoginStack = () => {
  const { theme, isDarkMode } = useTheme();
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}
         options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}/>
      <Stack.Screen name="ContinueClient" component={ContinueClient}
         options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}/>
    </Stack.Navigator>
  );
};

export default LoginStack