import { createContext, useReducer } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  // find if cartItem contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart Item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // check if queantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

/* Clear Cart Item */
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  /* add cart to dropdow */
  cartItems: [],
  addItemToCart: () => {},
  /* cart counter */
  /* Remove Item from Cart */
  removeItemFromCart: () => {},
  /* Clear Items from Cart */
  clearItemFromCart: () => {},
  /* total in the Checkout page */
  cartTotal: 0,
});

/* Creating the reducer */
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

/* Reducer to setCartItems */
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  /* theMethod */
  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  /* Action Creater functions */
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };
  /* Action Creater functions 
   Decrement  */
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItems);
  };

  /* Action Creater functions 
   Clear Cart Item  */
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen: () => {},
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
