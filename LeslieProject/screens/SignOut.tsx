import { Input, Button, Icon, } from 'react-native-elements';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import {signOut} from "firebase/auth";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const SignOut = () => {
  const navigation = useNavigation();
  const clickSignOut = () => {
    signOut(auth)
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={clickSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignOut