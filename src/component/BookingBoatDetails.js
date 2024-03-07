import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import images from '../assets/images/images'
import colors from '../assets/colors/colors'
import fontsSize from '../assets/fontsSize/fontsSizes'
import fonts from '../assets/fonts/fonts'
import Header from './Header'
import icons from '../assets/icons/icons'
import Button from './Button'
import moment from 'moment'
import Config from '../../utils/config'
import { useTranslation } from 'react-i18next'

const BookingBoatDetails = ({
    title, 
    guestNumbers,
    duration,
    location,
    date,
    image,
    buttonText,
    buttonPress,
    onPress,
    amount
}) => {
    const navigation = useNavigation();
    const {t} = useTranslation();    
    
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.swiperContainer}>
            <View style={styles.con1}>
              <Image source={{uri : Config?.BASE_URL + image}} resizeMode='cover' style={styles.image} />
            </View>
            <View style={styles.con2}>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              <View style={styles.locationIcon}>
                <Image
                  source={icons.location}
                  style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain',marginRight:wp(3) }}
                />
                <Text numberOfLines={1} style={styles.location}>{location}</Text>
              </View>
                <Text numberOfLines={1} style={styles.normal}>{t('guestNumber')}{guestNumbers}</Text>
                <Text numberOfLines={1} style={styles.normal}>{t('duration')}: {moment(date).format('DD-MM-YY')} {duration}/{t('hours')}</Text>
            </View>
          </View>
        <View style={{flexDirection:'row', marginTop:hp(1), alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{fontSize:fontsSize.px_16, color:colors.primaryColor,fontFamily:fonts.medium}}>{t('payout')} {amount} {t('sar')}</Text>
            <Button 
                label={buttonText==='accepted' ? t('accepted'): buttonText==='completed' ? t("completed") : t('pending')} 
                width={wp(30)} 
                height={hp(4)}
                backgroundColor={buttonText==='accepted' ? colors.green : buttonText ==='paid' && colors.secondryColor }
                textSize={fontsSize.px_12}
                onPress={buttonPress}
                disabled
            />
        </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:wp(2)
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    innerContainer:{
        borderWidth:1,
        borderColor:colors.placeholder,   
        padding:wp(2),
        margin:wp(3)
    },  
    swiperContainer:{ 
        borderRadius: wp(1.1), 
        overflow: 'hidden', 
        flexDirection:'row'
    },
    con1: {
  
    },
    con2: {
        marginLeft: wp(2),
    },
    title: {
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular,
        width: wp(48),
        // marginBottom: 2
    },
    normal: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        lineHeight:hp(2.5)
    },
    location: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
    },
    locationIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(2.5)
    },
    time: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        // marginLeft: wp(3)
    },
    timeCon: { 
        width: '100%', 
        borderRadius: wp(1.1), 
        borderWidth: 1, 
        padding:wp(3),
        borderColor: colors.black,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:wp(1.1)
    },
    price: {
        fontSize: fontsSize.px_20,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular
    },
    image: {
        // width: '100%',
        height: hp(10),
        aspectRatio: 1,
        borderRadius: wp(1.1)
    },
  
  })
export default BookingBoatDetails