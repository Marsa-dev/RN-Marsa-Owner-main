import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_TOKEN, 
  FEATURE_PRODUCT, 
  SLIDER_PRODUCT, 
  CATEGORY_PRODUCT, 
  NEW_ARRIVAL_PRODUCT, 
  BUY_NOW_PRODUCT, 
  ACCESSORIES_PRODUCT, 
  SERVICES, ADD_TO_CART,
  CART_DATA,
  UPDATE_CART_DATA,
  DECREASE_CART,
  REMOVE_FROM_CART,
  GET_TOTALS,
  CLEAR_CART,
  GET_USER,
  NOTIFICATIONS,
  UPDATE_PRODUCT_QTY,
  FCM_TOKEN,
  VENDOR_ORDERS,
  VENDOR_PRODUCTS,
  SET_BOATS,
  SET_GALLERY,
  SET_DESTINATION,
  SET_ROLE,
  LANGUAGES
} from '../action/Action';

// redux/reducers/countReducer.js
const initialState = {
  token: null,
  fcmToken: null,
  user: null,
  role: null,
  language: null,
  objectData: {},
  slider: [],
  gallery: [],
  destination: [],
  boats: [],
  notifications: [],
  feature: [],
  newArrival: [],
  buyNow: [],
  accessories: [],
  services: [],
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartTotalShip: 0,
  vendorProducts:[],
  vendorOrders:[]
};

