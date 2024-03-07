import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import colors from "../../../../assets/colors/colors"
import fontsSize from "../../../../assets/fontsSize/fontsSizes"
import fonts from "../../../../assets/fonts/fonts"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom:hp(5)
    },
    mainLabel:{
        fontSize:fontsSize.px_14,
        color:colors.primaryColor,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginVertical:wp(2)
    },
    innerContainer: {
        paddingHorizontal:wp(4)
    },
    addImageView: {
        height:hp(12),
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
    imagesContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    listImages:{
        height: hp(8.5), 
        width: wp(17),
        marginTop: hp(2), 
        justifyContent: 'flex-end', 
        marginRight: wp(1) 
    },
    listImage:{
        height: hp(8), 
        width: wp(16), 
        borderRadius: wp(1.1)  
    },
    crossContainer: {
        height: hp(1.25), 
        width: wp(2.5), 
        position: 'absolute', 
        right: 0, 
        top: 0, 
        zIndex: 1
    },
    crossIcon:{
        height:'100%',
        width:'100%'
    }
})

export default styles