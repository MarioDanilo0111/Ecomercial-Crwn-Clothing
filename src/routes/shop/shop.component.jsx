import SHOP_DATA from "../../shop-data.json";

const Shop = () => {
  return (
    <div className="shop-data">
      {SHOP_DATA.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Shop;
