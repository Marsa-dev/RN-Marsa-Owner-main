import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../assets/images/images';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/colors/colors';
import icons from '../assets/icons/icons';
import { useSelector } from 'react-redux';
import Config from '../../utils/config';

const DashboardHeader = (
  {
    title,
    subTitle, 
    image,
    icon,
    marginHorizontal,
    onPress
  }
) => {
  const role = useSelector(state=> state.data.role)
  const user = useSelector(state=> state.data.user)
  return (
    <View style={[styles.container, { marginHorizontal: marginHorizontal ? marginHorizontal:0 }]}>
      <TouchableOpacity style={styles.leftContainer} onPress={onPress}>
        {
          user?.profilePic ?
            <Image 
              source={{ uri: `${Config.BASE_URL}${user?.profilePic}`}}
              style={styles.image}
            />
          :
          <View style={styles.iconContainer}>
            <Image
              source={image}
              style={styles.icon}
              resizeMode='contain'
            />
          </View>
        }
        <View style={styles.textView}> 
          <Text style={styles.heading}>{title}</Text>
          {
            role != 'owner' &&
            <Text style={styles.subHeading}>{subTitle}</Text>

          }
        </View>
        {/* <Text>Hello</Text> */}
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        {
          icon ? 
            <View style={styles.rightIconCover}>
              <Image 
                source={icons.notifications}
                style={styles.rightIcon}
              />
            </View>
           :
           null 
        }
      </View>
    </View>
  )
}

export default DashboardHeader

const styles = StyleSheet.create({
  container:{
    height:hp(6.5),
    flexDirection:'row',
    marginBottom:wp(2)
  },
  leftContainer:{
    flex:0.8,
    flexDirection:'row',
    alignItems:'center'
  },
  rightContainer:{
    flex:0.2,
    alignItems:'flex-end',
    justifyContent:'center'
  },
  image:{
    height:wp(10),
    width:wp(10),
    borderRadius:wp(5),
    resizeMode:'cover',
    borderWidth:1.5,
    borderColor:colors.primaryColor
  },
  heading:{
    fontSize:fontsSize.px_14,
    fontFamily:fonts.regular,
    fontWeight:'500',
    color:colors.primaryColor
  },
  subHeading:{
    fontSize: fontsSize.px_10,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginTop:wp(1),
    color: colors.primaryColor
  },
  textView:{
    marginLeft:wp(4),
    justifyContent:'space-between'
  },
  rightIconCover:{
    height:wp(6.5),
    width:wp(6.5),
    borderRadius:wp(3.25),
    backgroundColor:colors.grey,
    alignItems:'center',
    justifyContent:'center'
  },
  rightIcon:{
    height:wp(4),
    width:wp(4),
    resizeMode:'contain'
  },
  iconContainer:{
    height: wp(10),
    width: wp(10),
    borderRadius: wp(5),
    borderWidth: 1.5,
    borderColor: colors.primaryColor,
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden'
  },
  icon:{
    height:'100%',
    width:'100%',
    resizeMode:'contain'
  }
})