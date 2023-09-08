// import { createContext, useContext } from 'react';

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

export type ContinueClientRouteType = {
  SignUpScreen: undefined;
  ContinueClient: ContinueSignUp;
};

export type RootStackParamList = {
  SignUpScreen: undefined;
  ContinueClient: ContinueSignUp;
  // Add other routes here
};

