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
        paddingHorizontal:wp(4),
        paddingTop:wp(4)
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    swiperContainer:{ 
        height: hp(21), 
        borderRadius: wp(1.1), 
        overflow: 'hidden' 
    },
    sliderTitle:{
        fontSize: fontsSize.px_14,
        fontWeight: '500',
        color: '#FFFFFF',
        paddingVertical: wp(1),
        marginHorizontal: wp(4),
        fontFamily: fonts.regular
    },
    sliderDescription:{
        fontSize: fontsSize.px_10,
        fontWeight: '400',
        color: '#FFFFFF',
        paddingVertical: wp(1),
        marginHorizontal: wp(4),
        fontFamily: fonts.regular,
    },
    sliderHeartButton:{
        position: 'absolute',
        right: wp(2.5),
        top: wp(2.5),
        backgroundColor: colors.white,
        borderRadius: wp(1.1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderHeartImage:{
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    card: {
        width: wp(45),
        height: hp(30),
        // marginLeft: '3%',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: wp(2),
    },
    cardContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between' 
    },
    cardHeading:{
        paddingVertical:wp(2),
        justifyContent:'space-between',
        flexDirection:'row'
    },
    headingTitle:{
        fontSize:fontsSize.px_14,
        color:colors.primaryColor,
        fontWeight:'500',
        fontFamily:fonts.regular
    },
    headingLink:{
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily:fonts.regular
    }

})

export default styles