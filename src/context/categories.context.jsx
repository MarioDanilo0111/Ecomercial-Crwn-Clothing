import { createContext, useState, useEffect } from "react";

/* add data to FirabaseDB */ /* 
import { useEffect } from "react"; */
/* import SHOP_DATA from "../shop-data.js"; */
/* import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js"; */
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  /* add data to FirabaseDB */
  /*  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []); */
  /* add data to FirabaseDB */
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
