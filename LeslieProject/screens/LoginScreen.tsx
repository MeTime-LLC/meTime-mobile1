import React, { useState } from "react"
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native"
import { Input, Button, Icon } from "react-native-elements"
import { useTheme, useUser } from "../App"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { LoginStackRouteType } from "../type"
import { auth, db, storage } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import { StackNavigationProp } from "@react-navigation/stack"

type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackRouteType,
  "Login"
>;

const LoginScreen = ({
  route,
}: {
  route: RouteProp<LoginStackRouteType, "Login">;
}) => {
  const { theme, isDarkMode } = useTheme() // Moved inside the component
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgetVisible, setForgetVisible] = useState(false)
  const [emailForgetPass, setEmailForgetPass] = useState("")
  const { user, inputUser } = useUser()

  const navigation = useNavigation<LoginScreenNavigationProp>()

  const handleLogin = () => {
    // Handle your login logic here
    console.log("Logged in")
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const key = res.user.uid
        // Ensure that Firestore is correctly initialized and 'db' points to your Firestore instance.
        const userRef = doc(db, "users", key)
        const userData = await getDoc(userRef)
        const theUser: any = userData.data()
        theUser.credential = key
        theUser.DOB = new Date(theUser.DOB.seconds * 1000)
        if (theUser.image) {
          const imageRef = ref(storage, key + ".jpg")
          await getDownloadURL(imageRef).then((url) => (theUser.image = url))
        }
        inputUser(theUser)
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp")
  }

  const handleForgetPassword = () => {
    alert("If the email exist, please check your email")
    setForgetVisible(false)
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <Text style={{ ...styles.title, color: theme.textColor }}>Welcome!</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email" size={24} color={theme.textColor} />}
        value={email}
        onChangeText={setEmail}
        style={{ color: theme.textColor }}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color={theme.textColor} />}
        value={password}
        onChangeText={setPassword}
        style={{ color: theme.textColor }}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={{ backgroundColor: theme.buttonBackgroundColor }}
        titleStyle={{ color: theme.buttonTextColor }}
      />
      <View style={styles.SignUpForget}>
        <Button
          title="SignUp"
          onPress={handleSignUp}
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: "blue" }}
        />
        <Button
          title="Forget Password?"
          onPress={() => {
            setForgetVisible(true)
          }}
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: "blue" }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={forgetVisible}
          onRequestClose={() => {
            setForgetVisible(!forgetVisible)
          }}
        >
          <View style={styles.containerModal}>
            <View style={styles.containerForget}>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setForgetVisible(false)}
              >
                <Text style={styles.modalButtonText}>X</Text>
              </TouchableOpacity>
              <Text>Forget Password</Text>
              <Input
                placeholder="Email"
                leftIcon={
                  <Icon name="email" size={24} color={theme.textColor} />
                }
                value={emailForgetPass}
                onChangeText={setEmailForgetPass}
                style={{ color: theme.textColor }}
              />
              <Button
                title="Submit"
                onPress={handleForgetPassword}
                buttonStyle={{
                  backgroundColor: theme.buttonBackgroundColor,
                  marginTop: 10,
                }}
                titleStyle={{ color: theme.buttonTextColor }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  SignUpForget: {
    // flex: 0,
    bottom: "-20%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalButton: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 100,
    height: 15,
    justifyContent: "center",
    position: "absolute",
    right: 15,
    top: 15,
    width: 15,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  containerForget: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    maxHeight: 300,
    width: 300,
  },
  containerModal: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    maxHeight: "90%",
    top: 90,
  },
  modalButtonText: {
    color: "white",
    fontSize: 7,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
})

export default LoginScreen
