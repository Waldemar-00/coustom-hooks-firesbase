import useFetch from '../../hooks/useFetch'
import Section from "../UI/Section" 
import ProductForm from "./ProductForm" 

const NewProduct = (props) => {
  const { isLoading, error, fetchProducts } = useFetch()
  function createNote( productText, note ) {
      props.onAddProduct({ id: note.name, text: productText }) 
  }
  const enterProductHandler = async (productText) => {
    fetchProducts({
      url: "https://custom-hooks-firebase-default-rtdb.firebaseio.com/products.json", 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: { text: productText },
    }, createNote.bind(null, productText))
  } 

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  ) 
} 

export default NewProduct 
