import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {useTheme, useUser} from '../App';
import ContinueClient from './clientContinue';
import ContinueProvider from './providerContinue'
import { LoginStackRouteType }  from '../type';
import { useNavigation } from '@react-navigation/native';

const LoginStack = () => {
  const { theme, isDarkMode } = useTheme();
  const {user, inputUser} = useUser();
  const navigation = useNavigation();
  const Stack = createStackNavigator<LoginStackRouteType>();


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
      <Stack.Screen name="ContinueProvider" component={ContinueProvider}
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