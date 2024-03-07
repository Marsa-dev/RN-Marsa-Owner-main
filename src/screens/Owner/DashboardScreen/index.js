import { View, Text, Image, Alert, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import images from '../../../assets/images/images';

import DashboardHeader from '../../../component/DashboardHeader';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import fontsSize from '../../../assets/fontsSize/fontsSizes';
import {OWNER_BOOKING_DETAILS, PROFILE_INFO_SCREEN } from '../../../constants/Navigators';
import Calander from '../../../component/Calander';
import LeftRightText from '../../../component/LeftRightText';
import Button from '../../../component/Button';
import BookingBoatDetails from '../../../component/BookingBoatDetails';
import { getListDataAfterLogin } from '../../../api/Httpservice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Owner_Dashboard = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const isFocused = useIsFocused()
  const user = useSelector(state=> state.data.user)
  const [selectedButton, setSelectedButton] = useState(0)
  let buttons = [
    {
      id:0,
      title:t('pending')
    },
    {
      id:1,
      title:t('accepted')
    },
    {
      id:2,
      title: t('past')
    }
  ]
  const [bookingData, setBookingData] = useState([])
  const [dateData, setDateData] = useState([])
  const pendingBookings = bookingData?.filter((item)=> item?.status === 'pending')
  const pastBookings = bookingData?.filter((item) => {
    // Parse item.bookingEndTime into a JavaScript Date object
    const bookingEndTime = new Date(item?.bookingEndTime);

    // Get the current time as a JavaScript Date object
    const currentTime = new Date();

    // Compare the Date objects
    return bookingEndTime < currentTime;
  });
  const acceptBookings = bookingData?.filter((item) => {
    // Parse item.bookingEndTime into a JavaScript Date object
    const bookingEndTime = new Date(item.bookingEndTime);

    // Get the current time as a JavaScript Date object
    const currentTime = new Date();

    // Compare the Date objects
    return (item.status === 'accepted' && bookingEndTime > currentTime) || (item?.status === 'paid' && bookingEndTime > currentTime);
  });
  const renderData = selectedButton === 0 ? pendingBookings : selectedButton === 1 ? acceptBookings : pastBookings;
  useEffect(()=>{
    if(isFocused){
      getBookings()
      getDate()
    }
  },[isFocused])
  const getBookings =async ()=>{
    try{
      const res =await getListDataAfterLogin('booking/owner')
      // console.log('res', res?.data)
      setBookingData(res?.data)
    }
    catch(error){
      console.log('error', error)
    }
  }
  const getDate = async ()=>{
    const res=await getListDataAfterLogin('booking/date')
    console.log('res', res)
    setDateData(res?.data)
  }
  return (
    <View style={styles.container}>
      <DashboardHeader 
        title={user?.fullName}
        // subTitle = "Discover-take your travel to next level"
        image= {images.user}
        // icon
        onPress={()=> navigation.navigate(PROFILE_INFO_SCREEN)}
        marginHorizontal={wp(4)}
      />
      <ScrollView style={{ flex:1 }} showsVerticalScrollIndicator={false}>
      <View>
        <LeftRightText
          leftText={t('myBookings')}
          leftfontSize={fontsSize.px_20}
          leftfontFamily={fonts.medium}
          marginHorizontal={wp(4)}
        />
      {
        dateData &&
          <Calander 
            dateData={dateData}
          />
      }

        <FlatList
          horizontal
          data={buttons}
          contentContainerStyle={{justifyContent:'space-between',flex:1, paddingHorizontal:wp(5)}}
          renderItem={(item, index) => {
            return(
              <Button
                width={wp(29)}
                borderRadius={wp(10)}
                label={item.item.title}
                borderWidth={2}
                borderColor={colors.primaryColor}
                textColor={selectedButton === item.item.id ? colors.white: colors.primaryColor}
                backgroundColor={selectedButton === item.item.id ? colors.primaryColor: colors.white}
                textSize={fontsSize.px_12}
                height={hp(4)}
                onPress={() => {setSelectedButton(item.item.id)}}
              />
            )
          }}
        />
      {
        renderData?.length > 0 ?
          renderData?.map((item, index) => {
          return(
            <BookingBoatDetails
              key={index.toString()}
              title={item?.boatId?.craftName}
              guestNumbers={item?.guestNo}
              duration={item?.hours}
              date={item?.bookingEndTime}
              location={item?.destination?.title}
              image={item?.boatId?.images[0]}
              buttonText={item?.status}
              amount={item.totalAmount}
              onPress={() => {navigation.navigate(OWNER_BOOKING_DETAILS,{
                data:item
              })}}
            />
          )
          })
          :
          <LeftRightText
          leftText={t('noBookings')}
          leftfontSize={fontsSize.px_14}
          leftfontFamily={fonts.medium}
          marginHorizontal={wp(4)}
          marginTop={hp(2)}
        />
      }

      </View>
      </ScrollView>
    </View>
  )
}

export default Owner_Dashboard