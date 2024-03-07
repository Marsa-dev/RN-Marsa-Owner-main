import { View, ScrollView, Text, Image, SafeAreaView , TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Input from '../../../component/Input'
import Button from '../../../component/Button'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import styles from './style'
import Title from '../../../component/Title'
import colors from '../../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import { SIGNUP_SCREEN, FORGOT_PASSWORD, HOME, OTP_SCREEN, OWNER_HOME, ADD_BOAT_FORM } from '../../../constants/Navigators'
import images from '../../../assets/images/images'
import fonts from '../../../assets/fonts/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showDanger } from '../../../../utils/FlashMessage'
import { getProfile, login } from '../../../api/Httpservice'
import Config from '../../../../utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, userToken } from '../../../redux/action/Action'
import CustomLoader from '../../../component/CustomLoader'
import { useTranslation } from 'react-i18next'
import DropDownPicker from 'react-native-dropdown-picker';
import {setLanguage} from '../../../redux/action/Action';
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false)
  const lang = useSelector(state=>state.data.language)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(lang);
  const [items, setItems] = useState([
    { label: 'English', value: 'en', },
    { label: 'العربية', value: 'ar' },
  ]);
  const handleLangChange = async (itemValue) => {
    // setSelectedLanguage(itemValue)
    setValue(itemValue)
    console.log('itemValue', itemValue())
    i18n.changeLanguage(itemValue())
    await AsyncStorage.setItem('selectedLang', itemValue())
    dispatch(setLanguage(itemValue()))
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, text) => {
    setFormData({
      ...formData,
      [field]: text,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      errors.email = t('emailError');
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      errors.password = t('passwordLengthMessage');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const storeData = async (data) => {
    try {
      getProfile().then(async(res) => { 
        console.log('userdata', res)
        if (res?.success) {
          setLoading(false)
          await AsyncStorage.setItem("userData", JSON.stringify(res?.data))
          dispatch(getUser(res?.data))
            if(data?.boatCount > 0){
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
        else
        {
          setLoading(false)
          console.log('Error', res?.message)
        }
      })
        .catch((err) => {
          setLoading(false)
          showDanger(err)
        })
      // let data = await AsyncStorage.getItem("userData")
      // setUserInfo(JSON.parse(data));        
    } catch (error) {
      showDanger("Error getting user info")

    }
  }

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      setLoading(true)
      let data = {
        email:formData.email.trim(),
        password:formData.password.trim()
      }
      login(data).then(async (res) => {
        console.log('res', res)
        if (res?.success) {
          Config.token = res?.data?.token
          await AsyncStorage.setItem("token", res?.data?.token)
          dispatch(userToken(res?.data?.token))
          storeData(res?.data);
        }
        else{
          setLoading(false)
          showDanger(res.message);
          if(res.verified=== false){
            navigation.navigate(OTP_SCREEN,{email:formData.email})
          }
          // if(res.status)
        }
      })
      .catch((err) => {
        showDanger(err);
      });

      // navigation.navigate(HOME)
      //   storeData(userData);


      // auth()
      // .signInWithEmailAndPassword(formData.email, formData.password)
      // .then((userData) => {
      //   console.log('User signed in!', userData.user.uid);
      // })
      // .catch(error => {
      //   if (error.code === 'auth/user-not-found') {
      //     console.log('That email not found!');
      //   }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //   }

      //   console.error(error);
      // });

      
    } else {
      // Handle invalid form submission
      
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.loginImage} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
        <View style={{width:wp(30), zIndex:1000, position:'absolute' , right:wp(5),top:(hp(2))}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleLangChange}
            setItems={setItems}
            // textStyle={styles.label}
            style={{ borderColor: colors.primaryColor, color: colors.primaryColor, borderRadius: wp(1.1), }}
            listMode="SCROLLVIEW"
            containerStyle={{ width: wp(30) }}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>


      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inputTextView}>
        <ScrollView>

          
          <Title label={t('login')} />

          <Input 
            value={formData.email}
            label={t('email')} 
            marginTop={hp(4)}
            placeHolder={t('email')} 
            onChangeText={(text) => {handleInputChange('email', text)}}
          />
          {formErrors.email &&
            <Text style={styles.error}>{formErrors.email}</Text>
          }

          <Input 
            value={formData.password}
            label={t('password')} 
            marginTop={hp(1)}
            placeHolder={t('password')} 
            secureTextEntry
            onChangeText={(text) => {handleInputChange('password', text)}}
          />

          {formErrors.password &&
            <Text style={styles.error}>{formErrors.password}</Text>
          }


        <TouchableOpacity 
          style={{
            width:wp(90),
            marginTop:hp(1)
            }}
            onPress={() => {navigation.navigate(FORGOT_PASSWORD)}}
            >
            <Text style={{color:colors.primaryColor, fontFamily:fonts.regular , alignSelf:'flex-end'}}>{t('forgetPassword')}</Text>
          </TouchableOpacity>


        <Button label={t('login')} marginTop={hp(4)} onPress={handleSubmit} />
        
        <View style={{marginTop:hp(6), alignItems:'center'}}>
          <Text style={{color:colors.primaryColor,
          fontFamily:fonts.regular 
          }}>
            {t('noAccount')} 
            <Text 
            onPress={() => {navigation.navigate(SIGNUP_SCREEN)}} 
            style={{
              color:colors.primaryColor, 
              textDecorationLine:'underline',
              fontFamily:fonts.regular 
              }}>
              {t('signUp')}
              </Text>
            </Text>
        </View>
       </ScrollView>
      </View>
      <CustomLoader isVisible={loading} />
    </View>
  )
}

export default LoginScreen