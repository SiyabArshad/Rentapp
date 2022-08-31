import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Entypo } from '@expo/vector-icons';

//config
import Colors from '../../config/Colors';

function ImageAddingComponent({ threeBoxes = false, marginTop = RFPercentage(-1), onUploadImage1 = () => null, onUploadImage2 = () => null, onUploadImage3 = () => null, shelfMainPhoto, shelfPhotoGall2, shelfPhotoGall3 }) {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: '90%', marginTop: marginTop }}>
                {/* Image adding Box */}
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => onUploadImage1()} style={{ borderRadius: RFPercentage(2), justifyContent: 'center', alignItems: 'center', width: RFPercentage(14), height: RFPercentage(13), backgroundColor: '#F4FFF8', borderColor: Colors.primary, borderWidth: RFPercentage(0.2), marginTop: RFPercentage(2) }}>
                        {shelfMainPhoto ? <Image resizeMode="cover" source={shelfMainPhoto} style={{ width: RFPercentage(13.5), borderRadius: RFPercentage(2), height: RFPercentage(12.5), }} />
                            : <Entypo name="plus" size={RFPercentage(4.5)} color={Colors.primary} />
                        }
                    </TouchableOpacity>

                    {threeBoxes ?
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => onUploadImage2()} style={{ borderRadius: RFPercentage(2), marginLeft: RFPercentage(3.5), justifyContent: 'center', alignItems: 'center', width: RFPercentage(14), height: RFPercentage(13), backgroundColor: '#F4FFF8', borderColor: Colors.primary, borderWidth: RFPercentage(0.2), marginTop: RFPercentage(2) }}>
                                {shelfPhotoGall2 ? <Image resizeMode="cover" source={shelfPhotoGall2} style={{ width: RFPercentage(13.5), borderRadius: RFPercentage(2), height: RFPercentage(12.5), }} />
                                    : <Entypo name="plus" size={RFPercentage(4.5)} color={Colors.primary} />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => onUploadImage3()} style={{ borderRadius: RFPercentage(2), marginLeft: RFPercentage(3.5), justifyContent: 'center', alignItems: 'center', width: RFPercentage(14), height: RFPercentage(13), backgroundColor: '#F4FFF8', borderColor: Colors.primary, borderWidth: RFPercentage(0.2), marginTop: RFPercentage(2) }}>
                                {shelfPhotoGall3 ? <Image resizeMode="cover" source={shelfPhotoGall3} style={{ width: RFPercentage(13.5), borderRadius: RFPercentage(2), height: RFPercentage(12.5), }} />
                                    : <Entypo name="plus" size={RFPercentage(4.5)} color={Colors.primary} />
                                }
                            </TouchableOpacity>

                        </View> : null}
                </View>
            </View>
        </View>
    );
}

export default ImageAddingComponent;