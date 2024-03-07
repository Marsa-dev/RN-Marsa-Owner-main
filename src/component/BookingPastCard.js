import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../assets/icons/icons';
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';
import Button from './Button';
import moment from 'moment';
import Config from '../../utils/config';
import { useTranslation } from 'react-i18next';
const BookingPastCard = ({
    image,
    title,
    location,
    date,
    time,
    status
}) => {
    const {t} = useTranslation()
    return (
        <View style={styles.container}>
            <View style={styles.con1}>
                <Image source={{uri: Config.BASE_URL + image}} resizeMode='cover' style={styles.image} />
            </View>
            <View style={styles.con2}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.locationIcon}>
                    <Image
                        source={icons.location}
                        style={{ height: wp(12), width: wp(3.2), resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1} style={styles.location}>{location}</Text>
                </View>
                <View style={styles.locationIcon}>
                    <Image
                        source={icons.calander}
                        style={{ height: wp(12), width: wp(3.2), resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1} style={styles.time}>{moment(date).format('MMM DD')}  {time} {t('hours')}</Text>
                </View>
                {/* <Text style={styles.time}>{time}</Text> */}
            </View>
            <View style={styles.Button}>
                {
                    status === 'accepted' ?
                        <Button
                            label={t('accepted')}
                            width={'100%'}
                            height={hp(3.5)}
                            textSize={fontsSize.px_10}
                            backgroundColor={colors.green}
                            disabled
                        />
                        :
                        status === 'pending' ?
                            <Button
                                label={t('pending')}
                                width={'100%'}
                                height={hp(3.5)}
                                textSize={fontsSize.px_10}

                                disabled
                            />
                            :
                            status === 'rejected' ?
                                <Button
                                    label={t('rejected')}
                                    width={'100%'}
                                    height={hp(3.5)}
                                    textSize={fontsSize.px_10}

                                    backgroundColor={colors.red}
                                    disabled
                                />
                                :
                                <Button
                                    label={t('completed')}
                                    width={'100%'}
                                    height={hp(3.5)}
                                    textSize={fontsSize.px_10}

                                    backgroundColor={colors.secondryColor}
                                    disabled
                                />
                }
            </View>

        </View>
    )
}

export default BookingPastCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center'
    },
    con1: {
        
    },
    con2: {
        marginLeft:wp(2),
    },
    title: {
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular,
        width: wp(48),
        marginBottom: 2
    },
    location: {
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        marginLeft: wp(3)
    },
    locationIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        height: wp(5)
    },
    time: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        marginLeft:wp(3)
    },
    price: {
        fontSize: fontsSize.px_20,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular
    },
    image: {
        // width: '100%',
        height: wp(17),
        aspectRatio:1,
        borderRadius: wp(1.1)
    },
    buttonText: {
        fontSize: wp(3),
        color: colors.white
    },
    Button: {
        position: 'absolute',
        width: wp(18),
        right: 0,
        top: 0,
        borderRadius: wp(1.1),
        justifyContent: 'center',
        alignItems: 'center'
    },
})