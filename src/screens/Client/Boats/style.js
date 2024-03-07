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
        paddingTop:wp(4)
        // justifyContent: 'center',
        // alignItems: 'center'
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
    emptyText:{
        color:colors.primaryColor,
        fontSize:fontsSize.px_16,
        fontFamily:fonts.regular,
        fontWeight:'600',
        alignSelf:'center'
    }
})

export default styles