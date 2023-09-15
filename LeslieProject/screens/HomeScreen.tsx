import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useTheme, useUser} from '../App'


export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const {user} = useUser();
  //to Check
  // useEffect(()=> {
  //   console.log('tooooo check', user)
  // }, [user])
  return (
    <View key={isDarkMode ? 'dark' : 'light'} style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.textColor }}>HOME</Text>
    </View>
  )
}
