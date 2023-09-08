import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import {useTheme} from '../App'

export default function Settings() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.textColor }}>Settings</Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.buttonBackgroundColor,
            padding: 10,
            marginTop: 20,
            borderRadius: 5
          }}
          onPress={toggleDarkMode}
        >
          <Text style={{ color: theme.buttonTextColor }}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Text>
          <Switch
          trackColor={{ false: '#767577', true: '#f7faff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
        </TouchableOpacity>
    </View>
  )
}
