import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../assets/icons/icons';
import colors from '../assets/colors/colors';
import images from '../assets/images/images';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';
import Config from '../../utils/config';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
const BoatCard = ({
  image,
  title,
  price,
  iconPress,
  favourite
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.con1}>
        <FastImage source={{uri: Config.BASE_URL + image}} resizeMode={FastImage.resizeMode.cover} style={styles.image} />
      </View>
      <View style={styles.con2}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        {/* <Text style={styles.time}>{time}</Text> */}
        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
          <Text style={styles.price}>{`${price}SAR ${t('perHour')}`}</Text>
        </View>
      </View>
      {
        favourite ?
          <View style={styles.sliderHeartButton} onPress={iconPress}>
            <Image
              source={icons.redHeart}
              style={styles.sliderHeartImage}
            />
          </View>
        :
          <View style={styles.sliderHeartButton} onPress={iconPress}>
            <Image
              source={icons.heart}
              style={styles.sliderHeartImage}
            />
          </View>
      }
    </View>
  )
}

export default BoatCard

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  con1:{
    flex:0.7,
  },
  con2:{
    flex:0.3,
    // justifyContent:'space-between',
    paddingTop:hp(0.5)
  },
  title:{
    fontSize:fontsSize.px_13,
    color:colors.primaryColor,
    fontWeight:'500',
    fontFamily:fonts.regular
  },
  time:{
    fontSize:wp(3),
    color:colors.lightText,
    // fontWeight:'500',
  },
  price:{
    fontSize:fontsSize.px_10,
    color:colors.primaryColor,
    fontWeight:'500',
    fontFamily:fonts.regular  
  },
  buttonText:{
    fontSize:wp(3),
    color:colors.white
  },
  image:{
    height: '100%',
    width: '100%', 
    borderRadius: 10
  },
  sliderHeartButton: {
    position: 'absolute',
    right: wp(2.5),
    top: wp(2.5),
    backgroundColor: colors.white,
    borderRadius: wp(1.1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderHeartImage: {
    height: wp(6),
    width: wp(6),
    resizeMode: 'contain'
  },
})