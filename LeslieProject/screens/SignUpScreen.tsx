import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useTheme } from '../App';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from '../type';
import { StackNavigationProp } from '@react-navigation/stack';

const SignUpScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [provider, setProvider] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

  const handleSignUp = () => {
    // Your sign-up logic here
    if (password === confirmPassword && password) {
      if (!provider) {
        navigation.navigate('ContinueClient', { email, password });
      }
      if (provider) {
        navigation.navigate('ContinueProvider', { email, password });
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <View style={{...styles.container, backgroundColor: theme.background}}>
      {/* <View style={{...styles.container2, backgroundColor: theme.background}}> */}
        <Text style={{...styles.title, color: theme.textColor}}>Sign Up!</Text>
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
        <Input
          placeholder='Confirm Password'
          secureTextEntry={true}
          leftIcon={<Icon name='lock' size={24} color={theme.textColor}/>}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{color: theme.textColor}}
        />
        <View key='provider' style={styles.provider}>
          <Text style={[styles.providerText, {color: theme.textColor}]}>Are you a provider?</Text>
          <Switch
              trackColor={isDarkMode ? { false: '#767577', true: '#f4f3f4' } : { false: '#f5dd4b', true: '#f5dd4b' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {setProvider(!provider)}}
              value={provider}
            />
        </View>
        <Button
          title='Sign Up'
          onPress={handleSignUp}
          buttonStyle={{backgroundColor: theme.buttonBackgroundColor, marginTop:20}}
          titleStyle={{color: theme.buttonTextColor}}
        />
        <Button
          title='Already have an account? Log in'
          onPress={() => {} /* Navigate to login */}
          buttonStyle={{ backgroundColor: 'transparent', marginTop:20}}
          titleStyle={{ color: 'blue' }}
        />
      {/* </View> */}
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
  provider: {
    // flex: 1,
    flexDirection: 'row',
  },
  providerText: {
    fontSize:18,
    marginRight:10,
    marginTop:4
  }
});

export default SignUpScreen;
