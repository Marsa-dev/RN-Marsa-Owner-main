import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../component/Header'
import icons from '../../../../assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import TextHeader from '../../../../component/TextHeader'
import HorizontalLine from '../../../../component/HorizontalLine'
import Input from '../../../../component/Input'
import { widthPercentageToDP as wp,
  heightPercentageToDP as hp,         
} from 'react-native-responsive-screen'
import Button from '../../../../component/Button'
import { SCAN_LICENSE } from '../../../../constants/Navigators'
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../../../assets/colors/colors'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const CaptainLicense = () => {
    const navigation = useNavigation()
    const {t}=useTranslation()
    const [issueDate, setIssueDate] = useState(new Date())
    const [openIssueDate, setOpenIssueDate] = useState(false)
    const [expiryDate, setExpiryDate] = useState(new Date())
    const [openexpiryDate, setOpenExpiryDate] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Boat', value: 'Boat'},
        {label: 'Jet-ski', value: 'Jet-ski'},
        {label: 'Yacht', value: 'Yacht'},
    ]);

    const [licenseInfo, setLicenseInfo] = useState({
      fullName:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
    })
    const [errors, setErrors] = useState({
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
    });

    const validateField = (fieldName, value) => {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `${fieldName} is required`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: '',
        }));
      }
    };
  
    const handleInputChange = (fieldName, text) => {
      setLicenseInfo((prev) => ({
        ...prev,
        [fieldName]: text,
      }));
      validateField(fieldName, text);
    };
  
    const handleSubmit = () => {
      // Validate all fields before navigating to the next screen
      const fieldNames = Object.keys(licenseInfo);
      let hasError = false;

      fieldNames.forEach((fieldName) => {
        const fieldValue = licenseInfo[fieldName];
        if (!fieldValue) {
          validateField(fieldName, fieldValue);
          hasError = true;
        }
      });

      if (!hasError) {
        // If there are no errors, navigate to the next screen
        navigation.navigate(SCAN_LICENSE);
      }
    };

    return (
    <View style={styles.container}>
        <Header
            leftIcon={icons.backArrow}
            leftIconPress={() => {navigation.goBack()}}
            title={t('boatResume')}
            rightText={"4/5"}
        />
        <HorizontalLine
          label={"4"}
        />
        <TextHeader title={t('capLicence')} />
        
        <ScrollView style={styles.bottomContainer}>
          <Input
            value={licenseInfo.fullName}
            label={t('fullName')}
            marginTop={hp(1)}
            placeHolder={t('fullName')}
            onChangeText={(text) => handleInputChange('fullName', text)}
          />
          {errors.fullName &&
            <Text style={styles.error}>{errors.fullName}</Text>
          }

          <Input
            value={licenseInfo.address1}
            marginTop={hp(1)}
            label={t('addressOne')}
            placeHolder={t('addressOne')}
            onChangeText={(text) => handleInputChange('address1', text)}
          />
          {errors.address1 &&
            <Text style={styles.error}>{errors.address1}</Text>
          }

          <Input
            value={licenseInfo.address2}
            label={t('addressTwo')}
            marginTop={hp(1)}
            placeHolder={t('addressTwo')}
            onChangeText={(text) => handleInputChange('address2', text)}
            error={errors.address2}
          />
          {errors.address2 &&
            <Text style={styles.error}>{errors.address2}</Text>
          }
          <View style={{flexDirection:'row', marginTop:hp(1), justifyContent:'space-between'}}>
            <Input
              width={wp(45)}
              value={licenseInfo.city}
              label={t('city')}
              placeHolder={t('city')}
              onChangeText={(text) => handleInputChange('city', text)}
            />
            <Input
              width={wp(45)}
              value={licenseInfo.state}
              label={t('state')}
              placeHolder={t('state')}
              onChangeText={(text) => handleInputChange('state', text)}
            />
          </View>
          <View style={{flexDirection:'row', marginTop:hp(1), justifyContent:'space-between'}}>
            <View style={{flex:0.5}}>
            {errors.city &&
              <Text style={styles.error}>{errors.city}</Text>
            }
            </View>
            <View style={{flex:0.5}}>
            {errors.state &&
              <Text style={styles.error}>{errors.state}</Text>
            }
            </View>
          </View>

          <Text style={styles.mainLabel}>{t('credentialType')}</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            zIndex={100}
            setValue={setValue}
            setItems={setItems}
            placeholder={t('credential')}
            placeholderStyle={{color:colors.placeholder}}
            style={{ borderColor: colors.primaryColor, borderRadius: wp(1.1),}}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            dropDownContainerStyle={{
              position: 'relative',
              top: 0
            }}        
        />
          <View style={{flexDirection:'row', marginTop:hp(1), paddingBottom:hp(15), justifyContent:'space-between'}}>
            
            <View style={{flex:0.49}}>
              <Text style={styles.mainLabel}>{t('issueDate')}</Text>
              <View style={styles.input}>
                  <Text onPress={()=> setOpenIssueDate(true)}>
                      {moment(issueDate).format('MM/DD/YYYY')}
                  </Text>
              </View>
              <DatePicker
                  modal
                  mode='date'
                  open={openIssueDate}
                  date={issueDate}
                  onConfirm={(date) => {
                      setOpenIssueDate(false)
                      setIssueDate(date)
                  }}
                  minimumDate={new Date()}
                  onCancel={() => {
                    setOpenIssueDate(false)
                  }}
                  textColor={colors.primaryColor}
              />
            </View>

            <View style={{flex:0.49}}>
            <Text style={styles.mainLabel}>{t('exDate')}</Text>
              <View style={styles.input}>
                  <Text onPress={()=> setOpenExpiryDate(true)}>
                      {moment(expiryDate).format('MM/DD/YYYY')}
                  </Text>
              </View>
              <DatePicker
                  modal
                  mode='date'
                  open={openexpiryDate}
                  date={expiryDate}
                  onConfirm={(date) => {
                    setOpenExpiryDate(false)
                    setExpiryDate(date)
                  }}
                  minimumDate={new Date()}
                  onCancel={() => {
                    setOpenExpiryDate(false)
                  }}
                  textColor={colors.primaryColor}
              />
            </View>
           
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <Button
            label={t('continue')}
            onPress={handleSubmit}
          />
        </View>

    </View>
  )
}

export default CaptainLicense