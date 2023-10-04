/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useTheme, useUser } from "../../App";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const { user } = useUser();
  //to Check
  useEffect(() => {
    console.log("tooooo check", isDarkMode);
  }, [isDarkMode]);
  return (
    <ScrollView
      key={isDarkMode ? "dark" : "light"}
      style={{
        backgroundColor: theme.background,
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          ...styles.imageContainer,
          backgroundColor: theme.background,
        }}
      >
        <Image
          source={
            isDarkMode
              ? require("../../assets/white-logo.png")
              : require("../../assets/logo.png")
          }
          style={styles.image}
        />
      </View>
      <Button
        style={{
          backgroundColor: theme.buttonBackgroundColor, // Background color
          padding: 15, // Padding around the text
          borderRadius: 10, // Rounded corners
          elevation: 3, // Shadow (Android)
        }}
        labelStyle={{
          color: theme.buttonTextColor, // Text color
          fontSize: 18, // Text size
          fontWeight: "bold", // Text weight
        }}
      >
        Press Here to Get Started!
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "80%",
    marginTop: 30,
    width: "100%",
    // aspectRatio: 1
  },
  imageContainer: {
    alignItems: "center",
    height: 300,
    justifyContent: "center",
    width: "100%",
  },
});
