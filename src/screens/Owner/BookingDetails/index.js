import { View, Text, Image } from 'react-native'
import React, {useState} from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import icons from '../../../assets/icons/icons';
import Button from '../../../component/Button';
import Header from '../../../component/Header';
import Config from '../../../../utils/config';
import moment from 'moment';
import { bookingData } from '../../../api/Httpservice';
import { showDanger, showSuccess } from '../../../../utils/FlashMessage';
import CustomLoader from '../../../component/CustomLoader';
import { SEND_PICKUP_LOCATION } from '../../../constants/Navigators';
import { useTranslation } from 'react-i18next';

const Owner_BookingDetails = ({route}) => {
    const data = route?.params?.data
    const navigation = useNavigation();
    const{t} = useTranslation();
    const[loading,  setLoading] = useState(false)
    const handleSubmit = async(status)=>{
      if(status === "rejected"){
        setLoading(true)
        let asset = {
          "id" : data?._id, 
          "status" : status
        }
        const res =await bookingData(asset, "booking/accept/reject")
        if(res?.success === true)
        {
          setLoading(false)
          showSuccess(res?.message)
          navigation.goBack()
        }
        else{
          setLoading(false)
          showDanger(res?.message)
        }
      }
      else {
        navigation.navigate(SEND_PICKUP_LOCATION, 
          {
            "id" : data?._id,
            "status" : status
          })
      }
      
    }
    return (
      <View style={styles.container}>
        <Header 
          title={t('bookingDetails')}
          leftIcon={icons.backArrow}
          leftIconPress={()=> navigation.goBack()}
        />

        <View style={styles.innerContainer}>
         
          <View style={styles.swiperContainer}>
            <View style={styles.con1}>
              <Image source={{uri: Config?.BASE_URL + data?.boatId?.images[0]}} resizeMode='cover' style={styles.image} />
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
                <Text numberOfLines={1} style={styles.normal}>{t('guestNo')}: {data?.guestNo}</Text>
                <Text numberOfLines={1} style={styles.normal}>{t('duration')}: {data?.hours} {t('hours')}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:hp(1)}}>
            <View style={{flex:0.49}}>
              <Text style={styles.normal}>{t('from')}</Text>
              <View style={styles.timeCon}>
                <Text style={styles.time}>{moment(data?.bookingStartTime).format('HH:mm A')}</Text>
                <Image
                  source={icons.clock}
                  style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain', marginRight: wp(3) }}
                />
              </View>
            </View>
            <View style={{flex:0.49}}>
              <Text style={styles.normal}>{t('to')}</Text>
              <View style={styles.timeCon}>
                <Text style={styles.time}>{moment(data?.bookingEndTime).format('HH:mm A')}</Text>
                <Image
                  source={icons.clock}
                  style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain'}}
                />
              </View>
            </View>
          </View>
          {
            data?.activites?.length > 1 ?
              <>
                <Text style={[styles.normal, { fontWeight: '500', marginVertical: wp(2.5) }]}>{t('activities')}</Text>
                {
                  data?.activites?.map((item, index) => {
                    return (
                      <View style={styles.locationIcon} key={index.toString()}>
                        <Image
                          source={icons.checkBox}
                          style={{ height: wp(3), width: wp(3.2), resizeMode: 'contain', marginRight: wp(3) }}
                        />
                        <Text numberOfLines={1} style={styles.location}>{item?.activityName}</Text>
                      </View>
                    )
                  })
                }
              </>
              :
              null
          }
          <View style={{
            width:wp(90),
            marginTop:hp(2),
            // height:1,
            borderWidth:1,
            borderColor:colors.primaryColor,
            borderStyle:'dashed'
          }}></View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:wp(3.5)}}>
            <Text style={styles.price}>{t('payout')}</Text>
            <Text style={styles.price}>{data?.totalAmount} {t('sar')}</Text>
          </View>
        </View>
           {
             data?.status === 'pending' &&
              <View style={{flexDirection:'row', paddingHorizontal:wp(4), justifyContent:'space-between'}}>
                <Button 
                  label={t('reject')}  
                  width={wp(45)}
                  borderColor={colors.primaryColor}
                  borderWidth={2}
                  textColor={colors.primaryColor}
                  backgroundColor={colors.white}
                  onPress={() => handleSubmit("rejected")}
                />
                <Button 
                  label={t('accepted')}  
                  width={wp(45)}
                  onPress={() => handleSubmit("accepted")}
                />
              </View>
           }
        <CustomLoader isVisible={loading} />
      </View>
    )
  }
export default Owner_BookingDetails