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
    mainLabel:{
        fontSize:fontsSize.px_14,
        color:colors.primaryColor,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginVertical:wp(2)
    },
    addImageView: {
        height:hp(25),
        borderColor:colors.primaryColor,
        borderRadius:wp(2),
        borderStyle:'dashed',
        borderWidth:wp(0.5),
        alignItems:'center',
        justifyContent: 'center',
    },
    addImageText: {
        fontSize:fontsSize.px_18,
        fontFamily:fonts.medium,
        color:colors.primaryColor
    },
    addImageBottomText : {
        fontSize:fontsSize.px_14,
        fontFamily:fonts.medium,
        color:colors.primaryColor
    },
})

export default styles