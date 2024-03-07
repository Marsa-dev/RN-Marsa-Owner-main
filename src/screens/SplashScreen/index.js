import { View, Text, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ADD_BOAT_FORM, LOGIN_SCREEN, OWNER_HOME } from '../../constants/Navigators';
import images from '../../assets/images/images';
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import { showDanger } from '../../../utils/FlashMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { destination, gallery, getUser, setBoats, setLanguage, setRole, slider, userToken } from '../../redux/action/Action';
import { getListData, getProfile } from '../../api/Httpservice';
import { useTranslation } from 'react-i18next';

const SplashScreen = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch()
  useEffect(() => {
    // getSlider()
    // getBoats()
    // getGallery()
    // getDesitination()
    getData();
  }, []);
  const getSlider = async ()=>{
    await getListData('boat/getSlider').then((res)=>{
      // console.log('slider', res)
      dispatch(slider(res?.data))
    }).catch((e)=>{
      showDanger(e.message)
    })
  }
  const getGallery = async ()=>{
    await getListData('gallery').then((res)=>{
      // console.log('Gallery', res)
      dispatch(gallery(res?.data))
    }).catch((e)=>{
      showDanger(e.message)
    })
  }
  const getDesitination = async ()=>{
    await getListData('destination').then((res)=>{
      // console.log('Destination', res)
      dispatch(destination(res?.data))
    }).catch((e)=>{
      showDanger(e.message)
    })
  }
  const getBoats = async ()=>{
    await getListData('boat/public').then((res) => {
      // console.log('boats', res)
      dispatch(setBoats(res?.data))
    }).catch((e) => {
      showDanger(e.message)
    })
  }
  const getData = async () => {
    try {
      // let val1 = await AsyncStorage.getItem("role")
      let token = await AsyncStorage.getItem("token")
      // dispatch(setRole(val1))
      let lang = await AsyncStorage.getItem('selectedLang')
      if (lang) {
        i18n.changeLanguage(lang);
        dispatch(setLanguage(lang))
      }
      else {
        dispatch(setLanguage('en'))
      }
      if(token){
        dispatch(userToken(token))
        Config.token= token;
        getUserProfile()
      }
      else{
        setTimeout(() => {
          navigation.reset({
            index: 0, // Index of the screen to navigate to
            routes: [{ name: LOGIN_SCREEN }] // Name of the screen to navigate to
          });
        }, 2000);
      }

    } catch (error) {
      showDanger(t('error'));
    }
  }
  
  const getUserProfile = async()=>{
    try {
      await getProfile().then((res) => {
        if(res?.success) {
          dispatch(getUser(res?.data))
            if (res?.data?.boatCount > 0){
              navigation.reset({
                index: 0, // Index of the screen to navigate to
                routes: [{ name: OWNER_HOME }] // Name of the screen to navigate to
              });
            }
            else
            {
              navigation.reset({
                index: 0, // Index of the screen to navigate to
                routes: [{ name: ADD_BOAT_FORM }] // Name of the screen to navigate to
              });
            }
        }
        else{
          console.log('res', res?.message)
        }
      })
      .catch((err) => {
        showDanger(err.message)
      })
    } catch (error) {
      showDanger(t('userError'))
      
    }
  }

  
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={{width:wp(60), height:hp(20), resizeMode:'contain'}} />
    </View>
  )
}

export default SplashScreen