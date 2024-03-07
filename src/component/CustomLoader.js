import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  UIActivityIndicator,
  } from 'react-native-indicators';
import colors from '../assets/colors/colors';
// import fontsSize from '../../assets/fontsSize/fontsSizes';
const CustomLoader = ({ isVisible }) => {
    return (
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.container}>
          <UIActivityIndicator color={colors.primaryColor} size={hp(6)} />
        </View>
      </Modal>
    );
}

export default CustomLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
})