import { View, Text, Image, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import images from '../../../assets/images/images';
import Header from '../../../component/Header';
import { useSelector } from 'react-redux';
import Config from '../../../../utils/config';

const Gallery = () => {
  const navigation = useNavigation();
  const[visible,setVisible]=useState(false)
  const[modalImage,setModalImage]=useState(null)
  const imageArray = useSelector(state=> state.data.gallery)
  // const imageArray=[ 
  //   images.ForgetPasswordImage,
  //   images.creatNewPsswordImage,
  //   images.loginAs,
  //   images.loginImage,
  //   images.otpScreen,
  //   images.ForgetPasswordImage,
  //   images.creatNewPsswordImage,
  //   images.loginAs,
  //   images.loginImage,
  //   images.otpScreen,
  //   images.loginAs,

  // ]
  const handleImageView=(item)=>{
    setModalImage(item)
    setVisible(true)
  }
  
  return (
    <View style={styles.container}>
      <Header 
        title={'Gallery'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.row, {flexWrap:'wrap'}]}> 
        {imageArray.map((item, index) => (
          index % 3 === 0 ?
          <TouchableOpacity 
            onPress={()=>handleImageView(item)}
            key={index.toString()}
            style={styles.fullWidthImage}   
          >
            <FastImage
              source={{ uri: Config.BASE_URL + item?.image }}
              style={styles.image}
            />
          </TouchableOpacity>  
          :
          <TouchableOpacity 
            onPress={()=>handleImageView(item)}
            key={index.toString()} 
            style={styles.halfWidthImage}
          >
            <FastImage
              source={{ uri: Config.BASE_URL + item?.image }}
              style={styles.image}
            />
          </TouchableOpacity>  
          ))}
        </View>
      </ScrollView>
      <Modal visible={visible} transparent>
        <TouchableWithoutFeedback onPress={()=>setVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <FastImage
                source={{ uri: Config.BASE_URL + modalImage?.image }}
                style={styles.image}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default Gallery