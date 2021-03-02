import axios from 'axios'

const ALL_PRODUCTS = 'ALL_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const initialState = []

export const allProducts = (data) => ({
  type: ALL_PRODUCTS,
  data,
})

export const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  product,
})

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.data
    case REMOVE_PRODUCT:
      const filteredProducts = [...state].filter((product) => {
        return product.id !== action.product
      })
      return filteredProducts
    default:
      return state
  }
}

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(allProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const deleted = axios.delete(`/api/products/${id}`).data
      dispatch(removeProduct(id))
      history.push('/')
      history.goForward()
    } catch (err) {
      next(err)
    }
  }
}
