import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen'
import fontsSize from '../assets/fontsSize/fontsSizes'
import colors from '../assets/colors/colors'
import fonts from '../assets/fonts/fonts'
import { useSelector } from 'react-redux'

const Input = ({
    value,
    label, 
    placeHolder, 
    onChangeText,
    marginTop,
    secureTextEntry,
    keyboardType,
    multiLine,
    width
}) => {
    const lang = useSelector(state=> state.data.language)
  return (
    <View style={{
        alignSelf: 'center',
        marginTop: marginTop ? marginTop :0,
        width:width? width : wp(92)
        }}>
        {label &&
            <Text style={styles.label}>{label}</Text>        
        }
      <TextInput
        value={value}
        style={[styles.input, {height : multiLine ? hp(15): hp(6) , textAlign : (lang ==='ar') ? 'right' : 'auto'}]}
        placeholderTextColor={colors.placeholder}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        multiline={multiLine ? true : false}
        secureTextEntry={secureTextEntry}
        textAlignVertical={multiLine ? 'top' :'auto'}
        keyboardType={keyboardType ? keyboardType  :'default'}
       />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal:wp(2)
    },
    label: {
        color:colors.primaryColor,
        fontSize:fontsSize.px_16,
        fontFamily:fonts.regular,
        fontWeight:'400'
    }
})

export default Input