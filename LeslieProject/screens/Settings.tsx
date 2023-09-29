import React, { useState } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native"
import { Input, Icon, Image } from "react-native-elements"
import { useTheme, useUser } from "../App"
import { db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore"

export default function Settings() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme()
  const { user, inputUser } = useUser()
  const [firstName, setFirstName] = useState(user ? user.firstName : null)
  const [lastName, setLastName] = useState(user ? user.lastName : null)
  const [dob, setDob] = useState(user ? user.DOB : null) // Date of Birth
  const [address, setAddress] = useState(user ? user.address : null)
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone : null)
  const [imageUri, setImageUri] = useState<string | null>(
    user
      ? user.image
        ? { uri: user.image }
        : require("../assets/ppPlaceholder.png")
      : null,
  )
  const [email, setEmail] = useState(user ? user.email : null)
  const [fnEdit, setFNedit] = useState(true)
  const [lnEdit, setLNedit] = useState(true)
  const [phoneEdit, setPhoneEdit] = useState(true)
  const [addressEdit, setAddressEdit] = useState(true)

  return (
    <View
      style={{
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        width: "100%"
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: theme.background,
          padding: 10,
          marginTop: 20,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: theme.buttonBackgroundColor,
          borderBottomWidth: 1,
          width: 400,
        }}
        onPress={toggleDarkMode}
      >
        <Text style={{ color: theme.buttonTextColor }}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#f7faff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      {user && (
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity style={{ margin: "10%" }}>
            <Image
              source={
                user.image
                  ? { uri: user.image }
                  : require("../assets/ppPlaceholder.png")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
          {/* First name */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setFNedit(false)}
          >
            <Input
              placeholder="First Name"
              value={firstName}
              leftIcon={
                <Icon name="person" size={24} color={theme.textColor} />
              }
              onChangeText={setFirstName}
              style={{ color: theme.textColor}} // Adjust margin as needed
              disabled={fnEdit}
              onPressIn={() => setFNedit(false)}
              containerStyle={styles.inputContainer}
            />
            {!fnEdit && (
              <>
                <TouchableOpacity
                  // onPress={onPress} => update the database
                  onPress={() => {
                    const userRef = doc(db, "users", user.credential)
                    updateDoc(userRef, { firstName })
                    setFNedit(true)
                  }}
                  style={styles.greenCheck}
                >
                  <Icon name={"check"} size={20} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFNedit(true)
                    setFirstName(user.firstName)
                  }}
                  style={styles.redCross}
                >
                  <Icon name={"close"} size={20} color={"white"} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
          {/* Last name */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setLNedit(false)}
          >
            <Input
              placeholder="Last Name"
              leftIcon={
                <Icon name="person" size={24} color={theme.textColor} />
              }
              value={lastName}
              onChangeText={setLastName}
              style={{ color: theme.textColor }}
              disabled={lnEdit}
              onPressIn={() => setLNedit(false)}
              containerStyle={styles.inputContainer}
            />
            {!lnEdit && (
              <>
                <TouchableOpacity
                  // onPress={onPress}
                  style={styles.greenCheck}
                >
                  <Icon name={"check"} size={20} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setLNedit(true);
                    setLastName(user.lastName);
                  }}
                  style={styles.redCross}
                >
                  <Icon name={"close"} size={20} color={"white"} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>

          {/* PHONE */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setPhoneEdit(false)}
          >
            <Input
              placeholder="Phone Number"
              leftIcon={<Icon name="phone" size={24} color={theme.textColor} />}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{ color: theme.textColor }}
              disabled={phoneEdit}
              onPressIn={() => setPhoneEdit(false)}
              containerStyle={styles.inputContainer}
            />
            {!phoneEdit && (
              <>
                <TouchableOpacity
                  // onPress={onPress}
                  style={styles.greenCheck}
                >
                  <Icon name={"check"} size={20} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPhoneEdit(true)
                    setPhoneNumber(user.phone)
                  }}
                  style={styles.redCross}
                >
                  <Icon name={"close"} size={20} color={"white"} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
          {/* Address */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setAddressEdit(false)}
          >
            <Input
              placeholder="Address"
              leftIcon={
                <Icon name="location-on" size={24} color={theme.textColor} />
              }
              value={address}
              onChangeText={setAddress}
              style={{ color: theme.textColor }}
              disabled={addressEdit}
              onPressIn={() => setAddressEdit(false)}
              containerStyle={styles.inputContainer}
            />
            {!addressEdit && (
              <>
                <TouchableOpacity
                  // onPress={onPress}
                  style={styles.greenCheck}
                >
                  <Icon name={"check"} size={20} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setAddressEdit(true)
                    setAddress(user.address)
                  }}
                  style={styles.redCross}
                >
                  <Icon name={"close"} size={20} color={"white"} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
          {/* Email */}
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              alert("please contact customer service to change email")
            }
          >
            <Input
              placeholder="Email"
              leftIcon={<Icon name="email" size={24} color={theme.textColor} />}
              value={email}
              onChangeText={setEmail}
              style={{ color: theme.textColor }}
              disabled={true}
              onPressIn={() => {
                alert("please contact customer service to change email")
              }}
              containerStyle={styles.inputContainer}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  greenCheck: {
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "green",
    borderRadius: 5,
    height: 20,
    padding: 0,
    width: 20,
    marginRight: 10
  },
  redCross: {
    backgroundColor: "red",
    padding: 0,
    borderRadius: 5,
    width: 20,
    height: 20,
    alignItems: "center",
  },
  input: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  inputContainer: {
    width:'90%'
  },
})
