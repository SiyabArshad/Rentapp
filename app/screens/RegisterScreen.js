import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';

//components
import Screen from '../components/Screen';
import MyAppButton from './../components/common/MyAppButton';
import LoadingModal from './../components/common/LoadingModal';
import InputField from './../components/common/InputField';

//config
import Colors from '../config/Colors';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, serverTimestamp} from "firebase/firestore"

function RegisterScreen(props) {
    const db=getFirestore(app)
    const auth=getAuth(app)
    // Input fields
    const [indicator, showIndicator] = useState(false);

    const [inputField, SetInputField] = useState([
        {
            placeholder: "Enter email",
            value: "",
        },
        {
            placeholder: "Enter password",
            value: "",
        },

    ]);

    const handleChange = (text, i) => {
        let tempfeilds = [...inputField];
        tempfeilds[i].value = text;
        SetInputField(tempfeilds);

    };

    const handleLogin = () => {
        showIndicator(true);
        let tempfeilds = [...inputField];

        if (tempfeilds[0].value === "" || tempfeilds[1].value === "") {
            alert("Please fill all the feilds");
            showIndicator(false);
            return true;
        }

        try {
            // API INTEGRATION WILL COME HERE
            createUserWithEmailAndPassword(auth,tempfeilds[0].value,tempfeilds[1].value).then((userCredential) => {  
                sendEmailVerification(userCredential.user).then(()=>{
                    setDoc(doc(db, "users",userCredential.user.uid ), {
                        username:tempfeilds[0].value,
                        email:tempfeilds[0].value,
                        time:serverTimestamp(),
                        userid:userCredential.user.uid,
                    }).then((result)=>{
                        updateProfile(auth.currentUser,{displayName:tempfeilds[0].value,photoURL:""})
                        //email sent to registered account email address
                        
                        //end eamil sent code

                        showIndicator(false);
                    alert("Welcome to HurghadaRentals")
                    }).catch((error)=>{
                        deleteUser(auth.currentUser).then(() => {
                            // User deleted.
                            showIndicator(false)
                          }).catch((error) => {
                            // An error ocurred
                            // ...
                            showIndicator(false)
                          });
                          const errorCode = error.code;
                          const errorMessage = error.message;
                          showIndicator(false);
                          alert(errorMessage)
                  }).catch(()=>{
                    showIndicator(false);
                  })
        
                })
                    
           //     props.navigation.navigate("HomeScreen")
                }).catch((error)=>{
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    showIndicator(false);
                    alert(errorMessage)
              })
        
        } catch (error) {
            showIndicator(false);
            alert("Error");
        }

        //showIndicator(false);
    };

    return (
        <Screen style={styles.screen}>
            <LoadingModal show={indicator} />
            {/* Logo */}
            <Image source={require('../../assets/images/lm.png')} style={styles.logo} />

            <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={styles.linearGradient} >
                <ScrollView style={{ flex: 1, width: '100%' }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Text style={{ marginTop: RFPercentage(6), color: Colors.white, fontSize: RFPercentage(3.2), fontFamily: 'Montserrat_700Bold' }} >
                            Hello!
                        </Text>
                        <View style={{ marginTop: RFPercentage(2.6), width: '90%', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontFamily: 'Montserrat_400Regular' }} >
                                Welcome to Hurghada Rentals!
                            </Text>
                        </View>

                        {/* Input field */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            {inputField.map((item, i) => (
                                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(2) }} >
                                    <InputField
                                        placeholder={item.placeholder}
                                        placeholderColor={Colors.white}
                                        height={RFPercentage(7.2)}
                                        backgroundColor={'#F4FFF83B'}
                                        borderWidth={RFPercentage(0.2)}
                                        borderColor={'#FAFAFA'}
                                        secure={item.secure}
                                        borderRadius={RFPercentage(1.6)}
                                        color={Colors.white}
                                        fontSize={RFPercentage(2)}
                                        handleFeild={(text) => handleChange(text, i)}
                                        value={item.value}
                                        width={"90%"}
                                    />
                                </View>
                            ))}
                        </View>
                        {/* Forget Password */}
                        <View style={{ marginTop: RFPercentage(1), width: '87%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("ForgetPasswordScreen")} >
                                <Text style={{ fontFamily: 'Montserrat_400Regular', color: Colors.white, fontSize: RFPercentage(1.8), color: Colors.white }} >
                                    Forget Password ?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Button */}
                        <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(5) }}>
                            <MyAppButton
                                title="Register Now"
                                padding={RFPercentage(2)}
                                onPress={() => handleLogin()}
                                backgroundColor={Colors.white}
                                color={Colors.black}
                                bold={false}
                                fontFamily={'Montserrat_600SemiBold'}
                                borderRadius={RFPercentage(1.5)}
                                width={"87%"}
                            />
                        </View>

                        {/* or 
                        <View style={{ marginTop: RFPercentage(4.5), width: '67%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                            <View style={{ width: RFPercentage(10), height: RFPercentage(0.1), backgroundColor: Colors.white, position: 'absolute', left: 0 }} />
                            <Text style={{ color: Colors.white, fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.8) }} >
                                or continue with
                            </Text>
                            <View style={{ width: RFPercentage(10), height: RFPercentage(0.1), backgroundColor: Colors.white, position: 'absolute', right: 0 }} />
                        </View>

                        {/* Social Links 
                        <View style={{ marginTop: RFPercentage(4), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }} >
                            <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(4.8), height: RFPercentage(4.8), borderRadius: RFPercentage(1.7), borderColor: Colors.white, borderWidth: RFPercentage(0.1), backgroundColor: '#F4FFF83B' }} >
                                <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require('../../assets/images/g.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: RFPercentage(2.5), justifyContent: 'center', alignItems: 'center', width: RFPercentage(4.8), height: RFPercentage(4.8), borderRadius: RFPercentage(1.7), borderColor: Colors.white, borderWidth: RFPercentage(0.1), backgroundColor: '#F4FFF83B' }} >
                                <Image style={{ width: RFPercentage(1.5), height: RFPercentage(2.7) }} source={require('../../assets/images/f.png')} />
                            </TouchableOpacity>
                        </View>
*/}
                        {/* Not a memeber text */}
                        <View style={{ position: 'absolute', bottom: RFPercentage(4), width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(1.9), fontFamily: 'Montserrat_400Regular' }} >
                                Already a member?
                            </Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("SigninScreen")} >
                                <Text style={{ marginLeft: RFPercentage(1), color: Colors.white, fontSize: RFPercentage(1.9), fontFamily: 'Montserrat_400Regular' }} >
                                    Login Now
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: RFPercentage(10) }} />
                    </View>
                </ScrollView>
            </LinearGradient>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: Colors.white
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: RFPercentage(4),
        borderTopRightRadius: RFPercentage(4),
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'flex-start',
        width: '100%',
        height: RFPercentage(77.5)
    },
    logo: {
        marginTop: RFPercentage(3.5),
        width: RFPercentage(30),
        height: RFPercentage(14.5)
    }
})

export default RegisterScreen;