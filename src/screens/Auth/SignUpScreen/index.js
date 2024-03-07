import { View,ScrollView, ActivityIndicator, Platform, Text, Image, TouchableOpacity, } from 'react-native'
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
import { LOGIN_SCREEN, OTP_SCREEN, SIGNUP_SCREEN } from '../../../constants/Navigators'
import images from '../../../assets/images/images'
import fonts from '../../../assets/fonts/fonts'
import { registeration } from '../../../api/Httpservice'
import { showDanger } from '../../../../utils/FlashMessage'
import CustomLoader from '../../../component/CustomLoader'
import { useTranslation } from 'react-i18next'
const SignUpScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Name validation
    if (formData.name.length < 3) {
      errors.name = t('nameMessage');
      isValid = false;
    }

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

    // Confirm Password validation
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = t('passwordConfirm');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("DONE");
      let data = {
        "fullName": formData.name,
        "email": formData.email.trim(),
        "password": formData.password.trim(),
      }
      setIsLoading(true)

      registeration(data).then((res) => {
        console.log(res);
        if(res.success) {
          navigation.navigate(OTP_SCREEN, {email: formData.email})
        }
        else{
          showDanger(res.message);
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        showDanger(error?.message)
      })
     
      
    } else {
      // Handle invalid form submission
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.signUpImage} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
      </View>

      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputTextView}>
        <ScrollView>
          <Title label={t('signUp')} />

          <Input 
            value={formData.name}
            label={t('name')} 
            marginTop={hp(4)}
            placeHolder={t('name')} 
            onChangeText={(text) => {handleInputChange('name', text)}}
          />
          {formErrors.name &&
             <Text style={styles.error}>{formErrors.name}</Text>
          }


          <Input 
            value={formData.email}
            label={t('email')} 
            marginTop={hp(1)}
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

          <Input 
            value={formData.confirmPassword}
            label={t('retypePassword')} 
            marginTop={hp(1)}
            placeHolder={t('retypePassword')} 
            secureTextEntry
            onChangeText={(text) => {handleInputChange('confirmPassword', text)}}
          />
          {formErrors.confirmPassword &&
             <Text style={styles.error}>{formErrors.confirmPassword}</Text>
          }       
            <Button label={t('signUp')} marginTop={hp(4)} onPress={handleSubmit} />

        <View style={{marginTop:hp(2), alignItems:'center'}}>
            <Text style={{ color: colors.primaryColor, fontFamily: fonts.regular }}>{t('haveAccount')}<Text onPress={() => {navigation.navigate(LOGIN_SCREEN)}} style={{color:colors.primaryColor, fontFamily:fonts.regular, textDecorationLine:'underline'}}>{t('login')}</Text></Text>
        </View>
      </ScrollView>          
    </View>
    <CustomLoader isVisible={isLoading}/>
    </View>
  )
}


export default SignUpScreen