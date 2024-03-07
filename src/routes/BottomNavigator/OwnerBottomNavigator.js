import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet,Text } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

///////////////////////////////////////////////////////////////////////////
import icons from '../../assets/icons/icons';

import {
  // CHAT_SCREEN,
  DASHBOARD,
  BOOKINGS,
  DESTINATIONS,
  GALLERY,
  PROFILE,
  OWNER_DASHBOARD,
  OWNER_BOAT_LOCATION,
  OWNER_MY_WALLET
} from '../../constants/Navigators';
import colors from '../../assets/colors/colors';
import Profile from '../../screens/Client/Profile';
import fontsSize from '../../assets/fontsSize/fontsSizes';
import fonts from '../../assets/fonts/fonts';
import Owner_Dashboard from '../../screens/Owner/DashboardScreen';
import BoatLocation from '../../screens/Owner/BoatLocation';
import MyWallet from '../../screens/Owner/MyWallet';
import { useTranslation } from 'react-i18next';

//////////////////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();

export default function OwnerBottomNavigator() {
  const {t} = useTranslation()
  return (
    <Tab.Navigator
      screenOptions={({route})=> ({
        tabBarLabelStyle:styles.tabLabel,
        tabBarLabel: ({ focused, color }) => {
          const labelTextStyle = focused
            ? [styles.tabLabel, styles.activeTabLabel]
            : [styles.tabLabel];
          return <Text style={labelTextStyle}>{route.name}</Text>;
        },
        headerShown: false,
        tabBarStyle: {
          alignContent: 'center',
          height: hp(6.5),
          paddingBottom: wp(1.5),
          paddingHorizontal: wp(0),
          backgroundColor: colors.primaryColor,
        },
      })}>
      <Tab.Screen
        name={OWNER_DASHBOARD}
        component={Owner_Dashboard}
        options={{

          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.Home : icons.Home}
              style={styles.icon}
              resizeMode="contain"
            />,
            tabBarLabel: ({ focused }) => (
              <Text 
              style={{ 
                textDecorationLine: focused ? 'underline' : 'none',
                color:'white', 
                fontSize:wp(3) 
              }}>
                {t('explore')}
              </Text>
            ),

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name={OWNER_BOAT_LOCATION}
        component={BoatLocation}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={icons.boatLocation}
              style={styles.icon}
              resizeMode="contain"
            />,
            tabBarLabel: ({ focused }) => (
              <Text 
              style={{ 
                textDecorationLine: focused ? 'underline' : 'none',
                color:'white', 
                fontSize:wp(3) 
              }}>
                {t('boatLocation')}
              </Text>
            ),
        }}
      >
      </Tab.Screen>


      <Tab.Screen
        name={OWNER_MY_WALLET}
        component={MyWallet}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={icons.MyWallet}
              style={styles.icon}
              resizeMode="contain"
            />,
            tabBarLabel: ({ focused }) => (
              <Text 
              style={{ 
                textDecorationLine: focused ? 'underline' : 'none',
                color:'white', 
                fontSize:wp(3) 
              }}>
                {t('myWallet') }
              </Text>
            )
        }}
      >
      </Tab.Screen>



      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.profile : icons.profile}
              style={styles.icon}
              resizeMode="contain"
            />,
            tabBarLabel: ({ focused }) => (
              <Text 
              style={{ 
                textDecorationLine: focused ? 'underline' : 'none',
                color:'white', 
                fontSize:wp(3) 
              }}>
                {t('profile')}
              </Text>
            ),
        }}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: wp(5),
    height: hp(2.5),
  },
  activeIcon: {
    width: wp(4.5),
    height: hp(2.5),
    tintColor: colors.green
  },
  tabLabel: {
    color: colors.white,
    fontSize: fontsSize.px_8,
    fontFamily: fonts.regular,
  },
  activeTabLabel: {
    textDecorationLine: 'underline', // Underline for the active tab
  },
});
