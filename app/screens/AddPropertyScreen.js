import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Dimensions, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from "@expo/vector-icons";

//components
import Screen from './../components/Screen';
import InputField from './../components/common/InputField';
import ImageAddingComponent from '../components/common/ImageAddingComponent';

//config
import Colors from '../config/Colors';
import app from "../../firebase"
import { doc, setDoc,getFirestore,collection,addDoc,getDocs,getDoc,updateDoc,serverTimestamp  } from "firebase/firestore"; 
import {getAuth,updateProfile} from "firebase/auth"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
const { height } = Dimensions.get("window");
import LoadingModal from '../components/common/LoadingModal';
import { async } from '@firebase/util';
function AddPropertyScreen(props) {
    const auth=getAuth(app)
    const db=getFirestore(app)
    const storage=getStorage(app)
    const[indicator,showindicator]=useState(false)
    const [serveas, setserveas] = useState("")
    const [locations, setlocation] = useState("")
    // Input fields
    const [inputField, SetInputField] = useState([
        {
            placeholder: "Add Title",
            value: "",
        },
        {
            placeholder: "No of Beds",
            value: "",
        },
        {
            placeholder: "No of Baths",
            value: "",
        },
        {
            placeholder: "Total Area in sqft",
            value: "",
        },
        {
            placeholder: "Price",
            value: "",
        },
        {
            placeholder: "City/State/Postal Code",
            value: "",
        },
        {
            placeholder: "Ad Description",
            placeholderAtStart: true,
            multiLine: true,
            value: "",
        },
        {
            placeholder: "Ad Contact",
            value: "",
        },

    ]);

    const handleChange = (text, i) => {
        let tempfeilds = [...inputField];
        tempfeilds[i].value = text;
        SetInputField(tempfeilds);

    };

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }

    // Image Picker stuff
    const [pickerModel, setPickerModel] = useState(false);
    const [currentImageBox, setcurrentImageBox] = useState(null);

    const [shelfMainPhoto, setshelfMainPhoto] = useState(false)
    const [shelfPhotoGall1, setshelfPhotoGall1] = useState(false)
    const [shelfPhotoGall2, setshelfPhotoGall2] = useState(false)
    const [shelfPhotoGall3, setshelfPhotoGall3] = useState(false)
    const [shelfPhotoGall4, setshelfPhotoGall4] = useState(false)
    const [shelfPhotoGall5, setshelfPhotoGall5] = useState(false)
    const [shelfPhotoGall6, setshelfPhotoGall6] = useState(false)
    const [bottomTab, setBottomTab] = useState(true);
    const [model, setModel] = useState(false);

    const uploadImages = async (imageSelecor) => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            await ImagePicker.requestCameraPermissionsAsync()
            await ImagePicker.getCameraPermissionsAsync()
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }
            let pickerResult;
            if (imageSelecor === "camera") {
                pickerResult = await ImagePicker.launchCameraAsync();
            }
            else if (imageSelecor === "gallery") {
                pickerResult = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: 'Images'
                });
            }
            

            if (currentImageBox === 1) {
                setshelfMainPhoto(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 2) {
                setshelfPhotoGall1(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 3) {
                //console.log("here")
                setshelfPhotoGall2(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 4) {
                setshelfPhotoGall3(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 5) {
                setshelfPhotoGall4(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 6) {
                setshelfPhotoGall5(pickerResult)
                setPickerModel(false)
            }
            else if (currentImageBox === 7) {
                setshelfPhotoGall6(pickerResult)
                setPickerModel(false)
            }

        } catch (error) {

        }
    }


const publishad=async()=>{
    showindicator(true);
    let tempfeilds = [...inputField];
if(serveas===""||locations===""||tempfeilds[0].value === "" || tempfeilds[1].value === ""||tempfeilds[2].value === "" || tempfeilds[3].value === ""||tempfeilds[4].value === "" || tempfeilds[5].value === ""||tempfeilds[6].value===""||tempfeilds[7].value==="")
{
    showindicator(false)
    alert("some feilds are missing")
    return true
}
    try{
        const docRef=await addDoc(collection(db, "ads"), {
            type:serveas,
            location:locations,
            title:tempfeilds[0].value,
            beds:tempfeilds[1].value,
            baths:tempfeilds[2].value,
            area:tempfeilds[3].value,
            price:tempfeilds[4].value,
            cspc:tempfeilds[5].value,
            desc:tempfeilds[6].value,
            contact:tempfeilds[7].value,
            time:serverTimestamp(),
            userid:auth.currentUser.uid,
          })
         if(shelfPhotoGall1)
         {
            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image1"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall1.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads",docRef.id), {
                    image1: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image1")
            })
         }
         if(shelfPhotoGall2)
         {

            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image2"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall2.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads",docRef.id), {
                    image2: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image2")
            })
         }
         if(shelfPhotoGall3)
         {

            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image3"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall3.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads", docRef.id), {
                    image3: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image 3")
            })
         }
         if(shelfPhotoGall4)
         {

            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image4"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall4.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads", docRef.id), {
                    image4: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image 4")
            })
         }
         if(shelfPhotoGall5)
         {

            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image5"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall5.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads", docRef.id), {
                    image5: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image 5")
            })
         }
         if(shelfPhotoGall6)
         {

            const storageRef = ref(storage,'property/' + auth.currentUser.email + "ad +image6"+new Date().toLocaleString());
            const img = await fetch(shelfPhotoGall6.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "ads", docRef.id), {
                    image6: downloadURL,
                  });
            }).catch((e)=>{
                alert("upload failed image 6")
            })
         }
          showindicator(false)
          alert("Ad Published")
}
catch{
    showindicator(false)
    alert("something went wrong")
}
}
    return (
        <Screen style={styles.screen}>
<LoadingModal show={indicator} />
            {/* Nav */}
            <View style={{ marginTop: RFPercentage(4), width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                {/* Back */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("HomeScreen")} style={{ position: 'absolute', left: 0 }} >
                    <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(5.2), height: RFPercentage(5.2), borderRadius: RFPercentage(30) }} >
                        <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(4) }} color={Colors.white} />
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.6), fontFamily: 'Montserrat_700Bold' }} >
                    Add Property
                </Text>
            </View>

            <View style={{ marginTop: RFPercentage(6), width: '90%', justifyContent: 'center', alignItems: 'flex-start' }} >
                <Text style={{ color: Colors.black, fontFamily: 'Montserrat_700Bold', fontSize: RFPercentage(3) }} >
                    Ad Details
                </Text>
            </View>

            {/* Input Fields */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView style={{ flex: 1, width: '100%', marginTop: RFPercentage(2) }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <View style={{ borderColor: Colors.grey, height: RFPercentage(7), borderWidth: RFPercentage(0.2), borderRadius: RFPercentage(2), width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(3) }} >
                            <View style={{ width: '90%' }} >
                                <RNPickerSelect
                                    onValueChange={(value) => setserveas(value)}
                                    placeholder={{ label: 'Property Type' }}
                                    Icon={Platform.OS == 'android' ? null : iconComponent}
                                    items={[
                                        { label: 'Apartment', value: 'Apartment' },
                                        { label: 'Studio', value: 'Studio' },
                                        { label: 'Duplex', value: 'Duplex' },
                                        { label: 'Villa', value: 'Villa' },
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={{ borderColor: Colors.grey, height: RFPercentage(7), borderWidth: RFPercentage(0.2), borderRadius: RFPercentage(2), width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: RFPercentage(3) }} >
                            <View style={{ width: '90%' }} >
                                <RNPickerSelect
                                    onValueChange={(value) => setlocation(value)}
                                    placeholder={{ label: 'Select Location of your Property' }}
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
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            {inputField.map((item, i) => (
                                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(2.5) : RFPercentage(2) }} >
                                    <InputField
                                        placeholder={item.placeholder}
                                        placeholderColor={'#1115146E'}
                                        height={i == 6 ? RFPercentage(24) : RFPercentage(7)}
                                        backgroundColor={'#F4FFF83B'}
                                        borderWidth={RFPercentage(0.2)}
                                        borderColor={Colors.grey}
                                        secure={item.secure}
                                        multiline={item.multiLine}
                                        placeholderAtStart={item.placeholderAtStart}
                                        borderRadius={RFPercentage(2)}
                                        color={Colors.black}
                                        fontSize={RFPercentage(2)}
                                        handleFeild={(text) => handleChange(text, i)}
                                        value={item.value}
                                        width={"94%"}
                                    />
                                </View>
                            ))}
                        </View>

                        <View style={{ marginTop: RFPercentage(3), width: '89%', justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text style={{ color: Colors.black, fontFamily: 'Montserrat_500Medium', fontSize: RFPercentage(2) }} >
                                Property Images
                            </Text>
                        </View>
                        <View style={{ marginTop: RFPercentage(3), width: '89%', justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text style={{ color: Colors.grey, fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.9) }} >
                                Add Photos
                            </Text>
                        </View>

                        <ImageAddingComponent
                            onUploadImage1={() => {
                                setcurrentImageBox(2)
                                setPickerModel(true)
                            }}
                            onUploadImage2={() => {
                                setcurrentImageBox(3)
                                setPickerModel(true)
                            }}
                            onUploadImage3={() => {
                                setcurrentImageBox(4)
                                setPickerModel(true)
                            }}
                            
                            shelfMainPhoto={shelfPhotoGall1}
                            shelfPhotoGall2={shelfPhotoGall2}
                            shelfPhotoGall3={shelfPhotoGall3}
                            threeBoxes={true} title1="Shelf Photo Gallery" title2="Upload other photos for this listing" />

                        <ImageAddingComponent
                            onUploadImage1={() => {
                                setcurrentImageBox(5)
                                setPickerModel(true)
                            }}
                            onUploadImage2={() => {
                                setcurrentImageBox(6)
                                setPickerModel(true)
                            }}
                            onUploadImage3={() => {
                                setcurrentImageBox(7)
                                setPickerModel(true)
                            }}
                            
                            shelfMainPhoto={shelfPhotoGall4}
                            shelfPhotoGall2={shelfPhotoGall5}
                            shelfPhotoGall3={shelfPhotoGall6}
                            threeBoxes={true} title1="Shelf Photo Gallery" title2="Upload other photos for this listing" />

                        {/*Bottom Button */}
                        <TouchableOpacity onPress={publishad} activeOpacity={0.8} style={{ width: '100%', alignSelf: 'center', marginTop: RFPercentage(6) }} >
                            <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '80%', height: RFPercentage(7), borderRadius: RFPercentage(2.8) }} >
                                <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontFamily: 'Montserrat_600SemiBold' }} >
                                    Publish Ad
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ marginBottom: RFPercentage(4) }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Modal for adding photo */}
            <Modal visible={pickerModel} transparent={true} >
                <View style={{ justifyContent: "flex-end", flex: 1, height: height, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <View style={{ alignItems: "center", borderTopLeftRadius: RFPercentage(3), borderTopRightRadius: RFPercentage(3), backgroundColor: Colors.white, width: "100%", height: RFPercentage(25) }} >
                        <View style={{ width: "90%", marginTop: RFPercentage(1.5) }} >
                            <TouchableOpacity onPress={() => setPickerModel(false)} >
                                <Entypo size={RFPercentage(3)} name="cross" color={Colors.grey} />
                            </TouchableOpacity>
                            <Text style={{ marginTop: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2), fontWeight: "bold" }} >Select Photo</Text>
                            <TouchableOpacity onPress={() => uploadImages("camera")} style={{ backgroundColor: "#F7F7F7", marginTop: RFPercentage(1), borderRadius: RFPercentage(1), justifyContent: "center", width: "96%", marginLeft: "2%", height: RFPercentage(5.5), borderWidth: 1, borderColor: "#3A3384" }} >
                                <Text style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(2.2) }} >Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => uploadImages("gallery")} style={{ backgroundColor: "#F7F7F7", marginTop: RFPercentage(1), borderRadius: RFPercentage(1), justifyContent: "center", width: "96%", marginLeft: "2%", height: RFPercentage(5.5), borderWidth: 0, borderColor: "#3A3384" }} >
                                <Text style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(2.2) }} >Photo Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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

export default AddPropertyScreen;