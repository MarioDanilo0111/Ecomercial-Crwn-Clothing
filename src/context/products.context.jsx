import { createContext, useState, useEffect } from "react";

/* add data to FirabaseDB */ /* 
import { useEffect } from "react"; */
/* import SHOP_DATA from "../shop-data.js"; */
/* import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js"; */
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  /* add data to FirabaseDB */
  /*  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []); */
  /* add data to FirabaseDB */
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { products };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
