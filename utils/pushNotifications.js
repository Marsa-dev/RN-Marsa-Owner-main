import React from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { fcm_Token } from '../src/redux/action/Action';

export const notificationPopupRef = React.createRef(null);

export async function requestUserPermission() {
  console.log("CALL");
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status for request:', authStatus, enabled);
        return getFcmToken()
    }
}

const getFcmToken = async () => {
  if(Platform.OS === 'ios'){
    const messaging = firebase.messaging();

    const registerDeviceForRemoteMessages = async () => {
      let checkToken = await AsyncStorage.getItem('fcmToken')
      console.log("the old token", checkToken)
      if(!checkToken){
        try {
          await messaging.registerDeviceForRemoteMessages();
          console.log('Device registered for remote messages');
          const fcmToken = await messaging.getToken();
          console.log('FCM token:', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken)
          dispatch(fcm_Token(fcmToken));
          return fcmToken;
        } catch (error) {
          console.error('Error registering device for remote messages:', error);
          return null;
        }
      }
      else{
        return checkToken

      }

    };
    
    
    const fcmToken = await registerDeviceForRemoteMessages();
    if (fcmToken) {
      // do something with the FCM token
      return fcmToken
    }
  
  }
  else{
    let checkToken = await AsyncStorage.getItem('fcmToken')
    console.log("the old token", checkToken)
    if (!checkToken) {
        try {
            const fcmToken = await messaging().getToken()
            if (!!fcmToken) {
                console.log("fcme token generated", fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken)
                
                return fcmToken;
            }
        } catch (error) {
            console.log("error in fcmToken", error)
            alert("Please check your internet connection")
        }
    }
    else return checkToken;
  }


}

export const notificationListener = async (setRouteName) =>{
  // const navigation = useNavigation();

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage?.notification
        );
          console.log("backgrund state",remoteMessage?.notification)  
      });
      messaging().onMessage(remoteMessage => {
        console.log('A new FCM message arrived!',remoteMessage);
        if(remoteMessage?.notification?.title || remoteMessage?.notification?.body) {
          notificationPopupRef?.current?.show({
            // onPress: function () {
            //   console.log('Pressed');
            //   navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN');
            // },
            title: remoteMessage?.notification?.title,
              body: remoteMessage?.notification?.body,
              soundName:'default',
              vibrate: true,
              slideOutTime: 5000
          });

          // setRouteName(remoteMessage.notification?.title );
        }
      });

      messaging().setBackgroundMessageHandler(remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        if(remoteMessage?.notification?.title || remoteMessage?.notification?.body) {
          notificationPopupRef?.current?.show({
              // onPress: function () {
              //   console.log('Pressed');
              //   navigation.navigate('BEFORE_BOOKING_DETAILSSCREEN');
              // },
              title: remoteMessage?.notification?.title,
              body: remoteMessage?.notification?.body,
              soundName:'default',
              vibrate: true,
              slideOutTime: 5000
            });
        }
      });

      // Check whether an initial notification is available
      messaging()
      .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            // console.log(
            //   'Notification caused app to open from quit state:',
            //   remoteMessage
            // );
            console.log("remote message Details",remoteMessage.data)  
            setRouteName(remoteMessage.data?.type);
            if(remoteMessage.data?.type === "BEFORE_BOOKING_DETAILSSCREEN"){
              AsyncStorage.setItem("BookingInfo", remoteMessage.data.booking)
            }
            if(remoteMessage.data?.type === "AFTER_SCREEN"){
              AsyncStorage.setItem("BeforePicture", remoteMessage.data.booking)
            }
          }
        })

}