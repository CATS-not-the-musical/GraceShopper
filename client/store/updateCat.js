import axios from 'axios'

const UPDATE_CAT = 'UPDATE_CAT'

export const updateCat = (data, value) => ({
  type: UPDATE_CAT,
  data,
  value
})

const initialState = {
  name: '',
  category: '',
  description: '',
  price: '',
  image: ''
}

export default function updateCatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CAT:
      return {...state, [action.data]: action.value}
    default:
      return state
  }
}

export const fetchUpdateCat = (id, updatedCat) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cats/${id}`)
      dispatch(updateCat(data))
    } catch (err) {
      console.log(err)
    }
  }
}
