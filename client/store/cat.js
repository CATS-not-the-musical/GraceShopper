import axios from 'axios'

const ALL_CATS = 'ALL_CATS'
const REMOVE_CAT = 'REMOVE_CAT'
const NEW_CAT = 'NEW_CAT'

const initialState = []

export const allCats = data => ({
  type: ALL_CATS,
  data
})

export const removeCat = cat => ({
  type: REMOVE_CAT,
  cat
})

export const newCat = cat => ({
  type: NEW_CAT,
  cat
})
//follow standard of layout
export default function catReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_CATS:
      return action.data
    case REMOVE_CAT:
      const filteredCats = [...state].filter(cat => {
        return cat.id !== action.cat
      })
      return filteredCats
    //needs to fix.
    case NEW_CAT:
      return action.cat
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

export const newCatThunk = (cat, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cats', cat)
      dispatch(newCat(data))
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeCatThunk = (id, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cats/${id}`)
      dispatch(removeCat(data))
      history.push('/')
      history.goForward()
    } catch (err) {
      console.log(err)
    }
  }
}
