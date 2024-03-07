// redux/actions/countAction.js
export const USER_TOKEN = 'USER_TOKEN';
export const BOTTOM_SHEET_OPTION = 'BOTTOM_SHEET_OPTION';
export const FEATURE_PRODUCT = 'FEATURE_PRODUCT';
export const SLIDER_PRODUCT = 'SLIDER_PRODUCT';
export const CATEGORY_PRODUCT = 'CATEGORY_PRODUCT';
export const NEW_ARRIVAL_PRODUCT = 'NEW_ARRIVAL_PRODUCT';
export const BUY_NOW_PRODUCT = 'BUY_NOW_PRODUCT';
export const ACCESSORIES_PRODUCT = 'ACCESSORIES_PRODUCT';
export const SERVICES = 'SERVICES';
export const ADD_TO_CART = 'ADD_TO_CART';
export const CART_DATA = 'CART_DATA';
export const UPDATE_CART_DATA = 'UPDATE_CART_DATA';
export const DECREASE_CART = 'DECREASE_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_TOTALS = 'GET_TOTALS';
export const GET_USER = 'GET_USER';
export const VENDOR_PRODUCTS = 'VENDOR_PRODUCTS';
export const VENDOR_ORDERS = 'VENDOR_ORDERS';
export const NOTIFICATIONS = 'NOTIFICATIONS';
export const FCM_TOKEN = 'FCM_TOKEN';
export const UPDATE_PRODUCT_QTY = 'UPDATE_PRODUCT_QTY';
export const SET_BOATS = 'SET_BOATS';
export const SET_GALLERY = 'SET_GALLERY';
export const SET_ROLE = 'SET_ROLE';
export const SET_DESTINATION = 'SET_DESTINATION';
export const LANGUAGES = 'LANGUAGES';



export const userToken = value => ({
  type: USER_TOKEN,
  payload: value,
});
export const fcm_Token = data => ({
  type: FCM_TOKEN,
  payload: data,
});

// export const bottomSheetOption = data => ({
//   type: BOTTOM_SHEET_OPTION,
//   payload: data,
// });
export const featureProduct = data => ({
  type: FEATURE_PRODUCT,
  payload: data,
});
export const slider = data => ({
  type: SLIDER_PRODUCT,
  payload: data,
});
export const gallery = data => ({
  type: SET_GALLERY,
  payload: data,
});
export const setLanguage = data => ({
  type: LANGUAGES,
  payload: data,
});
export const destination = data => ({
  type: SET_DESTINATION,
  payload: data,
});
export const setBoats = data => ({
  type: SET_BOATS,
  payload: data,
});
export const setRole = data => ({
  type: SET_ROLE,
  payload: data,
});
export const get_notifications = data => ({
  type: NOTIFICATIONS,
  payload: data,
});
export const newArrival = data => ({
  type: NEW_ARRIVAL_PRODUCT,
  payload: data,
});
export const buyNow = data => ({
  type: BUY_NOW_PRODUCT,
  payload: data,
});
export const accessories = data => ({
  type: ACCESSORIES_PRODUCT,
  payload: data,
});
export const services = data => ({
  type: SERVICES,
  payload: data,
});
export const addToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});
export const getCart = data => ({
  type: CART_DATA,
  payload: data,
});
export const updateCart = data => ({
  type: UPDATE_CART_DATA,
  payload: data,
});
export const decCart = data => ({
  type: DECREASE_CART,
  payload: data,
});

export const removeCart = data => ({
  type: REMOVE_FROM_CART,
  payload: data,
});
export const getTotal = data => ({
  type: GET_TOTALS,
  payload: data,
});
export const getUser = data => ({
  type: GET_USER,
  payload: data,
});
export const vendorProducts = data => ({
  type: VENDOR_PRODUCTS,
  payload: data,
});
export const vendorOrders = data => ({
  type: VENDOR_ORDERS,
  payload: data,
});
export const updateProductQty = (itemQty, updateProuctQty) => {
  return {
    type: UPDATE_PRODUCT_QTY,
    payload: {updateProuctQty, itemQty},
  };
};

