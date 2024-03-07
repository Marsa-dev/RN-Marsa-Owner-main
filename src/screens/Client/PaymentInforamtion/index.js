import { View, Text, FlatList, Alert, Linking, TouchableOpacity, Modal, ScrollView, Image, SafeAreaView } from 'react-native'
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
import LeftRightText from '../../../component/LeftRightText'
import fonts from '../../../assets/fonts/fonts'
import colors from '../../../assets/colors/colors'
import { BOOKING_COMPLETE, HOME } from '../../../constants/Navigators'
import Input from '../../../component/Input'
import { sendPayment } from '../../../api/Httpservice'
import { showDanger } from '../../../../utils/FlashMessage'
import { showMessage } from 'react-native-flash-message'
import { WebView } from 'react-native-webview';
import CustomLoader from '../../../component/CustomLoader'

const PaymentInforamtion = ({ route }) => {
  const payments = route?.params?.data
  // Add regex patterns for validation
  const cardNumberPattern = /^[0-9]{16}$/; // 16-digit card number
  const cardNamePattern = /^[a-zA-Z ]+$/; // Only alphabets and spaces for card name
  const expirationDatePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // MM/YY format
  const cvcPattern = /^[0-9]{3}$/; // 3-digit CVC

  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [webUrl, setWebUrl] = useState('')
  const [payment, setPayment] = useState([
    {
      title: 'mada',
      icon: images.mada
    },
    {
      title: 'Visa / Mastercard',
      icon: images.visa
    },
    {
      title: 'Apple Pay',
      icon: images.applePay
    }
  ])

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvc: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    cardNumberError: '',
    cardNameError: '',
    expirationDateError: '',
    cvcError: '',
  });
  const validateCardNumber = (text) => {
    if (!cardNumberPattern.test(text)) {
      setValidationErrors((prev) => ({
        ...prev,
        cardNumberError: 'Invalid card number',
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        cardNumberError: '',
      }));
    }
  };

  const validateCardName = (text) => {
    if (!cardNamePattern.test(text)) {
      setValidationErrors((prev) => ({
        ...prev,
        cardNameError: 'Invalid card name',
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        cardNameError: '',
      }));
    }
  };

  const validateExpirationDate = (text) => {
    if (!expirationDatePattern.test(text)) {
      setValidationErrors((prev) => ({
        ...prev,
        expirationDateError: 'Invalid expiration date (MM/YY)',
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        expirationDateError: '',
      }));
    }
  };

  const validateCVC = (text) => {
    if (!cvcPattern.test(text)) {
      setValidationErrors((prev) => ({
        ...prev,
        cvcError: 'Invalid CVC',
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        cvcError: '',
      }));
    }
  };


  const handleSubmit = () => {

    if (validationErrors.cardNameError === ''
      && validationErrors.cardNumberError === ''
      && validationErrors.expirationDateError === ''
      && validationErrors.cvcError === '') {
      setLoading(true)
      const [expirationMonth, expirationYear] = cardInfo.expirationDate.split('/');
      let paymentData = {
        "bookingId": payments?._id,
        "source": {
          "type": "creditcard",
          "name": cardInfo.cardName,
          number: cardInfo.cardNumber,
          year: expirationYear,
          month: expirationMonth,
          cvc: cardInfo.cvc,
        }
      }
      sendPayment(paymentData, "payment")
        .then((res) => {
          console.log(res);
          if (res?.success === false) {
            setLoading(false)
            showDanger("Something went wrong")
          }
          else {
            setLoading(false)
            showMessage("Success!");
            setWebUrl(res.data)
            // openURI(res.data)
             toggleModal()
          }
        })
        .catch((err) => {
          setLoading(false)
          console.log(err);
        })
    }
    else {
      showDanger("Please enter valid information");
    }
  }

  const handleWebViewError = (error) => {
    console.error('WebView error:', error);
    // You can display an error message or take other actions here.
  };

  const openURI = async (openURL) => {
    const url = openURL
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>

      <ScrollView style={{ flex: 0.8 }}>
        <Header
          title={"Payment Information"}
          leftIcon={icons.backArrow}
          leftIconPress={() => { navigation.goBack() }}
        />

        <LeftRightText
          leftText={"Charges payable now"}
          leftfontFamily={fonts.semiBold}
          leftfontSize={fontsSize.px_16}
          leftTextColor={colors.primaryColor}
        />

        {/* <LeftRightText 
            marginTop={hp(2)}
            leftText={"Boat"}
            rightText={"+ $1,200"}
            leftfontFamily={fonts.regular}
            leftTextColor={colors.secondryColor}
            rightTextColor={colors.secondryColor}
            leftfontSize={fontsSize.px_16}
            rightfontFamily={fonts.regular}
            rightfontSize={fontsSize.px_16}
        />


        <LeftRightText
            marginTop={hp(2)}
            leftText={"Service fee"}
            rightText={"+ $200"}
            leftfontFamily={fonts.regular}
            leftTextColor={colors.secondryColor}
            rightTextColor={colors.secondryColor}
            leftfontSize={fontsSize.px_16}
            rightfontFamily={fonts.regular}
            rightfontSize={fontsSize.px_16}
        />

        <LeftRightText
            marginTop={hp(2)}
            leftText={"Security fee"}
            rightText={"+ $200"}
            leftfontFamily={fonts.regular}
            leftTextColor={colors.secondryColor}
            rightTextColor={colors.secondryColor}
            leftfontSize={fontsSize.px_16}
            rightfontFamily={fonts.regular}
            rightfontSize={fontsSize.px_16}
        /> */}

        <LeftRightText
          marginTop={hp(2)}
          leftText={"Total Payment"}
          rightText={`$ ${payments?.totalAmount}`}
          leftfontFamily={fonts.semiBold}
          leftTextColor={colors.primaryColor}
          rightTextColor={colors.primaryColor}
          leftfontSize={fontsSize.px_20}
          rightfontFamily={fonts.semiBold}
          rightfontSize={fontsSize.px_20}
        />

        <PaymentComponent
          marginTop={hp(2)}
          rightIcon={icons.fillCircle}
          title={payment[selectedIndex].title}
          leftIcon={payment[selectedIndex].icon}
        // onPress={() => {setSelectedIndex(item.index)}}
        />

        <Input
          marginTop={hp(2)}
          label={"Card information"}
          placeHolder={"Card number"}
          // onChangeText={handleCardNumberChange}
          onChangeText={(text) => {
            setCardInfo((prev) => {
              return {
                ...prev,
                cardNumber: text
              };
            });
            validateCardNumber(text);
          }}
          value={cardInfo.cardNumber}
        />
        {validationErrors.cardNumberError &&
          <Text style={styles.error}>{validationErrors.cardNumberError}</Text>
        }


        <Input
          marginTop={hp(1)}
          placeHolder={"Candidate name"}
          // onChangeText={handleCardNameChange}
          onChangeText={(text) => {
            setCardInfo((prev) => {
              return {
                ...prev,
                cardName: text
              };
            });
            validateCardName(text);
          }}
          value={cardInfo.cardName}
        />
        {validationErrors.cardNameError &&
          <Text style={styles.error}>{validationErrors.cardNameError}</Text>
        }

        <View style={{ flexDirection: 'row', width: wp(100), paddingHorizontal: wp(4), justifyContent: 'space-between' }}>
          <Input
            marginTop={hp(1)}
            width={wp(45)}
            placeHolder={"MM/YY"}
            //   onChangeText={handleExpirationDateChange}
            onChangeText={(text) => {
              setCardInfo((prev) => {
                return {
                  ...prev,
                  expirationDate: text
                };
              });
              validateExpirationDate(text);
            }}
            value={cardInfo.expirationDate}
          />

          <Input
            marginTop={hp(1)}
            width={wp(45)}
            placeHolder={"CVC"}
            //   onChangeText={handleCVCChange}
            onChangeText={(text) => {
              setCardInfo((prev) => {
                return {
                  ...prev,
                  cvc: text
                };
              });
              validateCVC(text);
            }}
            value={cardInfo.cvc}
          />
        </View>
        <View style={{ flexDirection: 'row', width: wp(100), paddingHorizontal: wp(4), justifyContent: 'space-between' }}>
          <View style={{ flex: 0.5 }}>
            {validationErrors.expirationDateError &&
              <Text style={styles.error}>{validationErrors.expirationDateError}</Text>
            }
          </View>
          <View style={{ flex: 0.5 }}>
            {validationErrors.cvcError &&
              <Text style={styles.error}>{validationErrors.cvcError}</Text>
            }
          </View>
        </View>

      </ScrollView>
      <View style={styles.totalPriceView}>
        <Button
          label={"Process payment"}
          onPress={handleSubmit}
        // onPress={openURI}
        // onPress={() => {navigation.navigate(BOOKING_COMPLETE)}}
        />
      </View>

      {
        isModalVisible ?

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => toggleModal()}
            style={{ flex: 1 }}
          >
            <SafeAreaView style={{ flex: 1, }}>
              <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', paddingHorizontal: wp(4), }}
                onPress={() => [
                  toggleModal(),
                  navigation.reset({
                    index: 0,
                    routes: [
                    { name: BOOKING_COMPLETE,
                      data:payments
                    }
                    ],
                  })
                 
                ]}>
                <Image source={icons.backArrow} style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <WebView
                source={{ uri: webUrl }}
                style={{ flex: 0.9 }}
                // onError={handleWebViewError}
              />
            </SafeAreaView>
          </Modal>

          : null
      }
      <CustomLoader isVisible={loading} />
    </View>
  )
}

export default PaymentInforamtion