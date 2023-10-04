/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useContext, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, Box, Button } from "native-base";
import HomeScreen from "./stacks/Home/HomeScreen"
import HomeNav from "./stacks/Home/HomeNav"
import SettingsScreen from "./screens/Settings";
import LoginStack from "./stacks/loginStack";
import { Theme } from "./type"; // make sure this type aligns with your theme object
import Icon from "react-native-vector-icons/FontAwesome";
import SignOut from "./screens/SignOut";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

const Tab = createBottomTabNavigator();

const darkTheme = {
  background: "#000", // add this line
  backgroundColor: "#000",
  textColor: "#fff",
  buttonBackgroundColor: "#333",
  buttonTextColor: "#fff",
};

const lightTheme = {
  background: "#fff", // add this line
  backgroundColor: "#fff",
  textColor: "#000",
  buttonBackgroundColor: "#eee",
  buttonTextColor: "#000",
};

const ThemeContext = createContext<{
  theme: Theme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  theme: lightTheme as unknown as Theme, // Provide initial values for the theme
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const UserContext = createContext<{
  user: any;
  inputUser: (userData: any) => void;
}>({
  user: null,
  inputUser: (userData) => {},
});

export const useTheme = () => useContext(ThemeContext);
export const useUser = () => useContext(UserContext);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const inputUser = (userData: any) => {
    setUser(userData);
  }
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // navigation.navigate('Home')
    console.log(user, "this is the user");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, inputUser }}>
      <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode }}>
        <PaperProvider>
          <NativeBaseProvider>
            <NavigationContainer>
              <Tab.Navigator
                key={isDarkMode ? "dark" : "light"}
                screenOptions={{
                  tabBarActiveTintColor: theme.buttonTextColor,
                  tabBarInactiveTintColor: theme.textColor,
                  tabBarStyle: {
                    backgroundColor: theme.backgroundColor,
                  },
                }}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeNav}
                  options={{
                    headerShown: false,
                    // headerStyle: {
                    //   backgroundColor: theme.backgroundColor,
                    // },
                    // headerTintColor: theme.textColor,
                    tabBarLabel: ({ focused }) => (
                      <Text
                        style={{
                          color: focused
                            ? theme.buttonTextColor
                            : theme.textColor,
                        }}
                      >
                        Home
                      </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                      <View
                        style={{
                          backgroundColor: focused
                            ? theme.buttonBackgroundColor
                            : "transparent",
                          borderRadius: 10,
                          padding: 5,
                        }}
                      >
                        <Icon name="home" size={20} color={theme.textColor} />
                      </View>
                    ),
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: theme.backgroundColor,
                    },
                    headerTintColor: theme.textColor,
                    tabBarLabel: ({ focused }) => (
                      <Text
                        style={{
                          color: focused
                            ? theme.buttonTextColor
                            : theme.textColor,
                        }}
                      >
                        Settings
                      </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                      <View
                        style={{
                          backgroundColor: focused
                            ? theme.buttonBackgroundColor
                            : "transparent",
                          borderRadius: 10,
                          padding: 5,
                        }}
                      >
                        <Icon name="gear" size={20} color={theme.textColor} />
                      </View>
                    ),
                  }}
                />
                {!user ? (
                  <Tab.Screen
                    name="LoginStack"
                    component={LoginStack}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View
                          style={{
                            backgroundColor: focused
                              ? theme.buttonBackgroundColor
                              : "transparent",
                            borderRadius: 10,
                            padding: 5,
                          }}
                        >
                          <Icon name="lock" size={20} color={theme.textColor} />
                        </View>
                      ),
                    }}
                  />
                ) : (
                  <Tab.Screen
                    name="SignOut"
                    component={SignOut}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View
                          style={{
                            backgroundColor: focused
                              ? theme.buttonBackgroundColor
                              : "transparent",
                            borderRadius: 10,
                            padding: 5,
                          }}
                        >
                          <Icon
                            name="sign-out"
                            size={20}
                            color={theme.textColor}
                          />
                        </View>
                      ),
                    }}
                  />
                )}
              </Tab.Navigator>
              <StatusBar style={isDarkMode ? "light" : "dark"} />
            </NavigationContainer>
          </NativeBaseProvider>
        </PaperProvider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
