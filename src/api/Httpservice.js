import Config from '../../utils/config';
import {
  doHttpGet,
  doHttpPost,
  doHttpGetAfterLogin,
  doHttpMultipartwithPatch,
  doHttpMultipart
} from './HttpUtils';
// import messaging from '@react-native-firebase/messaging';

export const registeration = (data) => {
  return doHttpPost(data, 'auth/register' );
};

export const validateOTP = (data) => {
  return doHttpPost(data, 'auth/verify-email' );
};

export const resendOTP = (data) => {
  return doHttpPost(data, 'auth/resend-otp' );
};

export const forgetPassword = (data) => {
  return doHttpPost(data, 'auth/forgot-password' );
};
export const forgetPasswordValidate = (data) => {
  return doHttpPost(data, 'auth/verify-forgot-password' );
};

export const createNewPassword = (data) => {
  return doHttpPost(data, 'auth/reset-password' );
};

export const login = (data) => {
  return doHttpPost(data, 'auth/login' );
};
export const toggleFavourite = (data, endPoint) => {
  return doHttpPost(data, endPoint );
};
export const bookingData = (data, endPoint) => {
  return doHttpPost(data, endPoint );
};


export const getProfile = () => {
  return doHttpGetAfterLogin(Config.token,'user/me');
};

export const updateProfile = (data) => {
  return doHttpMultipartwithPatch(data, Config.token, 'user/update');
};
export const getListData = (endPoint) => {
  return doHttpGet(endPoint);
};

export const getListDataAfterLogin = (endPoint) => {
  return doHttpGetAfterLogin(Config.token, endPoint);
};

export const sendPayment = (data, endPoint) => {
  return doHttpPost(data, endPoint );
};
export const addBoat = (data, endPoint) => {
  return doHttpMultipart(data,Config?.token, endPoint );
};
export const getTodayWalletData = (endPoint) => {
  return doHttpGetAfterLogin(Config?.token, endPoint);
};


// user/me
