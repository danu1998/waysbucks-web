import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
  cart: [],
};

const arraysMatch = function (arr1, arr2) {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      console.log("CART", state);
      const isInCart = state.cart.find((product) => {
        const matchedArray = arraysMatch(
          product.topings,
          action.payload.topings
        );
        return product.id === action.payload.id && matchedArray;
      });

      const subTotal = action.payload.quantity * action.payload.initialPrice;
      console.log(subTotal);

      if (isInCart) {
        const inCart = state.cart.map((product) => {
          if (product === action.payload) {
            return {
              ...product,
              quantity: product.quantity + 1,
              subTotal: (product.quantity + 1) * product.initialPrice,
            };
          } else {
            return product;
          }
        });
        return {
          ...state,
          cart: inCart,
        };
      }

      const newCart = [...state.cart, { ...action.payload }];
      return {
        ...state,
        cart: newCart,
      };

    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;

    case "REMOVE_FROM_CART":
      return {
        cart: state.cart.map((item) => {
          const matchedArray = arraysMatch(
            item.topings,
            action.payload.topings
          );
          if (item.id === action.payload.id && matchedArray) {
            return {
              ...item,
              quantity: item.quantity - 1,
              subTotal: (item.quantity - 1) * item.initialPrice,
            };
          } else {
            return item;
          }
        }),
      };

    case "RESET_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_CART":
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        return state;
      }
      return { ...state, cart: JSON.parse(cartData) };

    // Creat case "USER_SUCCESS" here ...
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      // Set item token to localStorage here ...
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    // Creaet case "AUTH_ERROR" here ...
    case "AUTH_ERROR":
    case "LOGOUT":
      // Remove item token from localStorage here ...
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
        cart: [],
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
