import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:wp(4)
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: wp(2.5),
        paddingHorizontal:wp(5)

    },
    fullWidthImage: {
        height: hp(22),
        width:'100%',
        marginVertical:wp(1),
        borderRadius:wp(1),
        overflow:'hidden'
    },
    halfWidthImage: {
        width: '49.5%',
        borderRadius:wp(1),
        overflow:'hidden',
        height:hp(15)
        // aspectRatio: 1,
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode: 'stretch',
    },
    modal:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'center'
    },
    modalContainer:{
        height:hp(40),
        width:'90%',
        marginHorizontal:wp(5)
    },
    modalImage:{
        height:'100%',
        width:'100%',
        resizeMode:'stretch',
        borderRadius:wp(1)
    }
})

export default styles