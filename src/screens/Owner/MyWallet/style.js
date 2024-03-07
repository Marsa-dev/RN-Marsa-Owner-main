import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp,         
  } from 'react-native-responsive-screen'
import colors from "../../../assets/colors/colors"
import fonts from "../../../assets/fonts/fonts"
import fontsSize from "../../../assets/fontsSize/fontsSizes"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop:wp(4),
        alignItems: 'center'
    },
    profileInfo: {
        flex:0.3,
        width: wp(90),
        marginTop:hp(1)
    },
    optionsView: {
        flex:0.55,
    },
    buttonView: {
        flex:0.15,
        width: wp(90),
    },
    boxMainView: {
        height:hp(15), 
        // paddingHorizontal:wp(10), 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center',
    },
    boxView: {
        width:wp(92),
        // flex:0.48,
        borderRadius:wp(2), 
        borderWidth:2, 
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    textTitle: {
        color:colors.primaryColor
    },
    textNum : {
        color:colors.primaryColor, 
        fontFamily:fonts.medium, 
        fontSize:fontsSize.px_24, 
        marginTop:hp(1)
    },
})

export default styles