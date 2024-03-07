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
  PROFILE
} from '../../constants/Navigators';
import colors from '../../assets/colors/colors';
import Dashboard from '../../screens/Client/Dashboard';
import Bookings from '../../screens/Client/Bookings';
import Destinations from '../../screens/Client/Destinations';
import Gallery from '../../screens/Client/Gallery';
import Profile from '../../screens/Client/Profile';
import fontsSize from '../../assets/fontsSize/fontsSizes';
import fonts from '../../assets/fonts/fonts';

//////////////////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
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
          height: hp(6.5),
          paddingBottom: wp(1.5),
          paddingHorizontal: wp(2),
          backgroundColor: colors.primaryColor,
        },
      })}>
      <Tab.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.Home : icons.Home}
              style={styles.icon}
              resizeMode="contain"
            />

        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name={BOOKINGS}
        component={Bookings}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.booking : icons.booking}
              style={styles.icon}
              resizeMode="contain"
            />
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name={DESTINATIONS}
        component={Destinations}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.destinations : icons.destinations}
              style={styles.icon}
              resizeMode="contain"
            />
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name={GALLERY}
        component={Gallery}
        options={{
          tabBarIcon: ({ focused }) =>
            <Image
              source={focused ? icons.gallery : icons.gallery}
              style={styles.icon}
              resizeMode="contain"
            />
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
            />
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
