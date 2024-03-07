import { View, Text, Image, Alert, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import images from '../../../assets/images/images';

import DashboardHeader from '../../../component/DashboardHeader';
import colors from '../../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import icons from '../../../assets/icons/icons';
import Divider from '../../../component/Divider';
import Button from '../../../component/Button';
import Header from '../../../component/Header';
import fontsSize from '../../../assets/fontsSize/fontsSizes';
import fonts from '../../../assets/fonts/fonts';
import { HOME } from '../../../constants/Navigators';
import moment from 'moment';
const BookingComplete = ({route}) => {
  const data = route?.params?.data
  const navigation = useNavigation();
  const title ='2022 Tahoe T18 Boat'
  const guestNumbers ='6 members'
  const duration ='6 hours'
  location='Bayada'
  const price ='$245'
  const image =images.signUpImage
  const status= true
  const from= '12:30pm'
  const to = '06:30pm'
  const activities = true
  const activity1 = 'Barbecue and picnicking on the water'
  const activity2 = 'Diving and snorkeling'
  useEffect(()=>{
    console.log('first', JSON.stringify(data?.activites))

  },[])
  return (
    <View style={styles.container}>
      <Header 
        title={'Booking Completed'}
        // leftIcon={icons.backArrow}
        // leftIconPress={()=> navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <Text style={{
          color:colors.primaryColor,
          fontSize:fontsSize.px_18,
          fontFamily:fonts.semiBold,
          alignSelf:'center',
          textAlign:'center',
          width:wp(60),
          marginBottom:hp(2)
        }}>You have successfully paid your trip!</Text>
        <View style={styles.swiperContainer}>
          <View style={styles.con1}>
            <Image source={image} resizeMode='cover' style={styles.image} />
          </View>
          <View style={styles.con2}>
            <Text numberOfLines={1} style={styles.title}>{data?.boatId?.craftName}</Text>
            <View style={styles.locationIcon}>
              <Image
                source={icons.location}
                style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain',marginRight:wp(3) }}
              />
              <Text numberOfLines={1} style={styles.location}>{data?.destination?.title}</Text>
            </View>
              <Text numberOfLines={1} style={styles.normal}>Guest number: {data?.guestNo}</Text>
              <Text numberOfLines={1} style={styles.normal}>Duration: {data?.hours} hours</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:hp(1)}}>
          <View style={{flex:0.49}}>
            <Text style={styles.normal}>From</Text>
            <View style={styles.timeCon}>
              <Text style={styles.time}>{moment(data?.bookingStartTime).format('HH:mm A')}</Text>
              <Image
                source={icons.clock}
                style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain', marginRight: wp(3) }}
              />
            </View>
          </View>
          <View style={{flex:0.49}}>
            <Text style={styles.normal}>To</Text>
            <View style={styles.timeCon}>
              <Text style={styles.time}>{moment(data?.bookingEndTime).format('HH:mm A')}</Text>
              <Image
                source={icons.clock}
                style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain'}}
              />
            </View>
          </View>
        </View>
        <Text style={[styles.normal, {fontWeight:'500',marginVertical:wp(2.5)}]}>Activities</Text>
        {
          data?.activites?.length > 0 ?
           data?.activites.map((item, index)=>{
            return(
              <View style={styles.locationIcon}>
                <Image
                  source={icons.checkBox}
                  style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain', marginRight: wp(3) }}
                />
                <Text numberOfLines={1} style={styles.location}>{item?.title}</Text>
              </View>
  
            )
          })
          :
          <Text style={styles.normal}>There is no activites</Text>
        }
        <View style={{
          width:wp(90),
          marginTop:hp(2),
          borderBottomWidth:1.5,
          borderStyle:'dashed'
        }}></View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:wp(3.5)}}>
          <Text style={styles.price}>Total Payment</Text>
          <Text style={styles.price}>{data?.totalAmount}</Text>
        </View>
      </View>
      <Button 
        label={'Done'}  
        onPress={() => {navigation.navigate(HOME)}}
      />
    </View>
  )
}

export default BookingComplete