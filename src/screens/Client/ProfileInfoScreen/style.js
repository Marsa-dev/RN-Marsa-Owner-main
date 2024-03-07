import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp,         
  } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    profileInfo: {
        flex:0.3,
        width: wp(90),
    },
    optionsView: {
        flex:0.7,
    },
})

export default styles