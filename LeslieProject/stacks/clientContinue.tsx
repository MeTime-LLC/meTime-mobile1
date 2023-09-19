import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, Image } from 'react-native-elements';
import { useTheme, useUser } from '../App';  // Import useTheme from your App.js file
import {ContinueSignUp, LoginStackRouteType} from '../type';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box } from "native-base";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db, storage} from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";



const ClientContinueScreen = ({ route }: { route: RouteProp<LoginStackRouteType, 'ContinueClient'> }) => {
  const { email, password } = route.params as ContinueSignUp;
  const { theme } = useTheme();
  const {user, inputUser} = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleInfoSubmit = () => {
    // Your info-submit logic here
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(res) => {
        let keyId = res["user"]["uid"]
        const userRef = doc(db, 'users', keyId)
        let userObj: {[key: string]: any} = {
          firstName, lastName, DOB: dob, address, phone: phoneNumber, email, provider: false, image: true
        }
        if (imageUri) {
          let storageRef = ref(storage, keyId+'.jpg')
          const response = await fetch(imageUri);
          const blob = await response.blob();
          uploadBytes(storageRef, blob)
            .then(async(snapshot) => {
              let url = await getDownloadURL(snapshot.ref)
              userObj.image = url
              setDoc(userRef, {
                firstName, lastName, DOB: dob, address, phone: phoneNumber, email, provider: false, image: true
              })
              inputUser(userObj)
            })
            .catch((err) => {console.log(err, 'hhhahhss')})
        } else {
          await setDoc(userRef, {
            firstName, lastName, DOB: dob, address, phone: phoneNumber, email, provider: false, image: false
          })
          inputUser(userObj)
        }

      })

      .catch((err) => console.log(err))

    console.log("Info submitted");
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
  };

  const handlePhoneNumberChange = (text:string) => {
    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
  };

  const selectPhoto = () => {
    if (ImagePicker) {
      ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64:true
        },
      )
      .then((res:any) => {
        if (!res.canceled && res.base64) {
          const base64Data = `data:image/jpeg;base64,${res.base64}`;
          setImageUri(base64Data); // now base64Data can be used directly for upload
        }
      })
      .catch((err:any) => console.log(err))
    } else {
      console.error('ImagePicker is not defined');
    }
  }

  return (
    <View style={{...styles.container, backgroundColor: theme.background}}>
      <Text style={{...styles.title, color: theme.textColor}}>Additional Information</Text>

      <Input
        placeholder='First Name'
        leftIcon={<Icon name='person' size={24} color={theme.textColor}/>}
        value={firstName}
        onChangeText={setFirstName}
        style={{color: theme.textColor}}
      />

      <Input
        placeholder='Last Name'
        leftIcon={<Icon name='person' size={24} color={theme.textColor}/>}
        value={lastName}
        onChangeText={setLastName}
        style={{color: theme.textColor}}
      />

      {/* <Input
        placeholder='Date of Birth'
        // Use a Date Picker component here
        value={dob}
        onChangeText={setDob}
        style={{color: theme.textColor}}
      /> */}
      <Box style={[styles.DOB]}>
      <Text style={[styles.DOBtext, { color: theme.textColor }]}>Date of birth:</Text>
      <View style={{backgroundColor: 'white', marginLeft:5, width:70}}>
        <DateTimePicker
          value={new Date(dob || Date.now())}
          mode="date"
          display="default"
          onChange={onDateChange}
          textColor={theme.buttonTextColor}
        />
      </View>
      </Box>

      <Input
        placeholder='Address'
        leftIcon={<Icon name='location-on' size={24} color={theme.textColor}/>}
        value={address}
        onChangeText={setAddress}
        style={{color: theme.textColor}}
      />

      <Input
        placeholder='Phone Number'
        leftIcon={<Icon name='phone' size={24} color={theme.textColor}/>}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        style={{color: theme.textColor}}
        keyboardType={'numeric'}
      />

      <TouchableOpacity onPress={selectPhoto}>
        <Text style={{...styles.uploadText, color: theme.textColor}}>Upload Picture</Text>
      </TouchableOpacity>
      {imageUri === null ? (
        <Image source={require('../assets/ppPlaceholder.png')}
        style={{ width: 100, height: 100, borderRadius: 100 }}/>
      ) :
      ( <Image source={{uri: imageUri}}
        style={{ width: 100, height: 100, borderRadius: 100 }}/>)}

      <Button
        title='Submit'
        onPress={handleInfoSubmit}
        buttonStyle={{backgroundColor: theme.buttonBackgroundColor, marginTop:20}}
        titleStyle={{color: theme.buttonTextColor}}
      />
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
  uploadText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  DOB: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left:-80
  },
  DOBtext: {
    fontSize: 18,
    marginTop:5
  }
});

export default ClientContinueScreen;
