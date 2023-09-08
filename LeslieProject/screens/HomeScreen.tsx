import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useTheme} from '../App'


export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  return (
    <View key={isDarkMode ? 'dark' : 'light'} style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.textColor }}>HOME</Text>
    </View>
  )
}
