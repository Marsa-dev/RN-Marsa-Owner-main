import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
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
import { LOGIN_SCREEN } from '../../../constants/Navigators'
import images from '../../../assets/images/images'
import fonts from '../../../assets/fonts/fonts'
import { createNewPassword } from '../../../api/Httpservice'
import { showDanger } from '../../../../utils/FlashMessage'
import { useTranslation } from 'react-i18next'

const CreateNewPasswordScreen = ({route}) => {

  let email = route?.params?.email
  const navigation = useNavigation()
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
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


    // Password validation
    if (formData.password.length < 6) {
      errors.password = t('passwordError');
      isValid = false;
    }

    // Confirm Password validation
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = t('passwordNotMatch');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };


  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("DONE");
      try {
        let data = {
          email: email,
          password: formData.password
        }
        createNewPassword(data).then((res) => {
          if(res.success) {
            navigation.reset({
              index: 0, // Index of the screen to navigate to
              routes: [{ name: LOGIN_SCREEN }] // Name of the screen to navigate to
            });
          }
          else{
            showMessage(res.message)
          }
        })
        .catch((err) => {
          showDanger(err)
        })
       
      } catch (error) {
        showDanger(error)
      }

      // navigation.navigate(HOME)
      
    } else {
      // Handle invalid form submission
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.creatNewPsswordImage} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
      </View>

      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputTextView}>
        <ScrollView>
          
        <Title label={t('createNewPassword')} marginHorizontal={wp(5)} />

        <View style={{ justifyContent:'center', paddingHorizontal:wp(5), marginTop:hp(1)}}>
          <Text style={{color:colors.primaryColor, fontFamily:fonts.regular, width:wp(70)}}>{t('shouldNotSamePassword')}</Text>
        </View>

        <Input 
            value={formData.password}
            label={t('password')} 
            marginTop={hp(4)}
            placeHolder={t('password')} 
            onChangeText={(text) => {handleInputChange('password', text)}}
          />
          {formErrors.password &&
            <Text style={styles.error}>{formErrors.password}</Text>
          }
  
          <Input 
            value={formData.confirmPassword}
            label={t('reTypePassword')} 
            marginTop={hp(1)}
            placeHolder={t('reTypePassword')} 
            onChangeText={(text) => {handleInputChange('confirmPassword', text)}}
          />
          {formErrors.confirmPassword &&
             <Text style={styles.error}>{formErrors.confirmPassword}</Text>
          }
        <Button label={t('save')} marginTop={hp(4)} onPress={handleSubmit} />

        
      </ScrollView>
    </View>

    </View>
  )
}

export default CreateNewPasswordScreen