import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

//components
import Screen from './../components/Screen';
import InputField from './../components/common/InputField';
import LoadingModal from './../components/common/LoadingModal';
//config
import Colors from '../config/Colors';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signOut} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, serverTimestamp,getDocs,query,collection,where,deleteDoc} from "firebase/firestore"
import { set } from 'react-native-reanimated';
import { useIsFocused } from "@react-navigation/native";

function HomeScreen(props) {
    const db=getFirestore(app)
    const auth=getAuth(app)
    const isFocused = useIsFocused();
    const [indicator,showIndicator]=useState(false)
    const[ads,setads]=useState([])
    const[all,setall]=useState([])
    const[check,setcheck]=useState(0)
    const [serveas, setserveas] = useState("")
    const logoutops=()=>{
        signOut(auth).then(()=>{
       alert("Logged out")
        }).catch(()=>{
            alert("Try again later")
        })
    }

    const [inputField, SetInputField] = useState([
        {
            placeholder: "Search",
            value: "",
        },
    ]);

    const handleChange = (text, i) => {
        let tempfeilds = [...inputField];
        tempfeilds[i].value = text;
        SetInputField(tempfeilds);
        if(tempfeilds[i].value ==="")
        {
            setads(all)
            return
        }
        setads(all.filter((item)=>item.data.title.includes(tempfeilds[i].value)))

    };

    const categories = [
        {
            title: 'All'
        },
        {
            title: 'Apartment'
        },
        {
            title: 'Studio'
        },
        {
            title: 'Duplex'
        },
        {
            title: 'Villa'
        }
    ]

  
 const getads=async()=>{
        showIndicator(true)
        //const q = query(collection(db, "foods"), where("userid", "==",auth.currentUser.uid));
        getDocs(collection(db, "ads")).then((res)=>{
            const quests=res.docs.map(doc=>({
              data:doc.data(),
              id:doc.id
            }))
            setall(quests)
            setads(quests)
            showIndicator(false)
          }).catch((e)=>{
              showIndicator(false)
          })
    }
const filterbylocation=(val)=>{
setads(all.filter((item)=>item.data.location===val))
}
const filterbycategory=(caty,i)=>{
    if(caty==="All")
    {
        setcheck(i)
        setads(all)
        return
    }
    setcheck(i)
    setads(all.filter((item)=>item.data.type===caty))
}

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }
useEffect(()=>{
    if(isFocused)
    {
        getads()
    }
},[isFocused])
    return (
        <Screen style={styles.screen}>
            <LoadingModal show={indicator}></LoadingModal>
           <View style={{ marginTop: RFPercentage(3),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{width:"40%"}}>
           <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.6), fontFamily: 'Montserrat_700Bold' }} >
                Home
            </Text>
            </View>
            <View style={{width:"40%",alignItems:"flex-end"}}>
            <TouchableOpacity onPress={logoutops}>
            <Image  style={{height:RFPercentage(5),width:RFPercentage(5)}} source={require("../../assets/images/logout.png")}></Image>
            </TouchableOpacity>
            </View>
           </View>
            <View style={{ marginTop: RFPercentage(2), width: '90%',justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'center' }} >
                <Text style={{ fontSize: RFPercentage(3.6), color: Colors.black, fontFamily: 'Montserrat_600SemiBold' }} >
                    Find your
                </Text>
                <Text style={{ marginTop: RFPercentage(0.6), fontSize: RFPercentage(3.6), color: Colors.black, fontFamily: 'Montserrat_600SemiBold' }} >
                    Rental Space
                </Text>
            </View>

            {/* Input field */}
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {inputField.map((item, i) => (
                    <View key={i} style={{ marginTop: RFPercentage(2) }} >
                        <InputField
                            placeholder={item.placeholder}
                            placeholderColor={'#1115146E'}
                            leftIconName={'search'}
                            height={RFPercentage(7.2)}
                            backgroundColor={Colors.white}
                            borderWidth={RFPercentage(0.2)}
                            borderColor={'#FAFAFA'}
                            secure={item.secure}
                            borderRadius={RFPercentage(2.5)}
                            color={Colors.black}
                            fontSize={RFPercentage(2)}
                            handleFeild={(text) => handleChange(text, i)}
                            value={item.value}
                            width={"98%"}
                        />
                    </View>
                ))}
            </View>

            {/* Category */}
            <View style={{ marginTop: RFPercentage(2), flexDirection: 'row', width: '90%', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} >
                <Text style={{ fontSize: RFPercentage(2.7), color: Colors.black, fontFamily: 'Montserrat_400Regular' }} >
                    Category
                </Text>
                <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', right: 0 }} >
                    <FontAwesome name="filter" style={{ fontSize: RFPercentage(4.2) }} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: RFPercentage(3), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} >
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, width: '100%' }} >
                    {categories.map((item, i) => (
                        <TouchableOpacity onPress={()=>filterbycategory(item.title,i)} activeOpacity={0.7} key={i} style={{ marginLeft: RFPercentage(2), borderColor: Colors.primary, borderWidth: RFPercentage(0.1), justifyContent: 'center', alignItems: 'center', width: RFPercentage(14), height: RFPercentage(4.5), borderRadius: RFPercentage(1.2),backgroundColor:check===i?Colors.primary:Colors.white }} >
                            <Text style={{ color: Colors.black, fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(2.1) }} >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Cart */}
            <ScrollView style={{ flex: 1, width: '100%', marginTop: RFPercentage(1) }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {/* Location Picker */}
                    <View style={{ flexDirection: 'row', bottom: RFPercentage(0.5), marginTop: RFPercentage(5), width: '90%', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} >
                        <Text style={{ fontSize: RFPercentage(2.5), color: Colors.black, fontFamily: 'Montserrat_500Medium' }} >
                            Select Location
                        </Text>
                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(27), height: RFPercentage(5), borderRadius: RFPercentage(1.5), borderColor: Colors.grey, borderWidth: RFPercentage(0.2), position: 'absolute', right: 0 }} >
                            <View style={{ width: '90%' }} >
                                <RNPickerSelect
                                    onValueChange={(value) => filterbylocation(value)}
                                    placeholder={{ label: 'Location' }}
                                    Icon={Platform.OS == 'android' ? null : iconComponent}
                                    items={[
                                        { label: 'Hurghada', value: 'Hurghada' },
                                        { label: 'Sahl Hasheesh', value: 'Sahl Hasheesh' },
                                        { label: 'Makadi', value: 'Makadi' },
                                        { label: 'El Gouna', value: 'El Gouna' },
                                        { label: 'Magawish', value: 'Magawish' },
                                        { label: 'El Ahyaa', value: 'El Ahyaa' },
                                        { label: 'El Helal', value: 'El Helal' },
                                        { label: 'El Kawther', value: 'El Kawther' },
                                        { label: 'El Dahar', value: 'El Dahar' },
                                        { label: 'Intercontinental District', value: 'Intercontinental District' },
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Recomended */}
                    <View style={{ flexDirection: 'row', bottom: RFPercentage(0.5), marginTop: RFPercentage(5), width: '90%', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} >
                        <Text style={{ fontSize: RFPercentage(2.6), color: Colors.black, fontFamily: 'Montserrat_400Regular' }} >
                            Recomended
                        </Text>
                    </View>
                    {ads?.map((item, i) => (
                        <View key={i} style={{ marginTop: i !== 0 ? RFPercentage(2) : 0, width: '100%', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'center' }} >
                            <TouchableOpacity onPress={() => props.navigation.navigate("DetailPageScreen",{data:item.data})} activeOpacity={0.8} style={{ marginTop: RFPercentage(3), justifyContent: 'center', alignItems: 'flex-start', width: '90%', alignSelf: 'center' }} >
                                <Image source={{uri:item.data.image1}} style={{ borderRadius: RFPercentage(2), width: '100%', height: RFPercentage(40) }} />
                            </TouchableOpacity>
                            <View style={{ marginTop: RFPercentage(1.7), width: '90%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }} >
                                <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(2.2), color: Colors.black }} >
                                    {item.data.title}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }} >
                                    <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: RFPercentage(2.2), color: Colors.primary }} >
                                        {item.data.price}
                                    </Text>
                                    <Text style={{ left: RFPercentage(0.5), fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(2.2), color: Colors.black }} >
                                        /month
                                    </Text>

                                </View>
                            </View>
                            <View style={{ marginTop: RFPercentage(1), width: '90%', alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                    {item.data.beds} Beds
                                </Text>
                                <Text style={{ marginLeft: RFPercentage(5), fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                    {item.data.baths} Baths
                                </Text>
                                <Text style={{ marginLeft: RFPercentage(5), fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                    {item.data.area} sqft
                                </Text>
                            </View>
                        </View>
                    ))}

                    <View style={{ marginBottom: RFPercentage(30) }} />
                </View>
            </ScrollView>

            {/* Plus */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("AddPropertyScreen")} style={{ position: 'absolute', bottom: RFPercentage(3), right: RFPercentage(3) }} >
                <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(9.8), height: RFPercentage(9.8), borderRadius: RFPercentage(30) }} >
                    <Feather name="plus" style={{ fontSize: RFPercentage(5.4) }} color={Colors.white} />
                </LinearGradient>
            </TouchableOpacity>
        </Screen >
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


export default HomeScreen;