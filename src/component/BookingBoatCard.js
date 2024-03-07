import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../assets/icons/icons';
import colors from '../assets/colors/colors';
import images from '../assets/images/images';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';
import Button from './Button';
import moment from 'moment';
import Config from '../../utils/config';
import { useTranslation } from 'react-i18next';
const BookingBoardCard = ({
    image,
    title,
    price,
    iconPress,
    guest,
    status,
    destination,
    time,
    date
}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.con1}>
                <Image source={{uri : Config.BASE_URL + image}} resizeMode='cover' style={styles.image} />
            </View>
            <View style={styles.con2}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.locationIcon}>
                    <Image 
                        source={icons.location}
                        style={{height:wp(12), width:wp(3.2), resizeMode:'contain'}}
                    />
                    <Text numberOfLines={1} style={styles.location}>{destination}</Text>
                </View>
                <Text numberOfLines={1} style={styles.time}>{moment(date).format("MMM DD YYYY")} {time} {i('hours')} {i('guest')}</Text>
                {/* <Text style={styles.time}>{time}</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.price}>${price}</Text>
                </View>
                <View style={styles.Button}>
                    {
                        status === 'accepted'? 
                            <Button
                                label={i('accepted')}
                                width={'100%'}
                                height={hp(3.5)}
                                textSize={fontsSize.px_10}
                                backgroundColor={colors.green}
                                disabled
                            />
                            :
                            status === 'pending' ?
                                <Button 
                                    label={i('pending')}
                                    width={'100%'}
                                    height={hp(3.5)}
                                    textSize={fontsSize.px_10}

                                    disabled
                                />
                            :
                            status === 'rejected' ?
                                <Button 
                                    label={i('rejected')}
                                    width={'100%'}
                                    height={hp(3.5)}
                                    textSize={fontsSize.px_10}

                                    backgroundColor={colors.red}
                                    disabled
                                />
                            :
                                <Button
                                    label={i('paid')}
                                    width={'100%'}
                                    height={hp(3.5)}
                                    textSize={fontsSize.px_10}

                                    backgroundColor={colors.secondryColor}
                                    disabled
                                />
                    }
                </View>
            </View>
            
        </View>
    )
}

export default BookingBoardCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    con1: {
        flex: 0.6,
    },
    con2: {
        flex: 0.4,
        // justifyContent:'space-between',
        paddingTop: hp(2)
    },
    title:{
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular,
        width:wp(50),
        marginBottom:2
    },
    location: {
        fontSize: fontsSize.px_14,
        color: colors.primaryColor,
        fontWeight: '400',
        fontFamily: fonts.regular,
        // marginBottom: 2
        marginLeft:wp(3)
    },
    locationIcon: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        height: wp(5) 
    },
    time: {
        fontSize: fontsSize.px_12,
        color: colors.primaryColor,
        fontWeight:'400',
        fontFamily: fonts.regular,
        marginBottom: 2
    },
    price: {
        fontSize: fontsSize.px_20,
        color: colors.primaryColor,
        fontWeight: '500',
        fontFamily: fonts.regular
    },
    buttonText: {
        fontSize: wp(3),
        color: colors.white
    },
    image: {
        width:'100%',
        height:hp(20),
        borderRadius:wp(1.1)
    },
    Button: {
        position: 'absolute',
        width:wp(25),
        right: wp(2.5),
        top: wp(2.5),
        backgroundColor: colors.white,
        borderRadius: wp(1.1),
        justifyContent: 'center',
        alignItems: 'center'
    },
})