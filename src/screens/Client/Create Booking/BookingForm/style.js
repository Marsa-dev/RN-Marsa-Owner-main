import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp,         
  } from 'react-native-responsive-screen'
import fontsSize from "../../../../assets/fontsSize/fontsSizes"
import colors from "../../../../assets/colors/colors"
import fonts from "../../../../assets/fonts/fonts"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:wp(2),
    },
    innerContainer:{
        flex:1,
        paddingHorizontal:wp(4),        
        paddingTop:wp(2)        
    },
    mainLabel:{
        fontSize:fontsSize.px_14,
        color:colors.primaryColor,
        fontWeight:'400',
        fontFamily:fonts.regular,
        marginVertical:wp(2)
    },
    label:{
        fontSize:fontsSize.px_12,
        color:colors.primaryColor,
        fontWeight:'400',
        fontFamily:fonts.regular
    },
    input:{
        height : hp(6),
        paddingHorizontal:wp(2),
        borderWidth:1,
        borderColor:colors.primaryColor,
        borderRadius:wp(1.1),
        justifyContent:'center'
    },
    timeCon: {
        width: '100%',
        borderRadius: wp(1.1),
        borderWidth: 1,
        padding: wp(3),
        borderColor: colors.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: wp(1.1)
    },
    time: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        // marginLeft: wp(3)
    },
    timeDetailContainer:{
        height:hp(10),
        borderWidth:1,
        borderColor:colors.placeholder,
        borderRadius:wp(1.1),
        marginVertical:wp(2.1),
        padding:wp(3),
        justifyContent:'space-between'
    },
    timeDetailField:{
        flexDirection:'row',
        justifyContent:'space-between'
    }, 
    guests:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:wp(1.1)
    },
    guestOperator:{
        flexDirection:'row',
        width:wp(20),
        justifyContent:'space-between',
        alignItems:'center',
    },
    operator:{
        backgroundColor:colors.grey,
        // padding:wp(1),
        height:wp(5),
        width:wp(5),
        borderRadius:wp(2.5),
        alignItems:'center',
        justifyContent:'center'
    },
    multilineInput:{
        height:hp(12),
        borderWidth:1,
        borderColor:colors.placeholder,
        borderRadius:wp(1.1),
        marginVertical:wp(1.1),
        paddingHorizontal:wp(2)
    },
    footer:{
        backgroundColor: 'rgba(16, 31, 87, 0.13)',
        // height: hp(12),

        borderWidth: 1,
        borderColor: 'rgba(16, 31, 87, 0.13)',
        borderRadius: wp(1.1),
        marginTop: wp(1.1),
        paddingHorizontal: wp(2)
    },
    footerItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerSubText:{
        marginVertical:wp(1.1)
    },
    footerActivityText:{
        marginVertical: wp(1.1),
        color:colors.secondryColor,
        fontSize:fontsSize.px_10

    }
})  

export default styles