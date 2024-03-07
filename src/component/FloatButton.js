import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';

const FloatButton = ({
    onPress,
    buttonColor,
    text,
    fontSize,
    labelColor,
    height,
    width,
    marginHorizontal,
    marginBottom,
    borderRadius,
    alignItems,
    justifyContent,
    textAlign,
    top,
    left,
    right,
    bottom
}) => {
    return (
        <TouchableOpacity
            style={{
                height: height ? height : hp(4.5),
                width: width ? width : wp(25),
                marginHorizontal: marginHorizontal ? marginHorizontal : null,
                marginBottom: marginBottom ? marginBottom : null,
                backgroundColor: buttonColor ? buttonColor : colors.green,
                borderRadius: borderRadius ? borderRadius : wp(2.1),
                alignItems: alignItems ? alignItems : 'center',
                justifyContent: justifyContent ? justifyContent : 'center',
                position: 'absolute',
                top: top ? top : null,
                bottom: bottom ? bottom : null,
                left: left ? left : null,
                right: right ? right : null
            }}
            // disabled={true}
            onPress={onPress}>
            <Text
                style={{
                    fontSize: fontSize ? fontSize : fontsSize.px_12,
                    color: labelColor ? labelColor : colors.white,
                    fontWeight:'bold'
                    // textAlign: textAlign ? textAlign : null,
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default FloatButton;


