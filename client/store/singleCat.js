import axios from 'axios'

const SINGLE_CAT = 'SINGLE_CAT'
const UPDATE_CAT = 'UPDATE_CAT'

const initialState = {
  breed: '',
  firstName: '',
  lastName: '',
  age: '',
  adoptionStatus: '',
  adoptionFee: '',
  description: '',
  image: ''
}

export const singleCat = data => ({
  type: SINGLE_CAT,
  data
})

export const updateCat = (data, value) => ({
  type: UPDATE_CAT,
  data,
  value
})

export default function singleCatReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_CAT:
      return action.data
    case UPDATE_CAT:
      return {...state, [action.data]: action.value}
    default:
      return state
  }
}

export const fetchSingleCat = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cats/${id}`)
      dispatch(singleCat(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUpdateCat = (id, updatedCat) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cats/${id}`, updatedCat)
      dispatch(updateCat(data))
    } catch (err) {
      console.log(err)
    }
  }
}
