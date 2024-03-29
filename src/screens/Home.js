import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { TextInput } from 'react-native-gesture-handler';
import CustomisedButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {

    
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);
  
  const updateData = async () => {
    if(name.length==0){

Alert.alert('Warning!','Please write your data.')
    }else {
        try{
          var user = {
            Name:name,

          }
            await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
            Alert.alert('Succes !', 'Your data has been updated.');
        }catch (error) {
            console.log(error);

        }

    }
}

const removeData = async () => {
      try{
          await AsyncStorage.removeItem('UserName');
          navigation.navigate('Login');
      }catch (error) {
          console.log(error);

      }

  
}

const getData = () => {
  try{
AsyncStorage.getItem('UserData')
.then(value=>{
  if(value!=null){
    let user = JSON.parse(value)
    setName(user.Name);
    setAge(user.Age);
  }
}

)
  }catch(error){
console.log(error);

  }
}
  return (
    <View style = {styles.body}>
      <Text style = {[
        GlobalStyle.CustomFont,
        styles.text
      ]}>
        Welcome {name} !
      </Text>
      <Text style = {[
        GlobalStyle.CustomFont,
        styles.text
      ]}>
        Your age is {age} 
      </Text>
      
      <TextInput
      style = {styles.input}
      placeholder='Enter your name'
      value={name}
      onChangeText={(value) => setName(value)}
      />
      <CustomisedButton
      title = 'Update'
      color = '#5a9e6d'
      onPressFunction = {updateData}
      
      />

<CustomisedButton
      title = 'Delete'
      color = '#5a9e6d'
      onPressFunction = {removeData}
      
      />
    </View>
      
  )
    }
    
const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
      fontSize: 40,
      margin: 10,
     },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
    
    },
    input:{
      width: 300,
      borderWidth:1,
      borderColor:'#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      marginTop:130,
      marginBottom:10,
  }
  })