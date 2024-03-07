import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import fontsSize from "../../../assets/fontsSize/fontsSizes"
import fonts from "../../../assets/fonts/fonts"
import colors from "../../../assets/colors/colors"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    innerContainer:{
        borderWidth:1,
        borderColor:colors.placeholder,   
        padding:wp(2),
        margin:wp(3)
    },  
    swiperContainer:{ 
        borderRadius: wp(1.1), 
        overflow: 'hidden', 
        flexDirection:'row'
    },
    con1: {

    },
    con2: {
        marginLeft: wp(2),
    },
    title: {
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular,
        width: wp(48),
        marginBottom: 2
    },
    normal: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        lineHeight:hp(2.5)
    },
    location: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
    },
    locationIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(2.5)
    },
    time: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        // marginLeft: wp(3)
    },
    timeCon: { 
        width: '100%', 
        borderRadius: wp(1.1), 
        borderWidth: 1, 
        padding:wp(3),
        borderColor: colors.black,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:wp(1.1)
    },
    price: {
        fontSize: fontsSize.px_20,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular
    },
    image: {
        // width: '100%',
        height: hp(10),
        aspectRatio: 1,
        borderRadius: wp(1.1)
    },

})

export default styles