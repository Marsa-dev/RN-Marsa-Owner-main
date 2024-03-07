import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp,         
  } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // paddingTop:wp(4),
        alignItems: 'center',
    },
    profileInfo: {
        flex:0.3,
        width: wp(90),
    },
    optionsView: {
        flex:0.55,
    },
    buttonView: {
        flex:0.15,
        width: wp(90),
    },
    totalPriceView: {
        position: 'absolute',
        bottom:hp(2),
        height:hp(6),
        width:wp(90),
        flexDirection:'row'
    }
})

export default styles