import { View, Text,  ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import Input from '../../../component/Input'
import Button from '../../../component/Button'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import styles from './style'
import Title from '../../../component/Title'
import colors from '../../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import { CREATE_NEW_PASSWORD_SCREEN, LOGIN_SCREEN, SIGNUP_SCREEN } from '../../../constants/Navigators'

import OTPInputView from '@twotalltotems/react-native-otp-input'
import images from '../../../assets/images/images'
import fontsSize from '../../../assets/fontsSize/fontsSizes'
import fonts from '../../../assets/fonts/fonts'
import { forgetPassword, forgetPasswordResend, forgetPasswordValidate, resendOTP, validateOTP } from '../../../api/Httpservice'
import { showMessage } from 'react-native-flash-message'
import { showDanger } from '../../../../utils/FlashMessage'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const OtpScreen = ({route}) => {
  const { t } = useTranslation();
  const lang= useSelector(state=>state.data.language)
  let email = route?.params?.email
  let changePass = route?.params?.changePass
  const [time, setTime] = useState(59);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(time);

  console.log(email);
  const navigation = useNavigation();
  const [otp, setOtp] = useState('')
  useEffect(() => {
    startCounter()
  }, []);

  const startCounter = () => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }


  const handleSubmit = () => {
    if(otp !== ''){
      // navigation.navigate(CREATE_NEW_PASSWORD_SCREEN)
      let data = {
        otp: otp,
        email: email
      }
      if(changePass){
        forgetPasswordValidate(data).then((res) => {
          console.log(res);
          if(res.success) {
            timerRef.current = 0
            if(changePass){
              navigation.navigate(CREATE_NEW_PASSWORD_SCREEN, {email: email})
            }
            else{
              navigation.navigate(LOGIN_SCREEN)
            }
          }
          else{
            showMessage(res.message)
          }
            // showMessage(res.message)
        })
        .catch((err) => {
          showDanger(err)
        })
      }
      else{
        setLoading(true)
        validateOTP(data).then((res) => {
          console.log(res);
          if(res.success) {
            timerRef.current = 0
            if(changePass){
              navigation.navigate(CREATE_NEW_PASSWORD_SCREEN)
            }
            else{
              navigation.navigate(LOGIN_SCREEN)
            }
          }
            // showMessage(res.message)
        })
        .catch((err) => {
          showDanger(err)
        })
      }


    }
  }

  const resendOtp = () => {
    setTime(59)
    timerRef.current = 59
    setTimeout(() => {
      startCounter()
    }, 100)
    let data = {
      email:email
    }
    if(changePass){
      // console.log("changePass");
      forgetPassword(data).then((res) => {
        if(res.success){
          showMessage(res.message)
        }
      })
      .catch((err) => {
        showDanger(err);
      })
    }
    else{
      resendOTP(data).then((res) => {
        if(res.success){
          showMessage(res.message)
        }
      })
      .catch((err) => {
        showDanger(err);
      })
    }
  }
 

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.otpScreen} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
      </View>

      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputTextView}>
        <ScrollView>
          
        <Title label={t('otp')} marginHorizontal={wp(5)} />

        <View style={{ paddingHorizontal:wp(5), marginTop:hp(1), justifyContent: lang==='ar' ? 'flex-end' :'center' }}>
            <Text style={{ color: colors.primaryColor, fontFamily: fonts.regular, width: wp(70) }}>{t('enterOTP')} {email} </Text>
        </View>

        <View style={{ paddingHorizontal:wp(5), marginTop:hp(5)}}>
          <Text style={{color:colors.primaryColor, fontFamily:fonts.regular, fontSize:fontsSize.px_16}}>{t('otp')}</Text>
        </View>

    <OTPInputView
        style={{width: wp(100), paddingHorizontal:wp(5),height:hp(8),  alignSelf: 'center'}}
        pinCount={4}
        code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged = {code => { setOtp(code)}}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled = {(code => {
            console.log(`Code is ${code}, you are good to go!`)
        })}
    />

        <Button label={t('verify')} marginTop={hp(4)} onPress={handleSubmit} />

        <View style={{marginTop:hp(6),paddingHorizontal:wp(5), flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity disabled={time === 0 ? false: true} onPress={() => {resendOtp()}}>
            <Text style={{color:colors.primaryColor, fontFamily:fonts.regular}}>{t('resend')}</Text>
          </TouchableOpacity>
          <Text style={{color:colors.primaryColor, fontFamily:fonts.regular}}>00 : {time}</Text>

        </View>
      </ScrollView>
    </View>



    </View>
  )
}

export default OtpScreen