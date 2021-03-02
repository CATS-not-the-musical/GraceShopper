import axios from 'axios'

const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

const initalState = {}

export const singleProduct = (data) => ({
  type: SINGLE_PRODUCT,
  data,
})

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.data
    default:
      return state
  }
}

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(fetchSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}
