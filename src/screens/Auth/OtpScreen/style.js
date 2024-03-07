import { StyleSheet } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import fontsSize from "../../../assets/fontsSize/fontsSizes"
import colors from "../../../assets/colors/colors"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:hp(2)
    },
    imageView: {
        flex:0.3, 
        justifyContent:'center', 
        alignItems: 'center',
    },
    inputTextView:{
        flex:0.7,
        // justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FFFFFF',
        paddingVertical:hp(2),
        borderTopRightRadius:wp(5),
        borderTopLeftRadius:wp(5),
        bottom:hp(2)
    },


    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: wp(19),
        height: wp(12),
        borderWidth: 1,
        borderRadius:wp(2),
        borderColor:colors.primaryColor,
        color:colors.primaryColor,
        fontWeight:'600',
        fontSize:fontsSize.px_16,
        paddingHorizontal:wp(5)
        // borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: colors.primaryColor,
      },
})

export default styles