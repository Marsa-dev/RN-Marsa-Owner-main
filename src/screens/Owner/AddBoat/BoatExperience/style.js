import { StyleSheet } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        width:wp(100), 
        paddingHorizontal:wp(4),

    },
    bottomButtonContainer: {
        height:hp(10),
        position:'absolute',
        bottom: 0,
        width:wp(100),
        alignItems:'center',
    }
})

export default styles