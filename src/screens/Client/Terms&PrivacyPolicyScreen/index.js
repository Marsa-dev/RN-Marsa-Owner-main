import { View, Text,ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import icons from '../../../assets/icons/icons';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import { getListData } from '../../../api/Httpservice';
import CustomLoader from '../../../component/CustomLoader';
import { useTranslation } from 'react-i18next';

const TermsAndPrivacyPolicy = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const isFocused = useIsFocused();
    const [selectedButton, setSelectedButton] = useState('first'); // Set the default selected button
    const [loading , setLoading] = useState(false)
    const [terms , setTerms] = useState('')
    const [privacy , setPrivacy] = useState('')

    useEffect(()=> {
        if(isFocused){
            setLoading(true)
            getData()
        }
    },[isFocused])
    const getData =async ()=>{
        const res =await getListData('privacy-term');
        setLoading(false)
        // console.log('first', res)
        setPrivacy(res?.data?.privacyPolicy)
        setTerms(res?.data?.termsCondition)
    }
    
    const handleButtonPress = (buttonLabel) => {
        setSelectedButton(buttonLabel);
      };

    return (
        <View style={styles.container}>
            <Header title={t('terms')} leftIcon={icons.backArrow} leftIconPress={() => {navigation.goBack()}} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:hp(0.5), paddingHorizontal:wp(4) }}>
                <Button
                    label={t('termsAndConditions')}
                    width={wp(45)}
                    textColor={selectedButton === 'first' ? colors.white : colors.primaryColor}
                    borderRadius={wp(8)}
                    backgroundColor={selectedButton === 'first' ? colors.primaryColor : colors.white}
                    onPress={() => handleButtonPress('first')}
                    borderColor={colors.primaryColor}
                    borderWidth={1}
                />
                <Button
                    label={t('privicyPolicy')}
                    width={wp(45)}
                    textColor={selectedButton === 'second' ? colors.white : colors.primaryColor}
                    borderRadius={wp(8)}
                    backgroundColor={selectedButton === 'second' ? colors.primaryColor : colors.white}
                    onPress={() => handleButtonPress('second')}
                    borderColor={colors.primaryColor}
                    borderWidth={1}

                />
            </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{marginTop:hp(2), paddingHorizontal:wp(4), fontFamily:fonts.regular, color:colors.primaryColor}}>
                {selectedButton === 'first'? terms : privacy}
            </Text>
        </ScrollView>
        <CustomLoader isVisible={loading} />
        </View>
  )
}

export default TermsAndPrivacyPolicy