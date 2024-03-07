import { View, Text, ScrollView, Alert, PermissionsAndroid, Platform, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Header from '../../../../component/Header'
import icons from '../../../../assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import TextHeader from '../../../../component/TextHeader'
import HorizontalLine from '../../../../component/HorizontalLine'
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../../../assets/colors/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Input from '../../../../component/Input'
import fontsSize from '../../../../assets/fontsSize/fontsSizes'
import Button from '../../../../component/Button'
import { BOAT_TYPE } from '../../../../constants/Navigators'
import { min } from 'moment'
import { showDanger } from '../../../../../utils/FlashMessage'
import { useTranslation } from 'react-i18next'

const AddBoatForm = () => {
  const navigation = useNavigation()
  const {t} = useTranslation()
  const [imageData, setImageData] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: t('boat'), value: 'Boat'},
        {label: t('jetski'), value: 'Jet-ski'},
        {label: t('yacht'), value: 'Yacht'},
    ]);

    const [craftName, setCraftName] = useState('')
    const [gustCapacity, setGustCapacity] = useState('1')
    const [rent, setRent] = useState("")
    const [discription, setDiscription] = useState('')
    const [maxHourError, setMaxHourError] = useState(null);


    const [hours, setHours] = useState([
      { label: t('hour1'), value: '1' },
      { label: t('hour2'), value: '2' },
      { label: t('hour3'), value: '3' },
      { label: t('hour4'), value: '4' },
      { label: t('hour5'), value: '5' },
      { label: t('hour6'), value: '6' },
      { label: t('hour7'), value: '7' },
      { label: t('hour8'), value: '8' },
      { label: t('hour9'), value: '9' },
      { label: t('hour10'), value: '10' },
      { label: t('hour11'), value: '11' },
      { label: t('hour12'), value: '12' },
      // Add more options as needed
    ]);
    const [minHour, setMinHour] = useState(null);
    const [maxHour, setMaxHour] = useState(null);

    const [openMinHour, setOpenMinHour] = useState(false); // Add this state
    const [openMaxHour, setOpenMaxHour] = useState(false); // Add this state
  
  const handleMaxHourChange = (item) => {
    // const selectedMaxHour = parseInt(item.value, 10);
    const selectedMaxHour = item();
    if ((!minHour) || selectedMaxHour < minHour) {
      setMaxHourError(true);
      showDanger(t('hoursError'))
      setMaxHour(null);
    } else {
      setMaxHourError(null); // Clear the error message if validation passes
      setMaxHour(selectedMaxHour);
    }
  };
  const handleMinHourChange = (minHour) => {
    // Update the "From" value
    setMinHour(minHour);

    // Automatically set "To" to zero when "From" is changed
    setMaxHour(null);
  };


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
        selectionLimit:3
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
        // setImageData(response.assets)
        checkArray(response.assets)

        
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
          // setImageData(response.assets)
          checkArray(response.assets)
          
        });
      }
      
    };
  const checkArray = value => {
    for (let i = 0; i < value.length; i++) {
      setImageData(prev => {
        return [...prev, value[i]];
      });
    }
  };
  const handleRemove = (index) => {
    const updatedImageData = [...imageData];
    updatedImageData.splice(index, 1);
    setImageData(updatedImageData);
  };
  const handleContinue = () => {
    if(
      !craftName ||
      !gustCapacity ||
      !rent ||
      !minHour  ||
      !maxHour  ||
      !value  ||
      !discription ||
      imageData.length < 1 
    ){
      showDanger(t('emptyField'))
    }
    else
    {
      navigation.navigate(BOAT_TYPE, {
        data: {
          craftName: craftName,
          gustCapacity: gustCapacity,
          rent: rent,
          discription: discription,
          minHour: minHour,
          maxHour: maxHour,
          craftType: value,
          craftImages: imageData
        }
      })
    }
  }
    return (
    <View style={styles.container}>
        <Header
            title={t('boatResume')}
            rightText={"1/4"}
        />
        <HorizontalLine
          label={"1"}
          leftCircleColor={"#FFFFFF"}
          leftLineColor={"#FFFFFF"}
        />
        <TextHeader title={t('addMoreInfo')} />


        <ScrollView 
        style={styles.innerContainer} 
        scrollEnabled={(openMinHour || openMaxHour) ? false : true }
        nestedScrollEnabled ={true}
        >
        <Text style={styles.mainLabel}>{t('watercraftType')}</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            zIndex={100}
            setValue={setValue}
            setItems={setItems}
            placeholder={t('watercraftType')}
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
        <Input
          marginTop={hp(1)}
          label={t('craftName')}
          placeHolder={t('craftName')}
          value={craftName}
          onChangeText={(text) => {setCraftName(text)}}
        />

        <Input
          marginTop={hp(1)}
          label={t('gustCapacity')}
          placeHolder={t('gustCapacity')}
          value={gustCapacity}
          onChangeText={(text) => {setGustCapacity(text)}}
        />
        <Input
          marginTop={hp(1)}
          label={t('rendPerHour')}
          placeHolder={t('rendPerHour')}
          value={rent}
          onChangeText={(text) => {setRent(text)}}
        />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1000 }}>
        <View>
            <Text style={styles.mainLabel}>{t('minHours')}</Text>
            <DropDownPicker
              open={openMinHour}
              value={minHour}
              items={hours}
              setOpen={setOpenMinHour}
              setValue={handleMinHourChange}
              setItems={setHours}
              placeholder={t('minHours')}
              placeholderStyle={{color:colors.placeholder}}
              style={{ borderColor: colors.primaryColor, borderRadius: wp(1.1), width:wp(45)}}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}

              dropDownContainerStyle={{
                position: 'relative',
                top: 0
              }}
           />
          </View>

          <View>
            <Text style={styles.mainLabel}>{t('maxHours')}</Text>
              <DropDownPicker
                open={openMaxHour}
                value={maxHour}
                items={hours}
                setOpen={setOpenMaxHour}
                setValue={handleMaxHourChange}
                setItems={setHours}
                placeholder={t('maxHours')}
                placeholderStyle={{ color: colors.placeholder }}
                style={[
                  {
                    borderColor: colors.primaryColor,
                    borderRadius: wp(1.1),
                    width: wp(45),
                  },
                  maxHourError ? { borderColor: 'red' } : null,
                ]}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}

                dropDownContainerStyle={{
                  position: 'relative',
                  top: 0
                }}
              />
          </View>
        </View>

        <Input
          label={t('addDescripiton')}
          placeHolder={t('addDescripiton')}
          marginTop={hp(1)}
          value={discription}
          multiLine
          onChangeText={(text) => {setDiscription(text)}}
        />

        <Text style={styles.mainLabel}>{t('addImageLabel')}</Text>

        <TouchableOpacity 
          onPress={() => {showAlert()}}
          style={styles.addImageView}>
          <Image source={icons.plusIcon}style={{width:wp(6), height:wp(6)}} />
          <Text style={styles.addImageText}>{t('addImage')}</Text>
          <Text style={styles.addImageBottomText}>(png.jpg.pdf)</Text>
        </TouchableOpacity>
        {
          imageData?.length > 0 && (
            <View style={styles.imagesContainer}>
            {
              imageData?.map((item,index)=>{
                return(
                  <View style={styles.listImages} key={index.toString()}>
                    <Image 
                      source={{uri: item?.uri}}
                      style={styles.listImage}
                    />
                    <TouchableOpacity onPress={()=>handleRemove(index)} style={styles.crossContainer}>
                      <Image 
                        source={icons.cross}
                        style={styles.crossIcon}
                      />
                    </TouchableOpacity>
                  </View>
                )
            })}
            </View>
            )
        }
        <Button
          label={t('continue')}
          marginTop={hp(2)}
          onPress={handleContinue}
        />

        </ScrollView>
    </View>
  )
}

export default AddBoatForm