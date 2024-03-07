import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../component/Header'
import icons from '../../../assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import PaymentComponent from '../../../component/PaymentComponent'
import images from '../../../assets/images/images'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../component/Button'
import fontsSize from '../../../assets/fontsSize/fontsSizes'
import { PAYMENT_INFORMATION } from '../../../constants/Navigators'
import colors from '../../../assets/colors/colors'
import fonts from '../../../assets/fonts/fonts'

const PaymentMethods = ({route}) => {
    console.log("PAYMENT METHOD ",route?.params?.data);
    let data = route?.params?.data
    const navigation = useNavigation()
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [payment, setPayment] =useState([
        {
            title:'mada',
            icon: images.mada
        },
        {
            title:'Visa / Mastercard',
            icon: images.visa
        },
        {
            title:'Apple Pay',
            icon: images.applePay
        }
    ])
  return (
    <View style={styles.container}>
        <Header 
            title={"Payment Methods"} 
            leftIcon={icons.backArrow}
            leftIconPress={() => {navigation.goBack()}}
        />
        <FlatList
            data={payment}
            renderItem={(item) => {
            return (
                <PaymentComponent
                    marginTop={hp(2)}
                    rightIcon={selectedIndex === item.index ? icons.fillCircle : icons.EmptyCircle}
                    title={item.item.title}
                    leftIcon={item.item.icon}
                    onPress={() => {setSelectedIndex(item.index)}}
                />  
            )
            }}
        />
        
        <View style={styles.totalPriceView}>
            <View style={{flex:0.5,flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:fontsSize.px_14, color:colors.secondryColor, fontFamily:fonts.regular}}>
                    Total <Text style={{fontSize:fontsSize.px_20, color:colors.primaryColor, fontFamily:fonts.semiBold}}>{data?.totalAmount}</Text>
                </Text>

            </View>
            <View style={{flex:0.5}}>
                <Button 
                    label={"Process payment"} 
                    width={wp(45)}
                    onPress={() => {navigation.navigate(PAYMENT_INFORMATION,{
                        data: data
                    })}}
                />
            </View>
        </View>
    </View>
  )
}

export default PaymentMethods