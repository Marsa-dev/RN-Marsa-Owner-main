import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp , 
widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../assets/colors/colors'
const HorizontalLine = ({
    leftCircleColor,
    leftLineColor,
    label
}) => {
  return (
    <View style={{width: wp(100), flexDirection:'row', alignItems:'center'}}>
      
      <View style={[styles.leftHalfCircle, {backgroundColor:leftCircleColor? leftCircleColor: colors.primaryColor}]}>
        </View>

      <View style={{height:2, flex:0.48, backgroundColor:leftLineColor? leftLineColor: colors.primaryColor}}>
      </View>

      <View style={{backgroundColor:colors.primaryColor, width:wp(5), height:wp(5), borderRadius:hp(2), flex:0.05, justifyContent:'center', alignItems:'center', marginHorizontal:wp(1)}}>
        <Text style={{color:'white'}}> {label} </Text>
      </View>

      <View style={{height:2, flex:0.48, backgroundColor: label === "4" ? colors.white: 'rgba(16, 31, 87, 0.4)'}}>
         
          <View style={{backgroundColor: label === "4" ? colors.white: colors.primaryColor, width:'30%',height:2}}></View>
        
      </View>

      <View style={[styles.rightHalfCircle, {backgroundColor: label === "4" ? colors.white: 'rgba(16, 31, 87, 0.4)'}]}>

        </View>


    </View>
  )
}

const styles = StyleSheet.create({
    leftHalfCircle: {
        flex:0.02,
        marginRight:wp(1),
        width: wp(3), // Adjust the width to your desired size
        height: wp(4), // Adjust the height to your desired size
        backgroundColor: colors.primaryColor, // Background color of the half-circle
        borderTopRightRadius: wp(2), // Half of the width/height to make a circle
        borderBottomRightRadius: wp(2), // Half of the width/height to make a circle
    },
    
    rightHalfCircle: {
        flex:0.02,
        marginLeft:wp(1),
        width: wp(3), // Adjust the width to your desired size
        height: wp(4), // Adjust the height to your desired size
        backgroundColor: 'rgba(16, 31, 87, 0.4)', // Background color of the half-circle
        borderTopLeftRadius: wp(2), // Half of the width/height to make a circle
        borderBottomLeftRadius: wp(2), // Half of the width/height to make a circle
    },
  });

export default HorizontalLine