export default itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LANGUAGES:
      return {
        ...state,
        language: action.payload,
      };  
    case FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };  
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };  
    // case BOTTOM_SHEET_OPTION:
    //   return {
    //     ...state,
    //     objectData: action.payload,
    //   };
    case FEATURE_PRODUCT:
      return {
        ...state,
        feature: action.payload,
      };
      case VENDOR_PRODUCTS:
      return {
        ...state,
        vendorProducts: action.payload,
      };
      case VENDOR_ORDERS:
      return {
        ...state,
        vendorOrders: action.payload,
      };
    case SLIDER_PRODUCT:
      return {
        ...state,
        slider: action.payload,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case SET_BOATS:
      return {
        ...state,
        boats: action.payload,
      };
    case SET_GALLERY:
      return {
        ...state,
        gallery: action.payload,
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
      };
    
    case NEW_ARRIVAL_PRODUCT:
      return {
        ...state,
        newArrival: action.payload,
      };
    case BUY_NOW_PRODUCT:
      return {
        ...state,
        buyNow: action.payload,
      };
    case ACCESSORIES_PRODUCT:
      return {
        ...state,
        accessories: action.payload,
      };
    case SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case CART_DATA:
      return {
        ...state,
        cartItems: action.payload,
      };
    case UPDATE_CART_DATA:
      const newProducts = action.payload;

      // Create a copy of the current cartItems array from the state
      const updatedCartItems = [...state.cartItems];

      // Loop through the newProducts and check if each product exists in the cartItems array
      newProducts.forEach((newProduct) => {
        const existingProductIndex = updatedCartItems.findIndex(
          (item) => item._id === newProduct._id
        );

        if (existingProductIndex !== -1) {
          // If the product exists, update its quantity (or any other properties you need to update)
          updatedCartItems[existingProductIndex].quantity += newProduct.quantity;
        } else {
          // If the product doesn't exist, add it to the cartItems array
          updatedCartItems.push(newProduct);
        }
      });

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case ADD_TO_CART:
      const item = action.payload;
      // console.log("my item", action.payload)

      // Initialize cartItems as an empty array if it's null
      if (!state.cartItems) {
        state.cartItems = [];
      }

      const existingItem = state.cartItems.find(
        cartItem => cartItem._id === item._id
      );
      if (existingItem) {
        // If the product already exists in the cart, increase the quantity
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        // If it's a new product, add it to the cart
        const newItem = { ...item, quantity: 1 };
        state.cartItems.push(newItem);
      }

      // Update the cartItems state and store it in AsyncStorage
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        .catch(error => {
          console.log('Error saving cart items:', error);
          // Handle the error appropriately (e.g., show an error message)
        });

      return { ...state, cartItems: [...state.cartItems] };

    // case ADD_TO_CART:
    //   const itemToAdd = action.payload;
    
    //   // Check if the product already exists in the cart
    //   const existingItemIndex = state.cartItems.findIndex(
    //     (cartItem) => cartItem._id === itemToAdd._id
    //   );
    
    //   if (existingItemIndex !== -1) {
    //     // If the product already exists in the cart, increase the quantity of the existing item
    //     const updatedCartItems = [...state.cartItems];
    //     updatedCartItems[existingItemIndex].quantity += 1;
    
    //     // Update the cartItems state and store it in AsyncStorage
    //     AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    //       .catch((error) => {
    //         console.log('Error saving cart items:', error);
    //         // Handle the error appropriately (e.g., show an error message)
    //       });
    
    //     return { ...state, cartItems: updatedCartItems };
    //   } else {
    //     // If it's a new product, add it to the cart
    //     const newItem = { ...itemToAdd, quantity: 1 };
    //     const updatedCartItems = [...state.cartItems, newItem];
    
    //     // Update the cartItems state and store it in AsyncStorage
    //     AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    //       .catch((error) => {
    //         console.log('Error saving cart items:', error);
    //         // Handle the error appropriately (e.g., show an error message)
    //       });
    
    //     return { ...state, cartItems: updatedCartItems };
    //   }
    

    // case ADD_TO_CART:
    //   const item = action.payload;
    //   console.log("my item", action.payload)
    //   const existingItem = state.cartItems.find(
    //     cartItem => cartItem._id === item._id
    //   );
    //   if (existingItem) {
    //     // If the product already exists in the cart, increase the quantity
    //     existingItem.quantity += 1;
    //   } else {
    //     // If it's a new product, add it to the cart
    //     const newItem = { ...item, quantity: 1 };
    //     state.cartItems.push(newItem);
    //   }

    //   // Update the cartItems state and store it in AsyncStorage
    //   AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    //     .catch(error => {
    //       console.log('Error saving cart items:', error);
    //       // Handle the error appropriately (e.g., show an error message)
    //     });

    //   return { ...state, cartItems: [...state.cartItems] };

    ///////////////////////////Decreament/////////////////////////////////////////////

    case DECREASE_CART:
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (state.cartItems[itemIndex].quantity > 1) {
        // Create a new array with the updated quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[itemIndex] = {
          ...updatedCartItems[itemIndex],
          quantity: updatedCartItems[itemIndex].quantity - 1
        };

        // Update the cartItems state and store it in AsyncStorage
        AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
          .catch(error => {
            console.log('Error saving cart items:', error);
            // Handle the error appropriately (e.g., show an error message)
          });

        return { ...state, cartItems: updatedCartItems };
      }
      // else if (state.cartItems[itemIndex].quantity === 1) {
      //   // Create a new array without the item to be removed
      //   const updatedCartItems = state.cartItems.filter((item, index) => index !== itemIndex);

      //   // Update the cartItems state and store it in AsyncStorage
      //   AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      //     .catch(error => {
      //       console.log('Error saving cart items:', error);
      //       // Handle the error appropriately (e.g., show an error message)
      //     });

      //   return { ...state, cartItems: updatedCartItems };
      // }
      return state;
    case REMOVE_FROM_CART:
      const removedItemId = action.payload?._id;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== removedItemId
      );

      // Update the cartItems state and store it in AsyncStorage
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        .catch(error => {
          console.log('Error saving cart items:', error);
          // Handle the error appropriately (e.g., show an error message)
        });

      return { ...state };
    case GET_TOTALS:
      const { cartItems } = state;

      const { total, cartQuantity, ship } = cartItems.reduce(
        (totals, cartItem) => {
          const { new_price, quantity, shiping_fee } = cartItem;
          const itemTotal = new_price * quantity;
          const itemShip = shiping_fee * quantity;

          totals.total += itemTotal;
          totals.cartQuantity += quantity;
          totals.ship += itemShip;

          return totals;
        },
        {
          total: 0,
          cartQuantity: 0,
          ship: 0,
        }
      );

      return {
        ...state,
        cartTotalAmount: parseFloat(total?.toFixed(2)),
        cartTotalQuantity: cartQuantity,
        cartTotalShip: ship,
      };
      case UPDATE_PRODUCT_QTY:
        const { itemQty, updateProuctQty } = action.payload;
        console.log('itemQty', itemQty);
        console.log('updateProuctQty', updateProuctQty);
      
        // Parse itemQty to an integer before updating the quantity
        const parsedQty = parseInt(itemQty, 10);
      
        const updateItems = state.cartItems.map((cartItem) =>
          cartItem._id === updateProuctQty?._id
            ? { ...cartItem, quantity: parsedQty }
            : cartItem
        );
      
        AsyncStorage.setItem('cartItems', JSON.stringify(updateItems)).catch(
          (error) => {
            console.log('Error saving cart items:', error);
            // Handle the error appropriately (e.g., show an error message)
          }
        );
      
        return { ...state, cartItems: updateItems };      

    default:
      return state;
  }
};
