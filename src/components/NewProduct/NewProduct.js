import useFetch from '../../hooks/useFetch'
import Section from "../UI/Section" 
import ProductForm from "./ProductForm" 

const NewProduct = (props) => {
  const { isLoading, error, fetchProducts } = useFetch()
  function createNote( productText, note ) {
    const generatedId = note.name
    const createdProduct = {id: generatedId, text: productText}
    props.onAddProduct(createdProduct) 
  }
  const enterProductHandler = async (productText) => {
    fetchProducts({
      url: "https://custom-hooks-firebase-default-rtdb.firebaseio.com/ products.json", 
      method: "POST",
      body: { text: productText },
      manageData: createNote.bind( null, productText )
    })
  } 

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  ) 
} 

export default NewProduct 
