import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const ShopContext = createContext();

const initialState = {
  user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
  shippingAddress: Cookies.get('shippingAddress')
    ? JSON.parse(Cookies.get('shippingAddress'))
    : null,
  paymentMethod: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const existItem = state.cart.find(
        (item) => item._id == action.payload._id
      );
      const cartItem = existItem
        ? state.cart.map((item) =>
            item._id == existItem._id
              ? {
                  ...item,
                  quantity: action.payload.quantity,
                }
              : item
          )
        : [...state.cart, action.payload];
      Cookies.set('cart', JSON.stringify(cartItem));
      return { ...state, cart: cartItem };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItem = state.cart.filter(
        (item) => item._id != action.payload._id
      );
      Cookies.set('cart', JSON.stringify(cartItem));

      return { ...state, cart: cartItem };
    }

    case 'CART_CLEAR_ITEM': {
      Cookies.remove('cart');
      return { ...state, cart: [] };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      Cookies.set('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    case 'SIGN IN': {
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'LOG OUT': {
      Cookies.remove('userInfo');
      return {
        ...state,
        user: null,
      };
    }
    case 'UPDATE USER': {
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}
