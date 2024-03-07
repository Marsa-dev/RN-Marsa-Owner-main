import React, { useEffect } from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import images from '../../../../assets/images/images';
import fontsSize from '../../../../assets/fontsSize/fontsSizes';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';
import Button from '../../../../component/Button';
import { HOME } from '../../../../constants/Navigators';

const BookingConfirmed = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            return true; 
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            backHandler.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image source={images.logo} style={styles.image} />
            <Text style={styles.title}>
                Your request has been sent successfully!
            </Text>
            <View style={styles.button}>
                <Button
                    label={'Back to home'}
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: HOME }],
                        })
                    }
                />
            </View>
        </View>
    );
};

export default BookingConfirmed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: wp(60),
        height: hp(20),
        resizeMode: 'contain',
    },
    title: {
        width: wp(60),
        fontSize: fontsSize.px_18,
        color: colors.primaryColor,
        fontFamily: fonts.regular,
        fontWeight: '600',
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: hp(2),
    },
});
