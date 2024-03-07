import { Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';
// import colors from '../../assets/colors/colors';
// import icons from '../../assets/icons/icons';

const LeftRightText= ({
    leftText,
    leftTextColor,
    rightText,
    rightTextColor,
    leftfontFamily,
    leftfontSize,
    rightfontFamily,
    rightfontSize,
    marginTop,
    marginBottom,
    marginHorizontal
}) => {
    return (
        <View style={[styles.container, {
            marginTop : marginTop? marginTop : 0,
            marginBottom : marginBottom? marginBottom : 0,
            marginHorizontal: marginHorizontal ? marginHorizontal:0,
            alignSelf:'center'
            }]}>
            <View style={styles.leftBox}>
                {
                    leftText ? (
                        <Text 
                        style={[
                            styles.leftText, 
                            {
                                fontSize :leftfontSize ? leftfontSize : fontsSize.px_16,
                                fontFamily:leftfontFamily ? leftfontFamily : fonts.regular,
                                color:leftTextColor ? leftTextColor : colors.primaryColor
                            }
                        ]}
                        >{leftText}</Text>
                    ) :
                        null
                }
            </View>
            <View style={styles.rightBox}>
                {
                    rightText ? (
                        <Text 
                        style={[
                            styles.rightText, 
                            {
                                fontSize :rightfontSize ? rightfontSize : fontsSize.px_16,
                                fontFamily:rightfontFamily ? rightfontFamily : fonts.regular,
                                color:rightTextColor ? rightTextColor : colors.primaryColor
                            }
                        ]}
                        >{rightText}</Text>
                    ) :
                        null
                }
            </View>
            
        </View>
    )
}

export default LeftRightText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width:wp(90),
        alignItems: 'center',
        justifyContent: "space-between",
    },
    leftBox: {
        flex: 0.5,
        // paddingVertical:hp(1.5),
        // alignItems: 'center',
    },
    leftText: {
        fontSize: fontsSize.px_16,
        // fontWeight: 'bold',
        color: colors.primaryColor,
        fontFamily:fonts.regular
    },
    rightBox: {
        flex: 0.5,
        alignItems:'flex-end',
        // paddingVertical:hp(1.5),
        // alignItems: 'center',
    },
    rightText: {
        fontSize: fontsSize.px_16,
        // fontWeight: 'bold',
        color: colors.primaryColor,
        fontFamily:fonts.regular
    },
})
