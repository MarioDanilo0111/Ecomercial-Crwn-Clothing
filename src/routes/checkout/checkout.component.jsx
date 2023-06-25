import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  return (
    <div className="checkout-component">
      <h2>Cheching out Page</h2>
      <div className="map-comp">
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => removeItemToCart(cartItem)}>decrement</span>
              <br />
              <span onClick={() => addItemToCart(cartItem)}>increment</span>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
