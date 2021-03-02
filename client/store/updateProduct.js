import axios from 'axios'

const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const updateProduct = (data, value) => ({
  type: UPDATE_PRODUCT,
  data,
  value,
})

const initialState = {
  name: '',
  category: '',
  description: '',
  price: '',
  image: '',
}

export default function updateProductReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT:
      return {...state, [action.data]: action.value}
    default:
      return state
  }
}

export const fetchUpdateProduct = (id, updatedProduct) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/${id}`)
      dispatch(updateProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}
