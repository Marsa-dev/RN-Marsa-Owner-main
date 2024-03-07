import { View, Text, Image, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import images from '../../../assets/images/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import Header from '../../../component/Header';
import TextWithIcon from '../../../component/TextWithIcon';
import icons from '../../../assets/icons/icons';
import ProfileInfo from '../../../component/ProfileInfo';
import Button from '../../../component/Button';
import Input from '../../../component/Input';
import NonEditableInput from '../../../component/NonEditableInput';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { getProfile, updateProfile } from '../../../api/Httpservice';
import { showDanger, showSuccess } from '../../../../utils/FlashMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../../component/CustomLoader';
import { useTranslation } from 'react-i18next';

const ProfileInfoScreen = ({route}) => {
  const navigation = useNavigation();
  const {t}=useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const [imageData, setImageData] = useState([])
  const userInfo = useSelector(state=> state.data.user)
  const dispatch = useDispatch()
  // console.log(route?.params?.userInfo);
  const [userData, setUserData] =useState(userInfo)
  const [name , setName] = useState(userInfo?.fullName)
  const updateData = async () => {
    if(name != ''){
      var data = new FormData();
      data.append("fullName", name)
      imageData.length > 0 &&
      (
        data.append(
            "profilePic", {
            uri: imageData[0]?.uri,
            type: imageData[0]?.type,
            name: imageData[0]?.fileName
        })
      )
      setIsLoading(true)
      updateProfile(data).then((res) => {
      setIsLoading(false)

        if(res.success) {
          showSuccess(t('profileUpdated'))
          updateUser()
        }
      })
      .catch((err) => {
        setIsLoading(false)
        showDanger(err.message)
      })
    }
    else{
      showDanger(t('invalidData'))
    }

    // updateProfile
  }
  const updateUser= async()=>{
    const res = await getProfile()
    await AsyncStorage.setItem("userData",  JSON.stringify(res?.data))
    dispatch(getUser(res?.data))
    console.log('res', res?.data)
    navigation.goBack()
  }
  const showAlert = () => {
    Alert.alert(
      t('selectPhoto'),
      '',
      [
        {
          text: t('gallery'),
          onPress: chooseFile,
        },
        {
          text: t('camera'),
          onPress: captureImage,
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

  const chooseFile = () => {
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      const res= response;
      // console.log("Response ====> ",response)
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
        Alert.alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets);
      setImageData(response.assets)
      setUserData((prev) => {
        return {
          ...prev,
          profilePic: response?.assets[0]?.uri
        }
      })
    });
  };
  const captureImage = async () => {
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
        setImageData(response.assets)
        setUserData((prev) => {
          return {
            ...prev,
            profilePic: response?.assets[0]?.uri
          }
        })
      });
    }
    
  };

  return (
    <View style={styles.container}>
      <Header title={t('profile')} leftIcon={icons.backArrow} leftIconPress={() => {navigation.goBack()}} />
      <View style={styles.profileInfo}>
        <ProfileInfo icon={userData.profilePic} imageData={imageData[0]?.uri} onPress={() => {showAlert()}} />
      </View>

      <View style={styles.optionsView}>
        <Input label={t('name')} value={name} onChangeText={(v)=> setName(v)} />
        <NonEditableInput label={t('email')} marginTop={hp(2)} value={userData.email} />
        <Button label={t('saveButton')} marginTop={hp(4)} onPress={() => { updateData() }} />
      </View>
      <CustomLoader isVisible={isLoading} />
    </View>
  )
}

export default ProfileInfoScreen