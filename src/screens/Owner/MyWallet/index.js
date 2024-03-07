import { View, Text, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../../../component/Header'
import styles from './style'
import Button from '../../../component/Button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import colors from '../../../assets/colors/colors'
import MonthEarningsComponent from '../../../component/MonthEarningsComponent'
import { useIsFocused } from '@react-navigation/native'
import { getTodayWalletData } from '../../../api/Httpservice'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
const MyWallet = () => {
    const isFocused = useIsFocused()
    const {t} = useTranslation();
    const [totalAmount, setTotalAmount] = useState(0)
    const [selectedButton, setSelectedButton] = useState(0)
    let buttons= [
        {
          id:0,
          title:t('today')
        },
        {
          id:1,
          title:t('monthly')
        },
        {
          id:2,
          title:t('yearly')
        }
      ]
      const [todayData, setTodayData] = useState([[]])
    
      const [monthlyData, setMonthlyData]= useState([])

      const [yearlyData, setYaerlyData]= useState([])
      

      useEffect(() => {
        if(isFocused) {
          getTodayData(),
          getMonthlyData(),
          getYearlyData()
        }
      },[isFocused])
      const getTodayData = () => {
        // getTodayWalletData("payment/getWalletBytoday")
        getTodayWalletData('payment/getWalletBytoday')
        .then((res) => {
          if(res.success) {
            // console.log(res);
            setTodayData(res?.bookings)
            setTotalAmount(res?.totalIncome)
          }
        })
      }

      const getMonthlyData = () => {
        getTodayWalletData('payment/getwalletbyMonth')
        .then((res) => {
          if(res.success) {
            // console.log(res);
            setMonthlyData(res?.bookings)
            setTotalAmount(res?.totalIncome)
          }
        })
      }


      const getYearlyData = () => {
        getTodayWalletData('payment/getWalletByYear')
        .then((res) => {
          if(res.success) {
            console.log(res);
            setYaerlyData(res?.bookingsByMonth)
            setTotalAmount(res?.totalIncome)
          }
        })
      }

      const renderItem = (item) => {
        return (
          <MonthEarningsComponent
                date={t('start') + moment(item.item.bookingStartTime).format("hh:mm A")}
                totalBookings={t('end') +moment(item.item.bookingEndTime).format("hh:mm A")}
                price={item.item.totalAmount}
           />
            // <TodayEarningsComponent 
            //     // tripFee={item.item.TripFares} 
            //     // serviceFee={item.item.ServiceFee} 
            //     totalPrice={item.item.totalAmount + " SAR"}
            // />
        )
      }

      const renderMonthlyData = (item) => {
        return (
           <MonthEarningsComponent
                date={moment(item.item.date).format("ddd,DD MMM")}
                totalBookings={item.item.noOfBookings + " " + t('bookings')}
                price={item.item.totalAmount}
           />
        )
      }

      const renderYearlyData = (item) => {
        return (
           <MonthEarningsComponent
                date={moment(item.item.date).format("MMMM")}
                totalBookings={item.item.noOfBookings + " " + t('bookings')}
                price={item.item.totalAmount}
           />
        )
      }


  return (
    <View style={{flex:1}}>
      <Header title={t('myWallet')} />

    <View style={styles.boxMainView}>
        <View style={styles.boxView}>
            <Text style={styles.textTitle}>{t('totalBalance')}</Text>
            <Text style={styles.textNum}> {totalAmount} {t('sar')}</Text>
        </View>
    </View>
    <View style={{marginVertical:hp(2), paddingHorizontal:wp(4)}}>
        <FlatList
            horizontal
            data={buttons}
            contentContainerStyle={{justifyContent:'space-between', flex:1}}
            renderItem={(item, index) => {
            return(
                <Button
                    width={wp(28)}
                    borderRadius={wp(15)}
                    label={item.item.title}
                    borderWidth={2}
                    borderColor={colors.primaryColor}
                    textColor={selectedButton === item.item.id ? colors.white: colors.primaryColor}
                    backgroundColor={selectedButton === item.item.id ? colors.primaryColor: colors.white}
                    textSize={wp(4)}
                    height={hp(4)}
                    onPress={() => {setSelectedButton(item.item.id)}}
                />
            )
            }}
        />
    </View>

    
    <FlatList
        data={selectedButton === 0 ? todayData : selectedButton === 1 ? monthlyData: yearlyData}
        renderItem={selectedButton === 0 ? renderItem : selectedButton === 1 ? renderMonthlyData : renderYearlyData}
    />
    


    </View>
  )
}

export default MyWallet