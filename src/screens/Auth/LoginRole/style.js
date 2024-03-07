import { StyleSheet } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
        // paddingTop:hp(2)
    },
    imageView: {
        flex:0.7, 
        // justifyContent:'center', 
        // alignItems: 'center',
    },
    inputTextView:{
        flex:0.3,
        // justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FFFFFF',
        paddingVertical:hp(2),
        borderTopRightRadius:wp(5),
        borderTopLeftRadius:wp(5),
        bottom:hp(2)
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
})

export default styles