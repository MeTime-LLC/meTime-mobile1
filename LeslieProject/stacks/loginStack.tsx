import Animated from 'react-native-reanimated';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ContinueClient from './clientContinue';
import ContinueProvider from './providerContinue';
import { LoginStackRouteType } from '../type';
import { useTheme, useUser } from '../App';
import { useNavigation } from '@react-navigation/native';

const LoginStack = () => {
  const { theme, isDarkMode } = useTheme();
  const { user, inputUser } = useUser();
  const navigation = useNavigation();
  const Stack = createStackNavigator<LoginStackRouteType>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.textColor,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Apply horizontal slide-in animation
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Apply horizontal slide-in animation
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="ContinueClient"
        component={ContinueClient}
        options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="ContinueProvider"
        component={ContinueProvider}
        options={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.textColor,
        }}
      />
    </Stack.Navigator>
  );
}

export default LoginStack;
