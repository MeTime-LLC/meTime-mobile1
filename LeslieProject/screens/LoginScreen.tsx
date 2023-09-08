import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useTheme } from '../App';
import { useNavigation } from '@react-navigation/native';
// import SignUpScreen from './SignUpScreen';

const LoginScreen = () => {
  const { theme, isDarkMode } = useTheme(); // Moved inside the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const handleLogin = () => {
    // Handle your login logic here
    console.log("Logged in");
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
  <View style={{...styles.container, backgroundColor: theme.background}}>
    <Text style={{...styles.title, color: theme.textColor}}>Welcome!</Text>
      <Input
        placeholder='Email'
        leftIcon={<Icon name='email' size={24} color={theme.textColor}/>}
        value={email}
        onChangeText={setEmail}
        style={{color: theme.textColor}}
      />
      <Input
        placeholder='Password'
        secureTextEntry={true}
        leftIcon={<Icon name='lock' size={24} color={theme.textColor}/>}
        value={password}
        onChangeText={setPassword}
        style={{color: theme.textColor}}
      />
      <Button
        title='Login'
        onPress={handleLogin}
        buttonStyle={{backgroundColor: theme.buttonBackgroundColor}}
        titleStyle={{color: theme.buttonTextColor}}
      />
      <View style={styles.SignUpForget}>
        <Button
          title='SignUp'
          onPress={handleSignUp}
          buttonStyle={{ backgroundColor: 'transparent' }}
          titleStyle={{ color: 'blue' }}
        />
        <Button
          title='Forget Password?'
          onPress={handleSignUp}
          buttonStyle={{ backgroundColor: 'transparent' }}
          titleStyle={{ color: 'blue' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  SignUpForget: {
    // flex: 0,
    bottom: '-20%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoginScreen;
