import { View, Text, ScrollView, Alert, PermissionsAndroid, Platform, Image, TouchableOpacity } from 'react-native'
import React, {useState } from 'react'
import Header from '../../../../component/Header'
import icons from '../../../../assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import TextHeader from '../../../../component/TextHeader'
import HorizontalLine from '../../../../component/HorizontalLine'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Button from '../../../../component/Button'
import { OWNER_HOME } from '../../../../constants/Navigators'
import { addBoat } from '../../../../api/Httpservice'
import { showDanger } from '../../../../../utils/FlashMessage'
import CustomLoader from '../../../../component/CustomLoader'
import { useTranslation } from 'react-i18next'

const ScanLicense = ({route}) => {
  const { data, boatType, boatresume } = route?.params
  //   console.log('data', data)
  // console.log('boatType', boatType)
  // console.log('boatresume', boatresume)
    const navigation = useNavigation()
    const {t} = useTranslation()
    const [frontImage, setFrontImage] = useState(null)
    const [backImage, setBackImage] = useState(null)
    const [loading, setLoading] = useState(false)

    
    const showAlert = (check) => {
      console.log('check', check)
      Alert.alert(
        t('selectPhoto'),
        '',
        [
          {
            text: t('gallery'),
            onPress:()=> chooseFile(check),
          },
          {
            text: t('camera'),
            onPress:()=> captureImage(check),
          },
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Canceled'),
          //   style: 'cancel',
          // },
        ],
        { cancelable: false }
      );
    }
  
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: t('camPermissionTitle'),
              message: t('camPermissionMsg'),
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else return true;
    };
  
    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: t('stgPermissionTitle'),
              message: t('stgPermissionMsg'),
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          Alert.alert('Write permission err', err);
        }
        return false;
      } else return true;
    };
  
  const chooseFile = (check) => {
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      const res = response;
      // console.log("Response ====> ",response)
      if (response.didCancel) {
        Alert.alert(t('userCancelled'));
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert(t('camError'));
      } else if (response.errorCode == 'permission') {
        Alert.alert(t('permissionError'));
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
      } else {
        // Handle the case when an image is selected
        console.log('uri -> ', response.assets[0]);
        if (check === 'front') {
          setFrontImage(response.assets[0]);
        } else {
          setBackImage(response.assets[0]);
        }
      }
    });
  };

    const captureImage = async (check) => {
      let options = {
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      console.log(isCameraPermitted , isStoragePermitted);
      if (isCameraPermitted) {
        launchCamera(options, response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            Alert.alert(t('userCancelled'));
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            Alert.alert(t('camError'));
            return;
          } else if (response.errorCode == 'permission') {
            Alert.alert(t('permissionError'));
            return;
          } else if (response.errorCode == 'others') {
            Alert.alert(t('camIssue'));
            return;
          }
          console.log('uri -> ', response.assets);
          if(check === 'front'){
            setFrontImage(response.assets[0])
          }
          else{
            setBackImage(response.assets[0])
          }
          
        });
      }
      
    };
    const handleSubmit =async ()=>{
      if(!frontImage || !backImage){
        showDanger('Both Images are required')
      }
      else{
        setLoading(true)
        var assets = new FormData();
        assets.append("craftName", data?.craftName)
        assets.append("waterCraftType",data?.craftType)
        assets.append("guestCapicty", data?.gustCapacity)
        assets.append("rentPerHour",data?.rent)
        assets.append("description",data?.discription)
        assets.append("minHour",data?.minHour)
        assets.append("maxHour",data?.maxHour)
        assets.append("boatType",boatType?.boatType)
        assets.append("typeOfCraftType",boatType?.option)
        assets.append("loa",boatType?.loa)
        assets.append("experience",boatresume?.exp)
        assets.append("resume",boatresume?.resume)
        // assets.append("fullName",)
        // assets.append("addressLine1",)
        // assets.append("addressLine2",)
        // assets.append("city",)
        // assets.append("state",)
        // assets.append("credential",)
        // assets.append("issueDate",)
        // assets.append("expireDate",)
        for (let i = 0; i < data?.craftImages?.length; i++) {
          const pathSegments = data?.craftImages[i]?.uri.split("/");
          const fileName = pathSegments[pathSegments.length - 1];
          // console.log('fileName', fileName)
          assets.append('boatImages', {
            uri: data?.craftImages[i]?.uri,
            type: data?.craftImages[i]?.type,
            name: fileName
          });
        }
        // console.log('Uri', backImage?.uri)
        // console.log('type', backImage?.type)
        // console.log('fileName', backImage?.fileName)
        assets.append('licenseImages',{
          uri: frontImage?.uri,
          type: frontImage?.type,
          name: frontImage?.fileName
        });
        assets.append('licenseImages', {
          uri: backImage?.uri,
          type: backImage?.type,
          name: backImage?.fileName
        });
        
        try {
          const res = await addBoat(assets, 'boat/register')
          console.log('res', res) 
          if(res?.success === true){
            setLoading(false)
            navigation.reset({
              index: 0, // Index of the screen to navigate to
              routes: [{ name: OWNER_HOME }] // Name of the screen to navigate to
            });  
          }
          else{
            setLoading(false)
            console.log('res', res?.message)
            showDanger(res?.message)
          }
        }
        catch(error){
          setLoading(false)
          console.log('error', error)
        }
      }
    }
    return (
    <View style={styles.container}>
        <Header
            leftIcon={icons.backArrow}
            leftIconPress={() => {navigation.goBack()}}
            title={t('boatResume')}
            rightText={"4/4"}
        />
        <HorizontalLine
          label={"4"}
        />
        <TextHeader title={t('scanImage')} />

        <ScrollView style={styles.bottomContainer}>
          
          <Text style={styles.mainLabel}>{t('front')}</Text>
          <TouchableOpacity 
              onPress={() => showAlert('front')}
              style={styles.addImageView}>
              {
                frontImage ?
                <Image source={{ uri: frontImage?.uri }} style={{ width: '100%', height: "100%", resizeMode:'stretch' }} />
                  :
                  <>
                  <Image source={icons.plusIcon} style={{ width: wp(6), height: wp(6) }} />
                  <Text style={styles.addImageText}>{t('addScan')}</Text>
                  <Text style={styles.addImageBottomText}>(png.jpg.pdf)</Text>
                  </>
              }
          </TouchableOpacity>

          <Text style={styles.mainLabel}>{t('back')}</Text>
          <TouchableOpacity 
              onPress={() => showAlert("back")}
              style={styles.addImageView}>
                { 
                backImage ? 
                <Image source={{ uri: backImage?.uri }} style={{ width: '100%', height: "100%", resizeMode:'stretch' }} />
                  :
                  <>
                    <Image source={icons.plusIcon} style={{width:wp(6), height:wp(6)}} />
                    <Text style={styles.addImageText}>{t('addScan')}</Text>
                    <Text style={styles.addImageBottomText}>(png.jpg.pdf)</Text>
                  </>
                }
          </TouchableOpacity>

        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <Button
            label={t('saveButton')}
            onPress={handleSubmit}
          />
        </View>
        <CustomLoader isVisible={loading}/>
    </View>
  )
}

export default ScanLicense