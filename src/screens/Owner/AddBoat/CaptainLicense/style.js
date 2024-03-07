import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import fonts from "../../../../assets/fonts/fonts"
import colors from "../../../../assets/colors/colors"
import fontsSize from "../../../../assets/fontsSize/fontsSizes"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        width:wp(100), 
        paddingHorizontal:wp(4),

    },
    bottomButtonContainer: {
        height:hp(10),
        position:'absolute',
        bottom: 0,
        width:wp(100),
        alignItems:'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    mainLabel:{
        fontSize:fontsSize.px_14,
        color:colors.primaryColor,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginVertical:wp(2)
    },
    input:{
        height : hp(6),
        paddingHorizontal:wp(2),
        borderWidth:1,
        borderColor:colors.primaryColor,
        borderRadius:wp(1.1),
        justifyContent:'center'
    },
})

export default styles