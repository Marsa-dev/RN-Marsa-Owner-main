import { View, Text } from 'react-native'
import React, {useState} from 'react'
import Map from '../../../component/Map'
import { bookingData } from '../../../api/Httpservice'
import CustomLoader from '../../../component/CustomLoader'
import { showDanger, showSuccess } from '../../../../utils/FlashMessage'
import { useNavigation } from '@react-navigation/native'
import { OWNER_HOME } from '../../../constants/Navigators'

const SendPickUpLocation = ({route}) => {
    const navigation = useNavigation()
    let status= route?.params?.status
    let id = route?.params?.id
    const[loading,  setLoading] = useState(false)

    const getLtLongval = async (data) => {
    console.log(data);

    setLoading(true)
      let asset = {
        "id" : id, 
        "status" : status,
        "latitude":data.currentLatitude,
        "longitude":data.currentLongitude
      }
      const res =await bookingData(asset, "booking/accept/reject")
      if(res?.success === true)
      {
        setLoading(false)
        showSuccess(res?.message)
        navigation.navigate(OWNER_HOME)
      }
      else{
        setLoading(false)
        showDanger(res?.message)
      }
    }

  return (
    <View style={{flex:1}}>
      <Map getLatLong={getLtLongval} />
      <CustomLoader isVisible={loading} />
    </View>
  )
}

export default SendPickUpLocation