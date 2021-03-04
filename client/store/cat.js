import axios from 'axios'

const ALL_CATS = 'ALL_CATS'
const REMOVE_CAT = 'REMOVE_CAT'

const initialState = []

export const allCats = data => ({
  type: ALL_CATS,
  data
})

export const removeCat = cat => ({
  type: REMOVE_CAT,
  CAT
})

export default function catReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_CATS:
      return action.data
    case REMOVE_CAT:
      const filteredCats = [...state].filter(cat => {
        return cat.id !== action.cat
      })
      return filteredCats
    default:
      return state
  }
}

export const fetchAllCats = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cats')
      dispatch(allCats(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteCat = (id, history) => {
  return async dispatch => {
    try {
      const deleted = axios.delete(`/api/cats/${id}`).data
      dispatch(removeCat(id))
      history.push('/')
      history.goForward()
    } catch (err) {
      console.log(err)
    }
  }
}
