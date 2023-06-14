import { useContext } from "react";
import { ProductContext } from "../../context/products.context";

const Shop = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="shop-data">
      {products.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Shop;
