import { useState, useCallback } from 'react'
function useFetch() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const fetchProducts = useCallback(async (options) => {
    setIsLoading(true)
    setError(null)
      try {
        const response = await fetch(
          options.url,
          {
            method: options.method ? options.method : 'GET',
            headers: options.headers ? options.headers : {},
            body: options.body ? JSON.stringify(options.body) : null
          }
        )
        if (!response.ok) {
          throw new Error("Ошибка запроса.")
        }
        const data = await response.json()
        options.manageData(data)
      } catch (err) {
        setError(err.message || "Что-то пошло не так...")
      }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    fetchProducts,
  }
}
export default useFetch