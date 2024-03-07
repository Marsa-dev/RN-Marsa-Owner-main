import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen'
import fontsSize from '../assets/fontsSize/fontsSizes'
import colors from '../assets/colors/colors'
import fonts from '../assets/fonts/fonts'

const NonEditableInput = ({
    value,
    label, 
    placeHolder, 
    onChangeText,
    marginTop
}) => {
  return (
    <View style={[styles.container, {marginTop: marginTop ? marginTop :0}]}>
        {label &&
            <Text style={styles.label}>{label}</Text>        
        }
      <TextInput
        editable={false}
        value={value}
        style={styles.input}
        placeholderTextColor={colors.placeholder}
        placeholder={placeHolder}
        onChangeText={onChangeText}
       />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width:wp(92),
        alignSelf: 'center',
    },
    input: {
        width:'100%',
        borderWidth:1,
        height:hp(6),
        marginTop:hp(0.5),
        borderColor:colors.primaryColor,
        color:colors.primaryColor,
        borderRadius:wp(1.5),
        paddingHorizontal:wp(2),
        backgroundColor:colors.grey
    },
    label: {
        color:colors.primaryColor,
        fontSize:fontsSize.px_16,
        fontFamily:fonts.regular,
        fontWeight:'400'
    }
})

export default NonEditableInput