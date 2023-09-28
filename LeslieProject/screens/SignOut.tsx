import { Input, Button, Icon } from "react-native-elements"
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigation } from "@react-navigation/native"
import { useTheme, useUser } from "../App"

const SignOut = () => {
  const navigation = useNavigation()
  const { user, inputUser } = useUser()

  const clickSignOut = async () => {
    signOut(auth)
      .then(() => {
        // navigation.navigate('Home');
        inputUser(null)
      })
      .catch((error) => {
        console.error("Firebase sign-out error:", error)
        // Handle the error here, e.g., show a message to the user
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clickSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})

export default SignOut
