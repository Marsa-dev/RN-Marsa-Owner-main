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
    },
    swiperContainer:{ 
        height: hp(25), 
    },
    sliderHeartButton:{
        position: 'absolute',
        right: wp(2.5),
        bottom: wp(2.5),
        backgroundColor: colors.white,
        borderRadius: wp(1.1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderBackButton:{
        left: wp(2.5),
        top: wp(2.5),
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
    }, 
    title:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_14,
        fontWeight:'500',
        fontFamily:fonts.regular,
        marginTop: wp(1.1),
        marginBottom: wp(1.1)
    },
    detail:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_10,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginBottom: wp(1.1)

    },
    price:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_10,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginBottom: wp(1.1)

    },
    label:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_12,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginVertical: wp(1.5)

    },
    description:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_10,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginBottom: wp(1.1)

    },
    paymentCard:{
        borderWidth:1,
        borderRadius:wp(1.1),
        borderColor:colors.placeholder,
        padding:wp(2.5),
        marginVertical:wp(2.5)
    },
    paymentCardNormalText:{
        color: colors.primaryColor,
        fontSize: fontsSize.px_10,
        fontWeight: '500',
        fontFamily: fonts.regular,
        marginBottom: wp(1.1),
    },
    paymentCardBigText:{
        color: colors.primaryColor,
        fontSize: fontsSize.px_20,
        fontWeight: '400',
        fontFamily: fonts.regular,
        marginBottom: wp(1.1)
    },
    leftContainer: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        flex: 0.2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    image: {
        height: wp(10),
        width: wp(10),
        borderRadius: wp(5),
        resizeMode: 'cover',
        borderWidth:1,
        borderColor:colors.primaryColor
    },
    icon: {
        height: wp(10),
        width: wp(10),
        borderRadius: wp(5),
        resizeMode: 'contain',
        borderWidth: 1,
        backgroundColor:colors.grey,
        borderColor: colors.primaryColor
    },
    heading: {
        fontSize: fontsSize.px_14,
        fontFamily: fonts.regular,
        fontWeight: '500',
        color: colors.primaryColor
    },
    subHeading: {
        fontSize: fontsSize.px_10,
        fontFamily: fonts.regular,
        fontWeight: '400',
        marginTop: wp(1),
        color: colors.primaryColor
    },
    textView: {
        marginLeft: wp(4),
        justifyContent: 'space-between'
    },

})

export default styles