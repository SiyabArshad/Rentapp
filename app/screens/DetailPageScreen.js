import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from '@expo/vector-icons';
import {Linking} from 'react-native'
//components
import Screen from './../components/Screen';

//config
import Colors from '../config/Colors';

function DetailPageScreen(props) {
const data=props.route.params.data
    const dataImages = {
        images: [
            require('../../assets/images/c1.png'),
            require('../../assets/images/c2.png'),
            require('../../assets/images/c1.png'),
        ]
    }
const sliderimages=[]
sliderimages.push(data.image1)
sliderimages.push(data.image2)
sliderimages.push(data.image3)
const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber).catch(e=>console.war(e));
 };
    return (
        <Screen style={styles.screen}>

            {/* Images Swiper  */}
            <View style={{ height: RFPercentage(30), width: '100%' }}>
                <SliderBox
                    images={sliderimages}
                    sliderBoxHeight={RFPercentage(40)}
                    inactiveDotColor="#90A4AE"
                    // ImageComponentStyle={{ height: RFPercentage(30) }}
                    dotColor="#ffff"
                // onCurrentImagePressed={index =>
                //     console.warn(`image ${index} pressed`)
                // }
                />
            </View>

            {/* Back Navigation */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("HomeScreen")} style={{ position: 'absolute', top: RFPercentage(4), left: RFPercentage(2), width: RFPercentage(5), height: RFPercentage(5), backgroundColor: Colors.white, borderRadius: RFPercentage(20), justifyContent: 'center', alignItems: 'center' }} >
                <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(4) }} color={Colors.black} />
            </TouchableOpacity>

            {/* Details */}
            <ScrollView style={{ flex: 1, width: '100%', marginTop: RFPercentage(2) }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'center' }} >
                        <View style={{ marginTop: RFPercentage(1.7), width: '90%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }} >
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(2.2), color: Colors.black }} >
                                {data.title}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }} >
                                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: RFPercentage(2.2), color: Colors.primary }} >
                                    ${data.price}
                                </Text>
                                <Text style={{ left: RFPercentage(0.5), fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(2.2), color: Colors.black }} >
                                    /month
                                </Text>

                            </View>
                        </View>
                        <View style={{ marginTop: RFPercentage(2), width: '90%', alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                {data.location}
                            </Text>
                        </View>
                        <View style={{ marginTop: RFPercentage(2.5), width: '90%', alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                {data.beds} Beds
                            </Text>
                            <Text style={{ marginLeft: RFPercentage(5), fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                {data.baths} Baths
                            </Text>
                            <Text style={{ marginLeft: RFPercentage(5), fontFamily: 'Montserrat_400Regular', fontSize: RFPercentage(1.7), color: Colors.darkGrey }} >
                                {data.area} sqft
                            </Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={{ marginTop: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'center' }} >
                        <Text style={{ color: Colors.black, fontSize: RFPercentage(2.8), fontFamily: 'Montserrat_600SemiBold' }} >
                            Details
                        </Text>
                        <Text style={{ lineHeight: RFPercentage(2.8), marginTop: RFPercentage(2), color: Colors.black, fontSize: RFPercentage(2), fontFamily: 'Montserrat_400Regular' }} >
                          {data.desc}
                        </Text>
                    </View>

                    {/* Owner Info */}
                    <View style={{ marginTop: RFPercentage(6), width: RFPercentage(48), height: RFPercentage(11.5), backgroundColor: Colors.white, borderRadius: RFPercentage(2.5), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} >

                        <View style={{ marginLeft: RFPercentage(2), justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: Colors.black, fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(2.2) }} >
                                Owner Info:
                            </Text>
                            <Text style={{ marginTop: RFPercentage(1), color: Colors.darkGrey, fontFamily: 'Montserrat_600SemiBold', fontSize: RFPercentage(1.8) }} >
                                +{data.contact}
                            </Text>
                        </View>

                        {/* Call Icon */}
                        <TouchableOpacity onPress={()=>dialCall(data.contact)} activeOpacity={0.8} style={{ position: 'absolute', right: RFPercentage(2) }} >
                            <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(7), height: RFPercentage(7), borderRadius: RFPercentage(2.8) }} >
                                <FontAwesome name="phone" style={{ fontSize: RFPercentage(4) }} color={Colors.white} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/*Bottom Button */}
            <TouchableOpacity activeOpacity={0.8} style={{ width: '100%', position: 'absolute', bottom: RFPercentage(3), alignSelf: 'center' }} >
                <LinearGradient colors={['#38EF7D', '#11998E']} start={[1, 1]} end={[0.5, 0.1]} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '80%', height: RFPercentage(7), borderRadius: RFPercentage(2.8) }} >
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(2.2), fontFamily: 'Montserrat_600SemiBold' }} >
                        Rent Now
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

export default DetailPageScreen;