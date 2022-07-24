import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

//components
import Screen from './../components/Screen';
import InputField from './../components/common/InputField';
import LoadingModal from './../components/common/LoadingModal';

//config
import Colors from '../config/Colors';
import app from "../../firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,sendPasswordResetEmail} from "firebase/auth"

function ForgetPasswordScreen(props) {
    const auth=getAuth(app)
    // Input fields
    const [indicator, showIndicator] = useState(false);

    const [inputField, SetInputField] = useState([
        {
            placeholder: "Enter Your Email",
            value: "",
        },

    ]);

    const handleChange = (text, i) => {
        let tempfeilds = [...inputField];
        tempfeilds[i].value = text;
        SetInputField(tempfeilds);

    };

    const handleForget = () => {
        showIndicator(true);
        let tempfeilds = [...inputField];

        if (tempfeilds[0].value === "") {
            alert("Please fill all the feilds");
            showIndicator(false);
            return true;
        }

       // props.navigation.navigate("HomeScreen")
       try {
        // API INTEGRATION WILL COME HERE
//alert("insides")
        sendPasswordResetEmail(auth,tempfeilds[0].value).then(()=>{
            showIndicator(false); 
            alert('Email has been sent to your registerd account for password reset.')
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            showIndicator(false);
            alert(errorMessage)  
        })  
        }
     catch (error) {
        alert("try again later");
    }

        showIndicator(false);
    };

    return (
        <Screen style={styles.screen}>
            <LoadingModal show={indicator} />

            {/* Nav */}
            <View style={{ marginTop: RFPercentage(4), width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                {/* Back */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("SigninScreen")} style={{ position: 'absolute', left: 0 }} >
                    <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(5.2), height: RFPercentage(5.2), borderRadius: RFPercentage(30) }} >
                        <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(4) }} color={Colors.white} />
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.8), fontFamily: 'Montserrat_700Bold' }} >
                    Forget Password
                </Text>
            </View>

            {/* Input field */}
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {inputField.map((item, i) => (
                    <View key={i} style={{ marginTop: RFPercentage(10) }} >
                        <InputField
                            placeholder={item.placeholder}
                            placeholderColor={Colors.darkGrey}
                            height={RFPercentage(7.2)}
                            backgroundColor={'#F4FFF8'}
                            borderWidth={RFPercentage(0.2)}
                            borderColor={Colors.primary}
                            secure={item.secure}
                            borderRadius={RFPercentage(1.6)}
                            color={Colors.black}
                            fontSize={RFPercentage(2)}
                            handleFeild={(text) => handleChange(text, i)}
                            value={item.value}
                            width={"90%"}
                        />
                    </View>
                ))}
            </View>

            <TouchableOpacity onPress={handleForget} activeOpacity={0.8} style={{ width: '50%', alignSelf: 'center', marginTop: RFPercentage(6) }} >
                <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '80%', height: RFPercentage(7), borderRadius: RFPercentage(1.6) }} >
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontFamily: 'Montserrat_600SemiBold' }} >
                        Send
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: '#F4FFF8'
    }
})

export default ForgetPasswordScreen;