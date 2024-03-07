import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/colors/colors';
// import colors from '../../assets/colors/colors';
// import icons from '../../assets/icons/icons';

const Header= ({
    title,
    titleColor,
    leftIcon,
    rightText,
    leftIconPress,
    rightTextPress
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftIconBox}>
                {
                    leftIcon ? (
                        <Pressable onPress={leftIconPress}>
                            <Image
                                source={leftIcon}
                                resizeMode='contain'
                                style={[styles.icon, { marginLeft: wp(4) }]}
                                tintColor={'black'}
                            />
                        </Pressable>
                    ) :
                        null
                }

            </View>
            <View style={styles.centerBox}>
                {
                    title ? (
                        <Text style={styles.title}>{title}</Text>
                    ) :
                        null
                }
            </View>
            <View style={styles.rightTextBox}>
                {
                    rightText ? (
                        <View>
                            <Text
                                style={[styles.textStyle]}
                            >
                                {rightText}
                            </Text>
                        </View>
                    ) :
                        null
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        height:hp(6),
        // backgroundColor:'red'
    },
    leftIconBox: {
        flex: 0.15,
        // alignItems: 'center'
        // paddingVertical: hp(1.5),
    },
    rightTextBox: {
        flex: 0.15,
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
    },
    centerBox: {
        flex: 0.7,
        alignItems: 'center'
    },
    title: {
        fontSize: wp(5),
        // fontWeight: 'bold',
        color: 'black',
        fontFamily:fonts.regular,
        // paddingVertical:wp(1.5),

    },
    icon: {
        height: hp(2),
        width: wp(5),
        paddingVertical:wp(2),
    },
    textStyle: {
        color:colors.black
        // paddingVertical:wp(2),
    }
})
