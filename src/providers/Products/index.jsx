import { createContext, useContext, useEffect, useState } from "react";
import { listProducts } from "../../services/products";

import { toast } from "react-toastify"

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

  const [listOfProducts, setListOfProducts] = useState()
  const [actualProduct, setActualProduct] = useState()
  const [currentAdditionals, setCurrentAdditionals] = useState({})
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem("@Deliverize:cart")

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const getProducts = async () => {
    const response = await listProducts()
    setListOfProducts(response)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const setAdditionals = (listOfAdditionals) => {

    const data = {...currentAdditionals}

    listOfAdditionals.forEach((additional) => {
      if(additional.amount){
        data[additional.nm_item] = additional.amount
      }else {
        data[additional.nm_item] = 0
      }
    })

    setCurrentAdditionals(data)
  }

  const updateProductAmount = async (amount, additional) => {
    try {
      
      if (amount < 0) {
        /* O input fica disabled quando o valor chega a 0, é apenas mais uma camada de verificação, caso o amount seja enviado com um valor indesejado. */
        toast.error("Erro na alteração de quantidade do produto")
        return
      }

      const maxItens = actualProduct.ingredients[0].max_itens

      const newData = {...currentAdditionals}
      newData[additional] = amount

      const sumValues = Object.values(newData).reduce((a, b) => a + b); // Somatória de todos os adicionais.
      
      if(sumValues > maxItens){ // Se o valor de adicional for superior ao máximo permitido, cancela a ação.
        toast.error(`Este produto aceita apenas ${maxItens} adicionais.`)
        toast.clearWaitingQueue();
        return
      }

      setCurrentAdditionals(newData)
    
    } catch {
      toast.error("Erro na alteração de quantidade do produto")
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        listOfProducts,
        actualProduct,
        setActualProduct,
        currentAdditionals,
        setAdditionals,
        isCartModalOpen,
        setIsCartModalOpen,
        cart,
        setCart,
        updateProductAmount
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);