import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItem, productToAdd) => {
  // find if cartItem contains productToAdd
  const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems/ new cart item
  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  /* add cart to dropdow */
  cartItems: [],
  addItemToCart: () => {},
  /* cart counter */
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  /* add cart to dropdow */
  const [cartItems, setCartImems] = useState([]);
  /* count setter, increasing the count */
  const [cartCount, setCartCount] = useState(0);

  /* useEffect to add the total of items added */
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartImems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
