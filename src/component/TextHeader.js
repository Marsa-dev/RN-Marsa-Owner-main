import { View, Text } from 'react-native'
import React from 'react'
import fontsSize from '../assets/fontsSize/fontsSizes'
import colors from '../assets/colors/colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
const TextHeader = ({
    title
}) => {
  return (
    <View style={{width:'100%', alignItems:'center',paddingVertical:hp(1)}}>
      <Text style={{fontSize:fontsSize.px_14, color:colors.primaryColor}}>{title}</Text>
    </View>
  )
}

export default TextHeader