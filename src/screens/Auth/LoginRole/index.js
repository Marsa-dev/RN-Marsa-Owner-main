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
import { SIGNUP_SCREEN, FORGOT_PASSWORD, HOME, LOGIN_SCREEN } from '../../../constants/Navigators'
import images from '../../../assets/images/images'
import fonts from '../../../assets/fonts/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showDanger } from '../../../../utils/FlashMessage'
import { useDispatch } from 'react-redux'
import { setRole } from '../../../redux/action/Action'

const LoginRole = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleSubmit = async (data) => {
  try {
    await AsyncStorage.setItem("role", data)
    dispatch(setRole(data))
    navigation.navigate(LOGIN_SCREEN)
  } catch (error) {
    showDanger("data is not store", error)
  }
  };



  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.loginAs} 
          style={{width:'100%', height:'100%', resizeMode:'stretch'}} 
        />
      </View>


      <View 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inputTextView}>
        <ScrollView>   
          <Title label={"Login as a"} />

        <Button label={"Customer"} marginTop={hp(4)} onPress={() => handleSubmit("Customer")} />
        <Button label={"Boat Owner"} marginTop={hp(2)} backgroundColor={colors.secondryColor} onPress={() => handleSubmit("owner")} />
      
       </ScrollView>
      </View>
    </View>
  )
}

export default LoginRole