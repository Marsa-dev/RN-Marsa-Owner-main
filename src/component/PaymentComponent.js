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

const PaymentComponent= ({
    title,
    titleColor,
    leftIcon,
    rightIcon,
    leftIconPress,
    rightIconPress,
    onPress,
    marginTop
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, {marginTop: marginTop ? marginTop :0}]}>
            <View style={styles.leftIconBox}>
                {
                    leftIcon ? (
                        <Image 
                        source={leftIcon} 
                        style={{
                            width:wp(15),
                            height:hp(2.2),
                            resizeMode:'contain'
                        }} />
                    ) :
                        null
                }
            </View>
            <View style={styles.centerTextBox}>
                {
                    title ? (
                        <Text style={styles.title}>{title}</Text>
                    ) :
                        null
                }
            </View>
            <View style={styles.rightIconBox}>
                {
                    rightIcon ? (
                        <Pressable style={{paddingVertical:hp(1.5)}} onPress={() => {console.log("PREss")}}>
                            <Image
                                source={rightIcon}
                                resizeMode='contain'
                                style={[styles.icon]}
                                tintColor={colors.primaryColor}
                            />
                        </Pressable>
                    ) :
                        null
                }
            </View>
        </TouchableOpacity>
    )
}

export default PaymentComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width:wp(90),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: "space-between",
        borderRadius:wp(1),
        borderColor:colors.primaryColor,
        borderWidth:1,
        paddingHorizontal:wp(2),
    },
    leftIconBox: {
        flex: 0.25,
        // alignItems: 'center',
        // paddingVertical:hp(1.5),
        // backgroundColor:'red'
        
    },
    centerTextBox: {
        flex: 0.65,
        paddingVertical:hp(1.5),
        // alignItems: 'center',
        // backgroundColor:'red'
    },
    rightIconBox: {
        flex: 0.1,
        // backgroundColor:'blue'
        // alignItems:'flex-end',
        // right:0,
        // position:'absolute',
        // alignItems: 'center',
        // paddingVertical:hp(1.5),
        // alignContent: 'flex-end',
        // flexDirection: 'row',

    },
    title: {
        fontSize: fontsSize.px_16,
        // fontWeight: 'bold',
        color: colors.primaryColor,
        fontFamily:fonts.regular

    },
    icon: {
        height: hp(2),
        width: wp(5),
        alignSelf:'flex-end',
        // paddingVertical:wp(1.5),
    }
})
