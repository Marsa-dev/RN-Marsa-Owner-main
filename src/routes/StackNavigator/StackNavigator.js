import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  SPLASH_SCREEN,
  ON_BOARDING,
  LOGIN_SCREEN,
  SIGNUP_SCREEN,
  OTP_SCREEN,
  FORGOT_PASSWORD,
  CREATE_NEW_PASSWORD_SCREEN,
  HOME,
  BOAT_DETAIL_SCREEN,
  PROFILE_INFO_SCREEN,
  TERM_AND_PRIVACY_POLICY_SCREEN,
  BOOKING_DETAIL_SCREEN,
  LOGIN_ROLE,
  BOATS,
  WISHLIST,
  PAYMENT_METHODS,
  PAYMENT_INFORMATION,
  BOOKING_COMPLETE,
  BOOKING_FORM,
  OWNER_HOME,
  OWNER_BOOKING_DETAILS,
  ADD_BOAT_FORM,
  BOAT_TYPE,
  BOAT_EXPERIENCE,
  CAPTAIN_LICENSE,
  SCAN_LICENSE,
  CONTACT_DETAIL,
  BOOKING_CONFIRMED,
  SEND_PICKUP_LOCATION,
  VIEW_BOAT_LOCATION,
} from '../../constants/Navigators';
import OnBoarding from '../../screens/onBoarding';
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import SignUpScreen from '../../screens/Auth/SignUpScreen';
import OtpScreen from '../../screens/Auth/OtpScreen';
import CreateNewPasswordScreen from '../../screens/Auth/CreateNewPasswordScreen';
import ForgotPassword from '../../screens/Auth/ForgotPassword';

import BoatDetailScreen from '../../screens/Client/BoatDetailScreen';
import ProfileInfoScreen from '../../screens/Client/ProfileInfoScreen';
import TermsAndPrivacyPolicy from '../../screens/Client/Terms&PrivacyPolicyScreen';
import LoginRole from '../../screens/Auth/LoginRole';

import BookingDetailScreen from '../../screens/Client/BookingDetailScreen';
import Boats from '../../screens/Client/Boats';
import Wishlist from '../../screens/Client/Wishlist';
import PaymentMethods from '../../screens/Client/PaymentMethods';
import PaymentInforamtion from '../../screens/Client/PaymentInforamtion';
import BookingComplete from '../../screens/Client/BookingComplete';
import BottomNavigator from '../BottomNavigator/BottomNavigator';

// Owner Side
import Owner_BookingDetails from '../../screens/Owner/BookingDetails';

//owner add Boat
import AddBoatForm from '../../screens/Owner/AddBoat/AddBoatForm';
import BoatType from '../../screens/Owner/AddBoat/BoatType';
import BoatExperience from '../../screens/Owner/AddBoat/BoatExperience';
import CaptainLicense from '../../screens/Owner/AddBoat/CaptainLicense';
import ScanLicense from '../../screens/Owner/AddBoat/ScanLicense';

import BookingForm from '../../screens/Client/Create Booking/BookingForm';
import ContactDetail from '../../screens/Client/Create Booking/Contact Detail';
import BookingConfirmed from '../../screens/Client/Create Booking/BookingConfirmed';
import OwnerBottomNavigator from '../BottomNavigator/OwnerBottomNavigator';
import SendPickUpLocation from '../../screens/Owner/SendPickUpLocation';
import ViewBoatLocation from '../../screens/Client/ViewBoatLocation';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
    },
  };
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={SPLASH_SCREEN}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ON_BOARDING} component={OnBoarding} />
        <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={LOGIN_ROLE} component={LoginRole} />
        <Stack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
        <Stack.Screen name={OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={CREATE_NEW_PASSWORD_SCREEN} component={CreateNewPasswordScreen} />
        <Stack.Screen name={HOME} component={BottomNavigator} />
        <Stack.Screen name={BOAT_DETAIL_SCREEN} component={BoatDetailScreen} />
        <Stack.Screen name={PROFILE_INFO_SCREEN} component={ProfileInfoScreen} />
        <Stack.Screen name={TERM_AND_PRIVACY_POLICY_SCREEN} component={TermsAndPrivacyPolicy} />
        <Stack.Screen name={BOOKING_DETAIL_SCREEN} component={BookingDetailScreen} />
        <Stack.Screen name={BOATS} component={Boats} />
        <Stack.Screen name={WISHLIST} component={Wishlist} />
        <Stack.Screen name={PAYMENT_METHODS} component={PaymentMethods} />
        <Stack.Screen name={PAYMENT_INFORMATION} component={PaymentInforamtion} />
        <Stack.Screen name={BOOKING_COMPLETE} component={BookingComplete} />
        <Stack.Screen name={BOOKING_FORM} component={BookingForm} />
        <Stack.Screen name={CONTACT_DETAIL} component={ContactDetail} />
        <Stack.Screen name={BOOKING_CONFIRMED} component={BookingConfirmed} />
        <Stack.Screen name={VIEW_BOAT_LOCATION} component={ViewBoatLocation} />


        {/* Owner Side */}
        <Stack.Screen name={OWNER_HOME} component={OwnerBottomNavigator} />
        <Stack.Screen name={OWNER_BOOKING_DETAILS} component={Owner_BookingDetails} />
        <Stack.Screen name={SEND_PICKUP_LOCATION} component={SendPickUpLocation} />

        <Stack.Screen name={ADD_BOAT_FORM} component={AddBoatForm} />
        <Stack.Screen name={BOAT_TYPE} component={BoatType} />
        <Stack.Screen name={BOAT_EXPERIENCE} component={BoatExperience} />
        <Stack.Screen name={CAPTAIN_LICENSE} component={CaptainLicense} />
        <Stack.Screen name={SCAN_LICENSE} component={ScanLicense} />

      

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
