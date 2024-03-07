import { View, Text,  ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useRef} from 'react'
import Input from '../../../component/Input'
import Button from '../../../component/Button'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import styles from './style'
import Title from '../../../component/Title'
import colors from '../../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native';
import {  OTP_SCREEN} from '../../../constants/Navigators'
import images from '../../../assets/images/images'
import fonts from '../../../assets/fonts/fonts'
import { showDanger } from '../../../../utils/FlashMessage'
import { forgetPassword } from '../../../api/Httpservice'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const navigation = useNavigation()
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
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
    if (!emailPattern.test(formData.email)) {
      errors.email = t('emailError');
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("DONE");
      // navigation.navigate(CREATE_NEW_PASSWORD_SCREEN);
      let data = {
        email:formData.email,
      }
      forgetPassword(data).then((res) => {
        if(res.success) {
          navigation.navigate(OTP_SCREEN, {email: formData.email, changePass:true});
        }
        else{
          showDanger(res.message)
        }
      })
      .catch((err) => {
        showDanger(err);
      })

      
    } else {
      // Handle invalid form submission
      
    }
  }; 

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.ForgetPasswordImage} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
      </View>

      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputTextView}>
        <ScrollView>
          
        <Title label={t('forgetPassword')} marginHorizontal={wp(5)} />

        <View style={{ justifyContent:'center', paddingHorizontal:wp(5), marginTop:hp(1)}}>
          <Text 
          style={{
            color:colors.primaryColor, 
            width:wp(70),
            fontFamily:fonts.regular
          }}>{t('enterEmailForVerification')}</Text>
        </View>

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

        <Button label={t('send')} marginTop={hp(4)} onPress={handleSubmit} />

        
      </ScrollView>
    </View>



    </View>
  )
}

export default ForgotPassword