import { useState, useEffect } from 'react'
function useFetch() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const fetchProducts = async (productText) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://custom-hooks-firebase-default-rtdb.firebaseio.com//products.json"
      )
      if (!response.ok) {
        throw new Error("Ошибка запроса.")
      }
      const data = await response.json()
      const loadedProducts = []
      for (const productKey in data) {
        loadedProducts.push({ id: productKey, text: data[productKey].text })
      }
      setProducts(loadedProducts)
    } catch (err) {
      setError(err.message || "Что-то пошло не так...")
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return {
    isLoading,
    products,
    error,
    setProducts,
  }
}
export default useFetch