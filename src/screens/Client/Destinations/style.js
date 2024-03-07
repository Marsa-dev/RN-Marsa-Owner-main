import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import fontsSize from "../../../assets/fontsSize/fontsSizes"
import colors from "../../../assets/colors/colors"
import fonts from "../../../assets/fonts/fonts"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: wp(4)

    },
    innerContainer:{
        paddingHorizontal: wp(3)
    },
    backgroundImage:{
        height: hp(21),
        width: '100%',
        resizeMode: 'stretch',
        borderRadius:wp(1.1),
        overflow:'hidden',
        marginBottom:hp(1)
    },
    itemContainer:{
        flex:1,
        paddingHorizontal:wp(2)
    },
    con1:{
        flex:0.3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
        // backgroundColor:'orange',
    },
    con2:{
        flex:0.3
    },
    con3:{
        flex:0.4,
        justifyContent:'center'
    },
    location:{
        flexDirection:"row",
    },
    locationIcon:{
        height:wp(3),
        width:wp(3.2),
        resizeMode:'contain',
        marginRight:wp(1)
    },
    locationText:{
        fontSize:fontsSize.px_12,
        color:colors.white,
        fontWeight:'500',
        fontFamily:fonts.regular
    },
    button:{
        width:wp(20)
    },
    descriptionContainer:{
        width:wp(62),
        alignSelf:"center",
        paddingHorizontal:wp(2),
        borderRadius:wp(1.1)
    },
    description:{
        fontSize: fontsSize.px_10,
        color: colors.white,
        fontWeight: '400',
        lineHeight:wp(3.5),
        // elevation:1,
        fontFamily: fonts.regular
    }
})

export default styles