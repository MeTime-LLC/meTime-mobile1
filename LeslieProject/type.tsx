// import { createContext, useContext } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


// Define the type for your theme object
export type Theme = {
  background: string;
  textColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  // Add more theme colors as needed
};

export type ContinueSignUp = {
  email: string,
  password: string
}

export type LoginStackRouteType = {
  Login: undefined;
  SignUp: undefined;
  ContinueClient: ContinueSignUp;
  ContinueProvider: ContinueSignUp;
};

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ContinueClient: ContinueSignUp;
  ContinueProvider: ContinueSignUp;
  // Add other routes here
};



