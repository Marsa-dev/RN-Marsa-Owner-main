import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';
import icons from '../assets/icons/icons';
import Config from '../../utils/config';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
// import colors from '../../assets/colors/colors';
// import icons from '../../assets/icons/icons';

const ProfileInfo= ({
    name,
    icon,
    onPress,
    imageData
}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>                
                {
                    imageData !== undefined ?
                        <Image source={{ uri: `${imageData}` }}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                        :
                    icon != null ? 
                    <FastImage
                        source={{
                            uri: `${Config.BASE_URL}${icon}`,
                            priority: FastImage.priority.normal,
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: FastImage.resizeMode.cover,
                        }}
                    />
                    :
                    <Image source={icons.profileImage} style={styles.image} />
                    }
            </View>
            { name ? 
            null :
            <TouchableOpacity style={styles.chooseImage} onPress={onPress}>
                <Text style={styles.chooseImageText}>{t('chooseImage')}</Text>
            </TouchableOpacity>
            }
            <View style={styles.nameView}>
                <Text style={styles.nameText}>{name}</Text>
            </View>
            
        </View>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        alignItems: 'center',
    },
    imageView: {
        width:wp(30),
        height:wp(30),
        backgroundColor:'rgba(16, 31, 87, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:wp(20),
        overflow:'hidden',
        marginBottom:hp(1)
    },
    image: {
        width:'40%',
        height:'50%',
        resizeMode:'contain',
    },
    chooseImage: {
        marginTop:hp(1)
    },
    chooseImageText: {
        color:colors.primaryColor,
        fontFamily:fonts.regular,
        fontSize:fontsSize.px_14,
    },
    nameView : {
        marginTop:hp(1)
    },
    nameText : {
        fontSize:fontsSize.px_20,
        color:colors.primaryColor,
        fontFamily:fonts.semiBold
    }
})
