import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import fontsSize from '../assets/fontsSize/fontsSizes'
import fonts from '../assets/fonts/fonts'

const Button = ({
    label, 
    onPress, 
    width,
    borderRadius,
    borderWidth,
    borderColor,
    backgroundColor,
    textSize,
    textColor,
    marginTop,
    marginBottom,
    height,
    disabled
}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
      disabled={disabled ? disabled : false} 
        style={{
            marginTop:marginTop?marginTop:0,
            marginBottom:marginBottom?marginBottom:0,
            backgroundColor:backgroundColor ? backgroundColor : colors.primaryColor ,
            width: width ? width : wp(90),
            height: height ? height :hp(6),
            alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',
            borderColor:borderColor ? borderColor: colors.primaryColor,
            borderWidth: borderWidth ? borderWidth : 0,
            borderRadius:borderRadius ? borderRadius : wp(1.5),
        }} >

      <Text style={{
        color: textColor ? textColor : colors.white,
        fontSize: textSize ? textSize : fontsSize.px_16,
        fontFamily:fonts.regular,
        }}>{label}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
})

export default Button