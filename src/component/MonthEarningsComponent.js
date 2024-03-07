import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp,
widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../assets/colors/colors'
import fontsSize from '../assets/fontsSize/fontsSizes'
import fonts from '../assets/fonts/fonts'
import { useTranslation } from 'react-i18next'

const MonthEarningsComponent = ({
    date,
    totalBookings,
    price
}) => {
    const {t} = useTranslation()
  return (
    <View style={styles.container}>
        <View style={{
            flex:0.5, 
            justifyContent:'space-between',
            paddingVertical:hp(1)
            }}>
            <Text style={{
                color:colors.primaryColor,
                fontSize:fontsSize.px_16
                }}>{date}</Text>
            <Text style={{
                color:colors.primaryColor,
                fontSize:fontsSize.px_16
                }}>{totalBookings}</Text>
        </View>

        <View style={{ flex:0.5, alignItems:'flex-end', justifyContent:'center'}}>
            <Text style={{
                color:colors.primaryColor,
                fontSize:fontsSize.px_16,
                fontFamily:fonts.medium
                }}>{price} {t('sar')}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        height: hp(10),
        justifyContent:'space-between',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:wp(1),
        marginHorizontal:wp(4),
        borderWidth:2,
        marginBottom:hp(1),
        paddingVertical:hp(1),
        paddingHorizontal:wp(2)
    }
})
export default MonthEarningsComponent