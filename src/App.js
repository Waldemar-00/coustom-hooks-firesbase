import React, { useState, useEffect } from "react" 
import useFetch from './hooks/useFetch'
import Products from "./components/Products/Products" 
import NewProduct from "./components/NewProduct/NewProduct" 

function App() {
  const [products, setProducts] = useState([])
  const { isLoading, error, fetchProducts } = useFetch()
  useEffect(() => {
    function manageData(data) {
      const loadedProducts = []
      for (const productKey in data) {
        loadedProducts.push({
          id: productKey, text: data[productKey].text
        })
      }
      setProducts(loadedProducts)
    }
    fetchProducts({
      url: "https://custom-hooks-firebase-default-rtdb.firebaseio.com/products.json",
      manageData
    })
  }, [ fetchProducts ])

  const [reFresh, setReFresh] = useState(true)
  function productAddHandler(product) {
    setProducts((prevProducts) => prevProducts.concat(product)) 
  }
  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      {
      ( reFresh || !reFresh ) &&
        <Products
          items={products}
          loading={ isLoading }
          error={ error}
          onFetch={() => setReFresh(reFresh => !reFresh)}
        />
      }
    </React.Fragment>
  ) 
}

export default App 
