import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../assets/icons/icons'
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';
import { useTranslation } from 'react-i18next';

const SearchBar = ({
    onChangeText,
    value
}) => {
    const {t} = useTranslation();
  return (
    <View style={styles.container}>
        <View style={{flex:0.1}}>
            <Image 
                source={icons.search}
                style={styles.icon}
            />
        </View>
        <TextInput 
            placeholder={t('search')}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={colors.placeholder}
            cursorColor={colors.primaryColor}
            style={styles.input}
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        height:hp(6.1),
        flexDirection:'row',
        alignItems:'center',
        borderRadius:wp(1.1),
        borderWidth:1,
        borderColor:colors.primaryColor,
        paddingHorizontal:wp(4),
        marginVertical:wp(2.5)
    },
    input:{
        color: colors.primaryColor, 
        fontSize: fontsSize.px_14,
        fontFamily:fonts.italic,
        flex:0.9
    },
    icon:{
        height:wp(4),
        width:wp(5),
        resizeMode:'contain',
    }
})