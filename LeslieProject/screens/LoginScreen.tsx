import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, } from 'react-native-elements';
import { useTheme } from '../App';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LoginStackRouteType } from '../type';
// import SignUpScreen from './SignUpScreen';

const LoginScreen = ({ route }: { route: RouteProp<LoginStackRouteType, 'Login'> }) => {
  const { theme, isDarkMode } = useTheme(); // Moved inside the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgetVisible, setForgetVisible] = useState(false);
  const [emailForgetPass, setEmailForgetPass] = useState('')

  const navigation = useNavigation();


  const handleLogin = () => {
    // Handle your login logic here
    console.log("Logged in");
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  const handleForgetPassword = () => {
    alert('If the email exist, please check your email')
    setForgetVisible(false)
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
          onPress={() => {setForgetVisible(true)}}
          buttonStyle={{ backgroundColor: 'transparent' }}
          titleStyle={{ color: 'blue' }}
        />
        <Modal
        animationType="fade"
        transparent={true}
        visible={forgetVisible}
        onRequestClose={() => {
          setForgetVisible(!forgetVisible);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.containerForget}>
            <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setForgetVisible(false)}>
              <Text style={styles.modalButtonText}>X</Text>
            </TouchableOpacity>
            <Text>Forget Password</Text>
            <Input
              placeholder='Email'
              leftIcon={<Icon name='email' size={24} color={theme.textColor}/>}
              value={emailForgetPass}
              onChangeText={setEmailForgetPass}
              style={{color: theme.textColor}}
            />
            <Button
              title='Submit'
              onPress={handleForgetPassword}
              buttonStyle={{ backgroundColor: theme.buttonBackgroundColor, marginTop:10 }}
              titleStyle={{ color: theme.buttonTextColor}}
            />
          </View>
        </View>
      </Modal>
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
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    maxHeight:'90%',
    top:90,
  },
  containerForget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    maxHeight:300,
    width:300,
    borderRadius:20
  },
  closeModalButton: {
    borderRadius:100,
    height:15,
    width:15,
    backgroundColor:'gray',
    alignItems:'center',
    justifyContent: 'center',
    position:'absolute',
    top:15,
    right:15
  },
  modalButtonText: {
    fontSize:7,
    color: 'white',
  }
});

export default LoginScreen;
