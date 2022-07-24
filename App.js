import React from 'react';
import {useState,useEffect} from "react"
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, Montserrat_600SemiBold, useFonts } from "@expo-google-fonts/montserrat";
import { RFPercentage } from 'react-native-responsive-fontsize';

//screens
import WelcomeScreen from './app/screens/WelcomeScreen';
import SigninScreen from './app/screens/SigninScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import DetailPageScreen from './app/screens/DetailPageScreen';
import ForgetPasswordScreen from './app/screens/ForgetScreen';
import AddPropertyScreen from './app/screens/AddPropertyScreen';

//config
import Colors from './app/config/Colors';
import {Authcontext} from "./Authentication"
const Stack = createStackNavigator();

export default function App() {
  const { user } = Authcontext();
  const[load,setload]=useState(false)
  useEffect(()=>{
    setload(true)
    setTimeout(() => {
      setload(false)
    }, 2000);
  },[])
  
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_600SemiBold
  })
  if (!fontsLoaded||load) 
  {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
    <ActivityIndicator size={RFPercentage(6)} color={Colors.primary} />
  </View>
  )
  
  }
else
{
  return (
    user?<Protected></Protected>:<Base></Base>
  )
}
}


const Base=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Protected=()=>{
  return(
 <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailPageScreen" component={DetailPageScreen} />
        <Stack.Screen name="AddPropertyScreen" component={AddPropertyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// Happy Coding :)


