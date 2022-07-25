import { createContext, useContext, useEffect, useState } from "react";
import { listProducts } from "../../services/products";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

  const [listOfProducts, setListOfProducts] = useState()

  const getProducts = async () => {
    const response = await listProducts()
    setListOfProducts(response)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        listOfProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);