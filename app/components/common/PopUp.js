import React, { useState } from 'react';
import { Modal, View, Text, Image, Dimensions } from 'react-native';
import Colors from '../../config/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import MyAppButton from './MyAppButton';

const { height } = Dimensions.get('window');

function PopUp({ title, buttonTitle, showModel = false, onPress = () => { } }) {

    return (

        <Modal visible={showModel} transparent={true}  >
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", height: height, justifyContent: "center", alignItems: "center", width: "100%" }} >
                <View style={{ alignItems: "center", borderRadius: RFPercentage(4), backgroundColor: "white", marginBottom: RFPercentage(7), height: RFPercentage(50), width: "80%" }} >
                    {/* image */}
                    <View style={{ marginTop: RFPercentage(5), justifyContent: 'center', alignItems: "center", borderRadius: RFPercentage(4), width: RFPercentage(6.5) }} >
                        {/* <MaterialCommunityIcons name="check" size={RFPercentage(4)} color={Colors.white} /> */}
                        <Image source={require('../../../assets/images/c1.png')} />
                    </View>
                    <Text style={{ textAlign: "center", width: "75%", color: "rgba(0, 0, 0, 0.5)", fontSize: RFPercentage(2.2), marginTop: RFPercentage(2) }} >
                        {title}
                    </Text>
                    <View style={{ marginTop: RFPercentage(8), width: '100%' }}>
                        <MyAppButton
                            title={buttonTitle}
                            padding={RFPercentage(1.6)}
                            bold={false}
                            onPress={onPress}
                            backgroundColor={Colors.primary}
                            color={Colors.white}
                            width={"80%"}
                            borderRadius={10}
                        />
                    </View>
                </View>
            </View>


        </Modal>
    );
}

export default PopUp;