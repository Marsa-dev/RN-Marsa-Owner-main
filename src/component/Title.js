import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { 
    heightPercentageToDP as hp,
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen'
import fontsSize from '../assets/fontsSize/fontsSizes'
import colors from '../assets/colors/colors'
import fonts from '../assets/fonts/fonts'

const Title = ({label, marginTop, marginHorizontal}) => {
  return (
    <View style={[
        styles.container, 
        {
            marginTop: marginTop ? marginTop :0,
            marginHorizontal: marginHorizontal?  marginHorizontal:0,
        }]}>
        <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        // backgroundColor:'yellow'
        // alignItems: 'center',
    },
    label: {
        color:colors.primaryColor,
        fontSize:fontsSize.px_20,
        fontWeight:'500',
        fontFamily:fonts.regular
    }
})

export default Title