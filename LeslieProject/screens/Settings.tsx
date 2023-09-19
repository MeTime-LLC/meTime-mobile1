import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Input, Button, Icon, Image } from 'react-native-elements';
import {useTheme, useUser} from '../App'

export default function Settings() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  const {user, inputUser} = useUser();
  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.background,
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
        {user && (
          <Image source={user.image ? {uri: user.image} : require('../assets/ppPlaceholder.png')}
          style={{ width: 100, height: 100, borderRadius: 100 }}/>
        )}
    </ScrollView>
  )
}
