import axios from 'axios'

const SINGLE_CAT = 'SINGLE_CAT'

const initialState = {}

export const singleCat = data => ({
  type: SINGLE_CAT,
  data
})

export default function singleCatReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_CAT:
      return action.data
    default:
      return state
  }
}

export const fetchSingleCat = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cats/${id}`)
      dispatch(fetchSingleCat(data))
    } catch (err) {
      console.log(err)
    }
  }
}
