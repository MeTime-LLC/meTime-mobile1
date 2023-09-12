import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, Image } from 'react-native-elements';
import { useTheme } from '../App';  // Import useTheme from your App.js file
import {ContinueSignUp, LoginStackRouteType} from '../type';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box } from "native-base";
import * as ImagePicker from 'expo-image-picker';




const ProviderContinueScreen = ({ route }: { route: RouteProp<LoginStackRouteType, 'ContinueProvider'> }) => {
  const { email, password } = route.params as ContinueSignUp;
  const { theme } = useTheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [imageUri, setImageUri] = useState(null);


  const handleInfoSubmit = () => {
    // Your info-submit logic here
    console.log("Info submitted");
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
  };

  const selectPhoto = () => {
    if (ImagePicker) {
      ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        },
      ).then((res:any) => {setImageUri(res['assets'][0].uri)})
      .catch((err) => console.log(err))
    } else {
      console.error('ImagePicker is not defined');
    }
  }

  //toCheck
  // useEffect(() => {
  //   console.log(email, password)
  // }, [route])

  return (
    <View style={{...styles.container, backgroundColor: theme.background}}>
      <Text style={{...styles.title, color: theme.textColor}}>Additional Information</Text>

      <Input
        placeholder='Company Name'
        leftIcon={<Icon name='star' size={24} color={theme.textColor}/>}
        value={company}
        onChangeText={setCompany}
        style={{color: theme.textColor}}
      />

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
        onChangeText={setPhoneNumber}
        style={{color: theme.textColor}}
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

export default ProviderContinueScreen;
