import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

///////////////////////////////////////////////////////////

import Header from '../../../../component/Header'
import icons from '../../../../assets/icons/icons'
import Input from '../../../../component/Input'
import NonEditableInput from '../../../../component/NonEditableInput'
import Button from '../../../../component/Button'
import { bookingData } from '../../../../api/Httpservice'
import { showDanger, showSuccess } from '../../../../../utils/FlashMessage'
import { BOOKING_CONFIRMED } from '../../../../constants/Navigators'

const ContactDetail = ({route}) => {
    const bookingId= route?.params?.bookingId
    const navigation = useNavigation()
    const user = useSelector(state=> state.data.user)
    const [name, setName]= useState('')
    const [number, setNumber]= useState('')
    const handleSubmit=async ()=>{
      const data = {
        "id": bookingId, 
        "name": name, 
        "email": user?.email, 
        "phoneNo": number
      }
      const res =await bookingData(data, 'booking/contant')
      console.log('res', res)
      if(res?.success){
        showSuccess(res?.message)
        navigation.navigate(BOOKING_CONFIRMED)
      }
      else{
        showDanger(res?.message)
      }
    }
  return (
    <View style={styles.container}>
      <Header
        title={'Your Contact Details'} 
        leftIcon={icons.backArrow}
        leftIconPress={()=> navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <View>
            <Input 
                label={'Name'}
                placeHolder={'Name'}
                marginTop={wp(2.2)}
                value={name}
                onChangeText={setName}
            />
            <NonEditableInput 
                label={'Email'}
                value={user?.email}
                marginTop={wp(2.2)}
            />
            <Input 
                label={'Phone no.'}
                placeHolder={'Enter phone no.'}
                marginTop={wp(2.2)}
                value={number}
                onChangeText={setNumber}
            />
        </View>
        <Button 
            label={'Submit Booking request'}
            onPress={handleSubmit}
        />
      </View>

    </View>
  )
}

export default ContactDetail

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    innerContainer:{
        flex:1,
        justifyContent:'space-between',
        paddingVertical:hp(2)
    }
})