//Action types
import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DECREASE_QTY = 'DECREASE_QTY'
const INCREASE_QTY = 'INCREASE_QTY'

//action creators

export const getCart = user => ({
  type: GET_CART,
  user
})

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
})

export const decreaseQty = item => ({
  type: DECREASE_QTY,
  item
})

export const increaseQty = item => ({
  type: INCREASE_QTY,
  item
})

export const getCartThunk = user => {
  return async dispatch => {
    try {
      const {data} = await axios.get('')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = user => {
  return async dispatch => {
    try {
      const {data} = await axios.post()
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeFromCartThunk = (item, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete()
      dispatch(removeFromCart(data))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}

export const decreaseQtyCartThunk = (item, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete()
      dispatch(decreaseQty(data))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}

export const increaseQtyCartThunk = (item, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete()
      dispatch(increaseQty(data))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {items: []}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.user
    case ADD_TO_CART:
      return {...state, cartItems: action.item}
    case REMOVE_FROM_CART:
      return {...state, cartItem: action.item} //redo with filter
    case INCREASE_QTY:
      return {...state, cartItem: action.item}
    case DECREASE_QTY:
      return {...state, cartItem: action.item}
    default:
      return state
  }
}

// export const addToCart = (items, product) => dispatch => {
//   const cartItems = items.splice()
//   let productAllreadyInCart = false
//   cartItems.forEach(item => {
//     if (item.id === product.id) {
//       productAllreadyInCart = true
//       item.count++
//     }
//   })
//   if (!productAlreadyInCart) {
//     cartItems.push({...product, count: 1})
//   }
//   localStorage.setItem('cartItems', JSON.stringify(cartItems))
//   return dispatch({
//     type: ADD_TO_CART,
//     payload: {
//       cartItems: cartItems
//     }
//   })
// }

// export const removeFromCart = (items, product) => dispatch => {
//   const cartItems = items.splice().filter(elm => elm.id !== product.id)
//   localStorage.setItem('cartItems', JSON.stringify(cartItems))
//   dispatch({
//     action: REMOVE_FROM_CART,
//     payload: {
//       cartItems: cartItems
//     }
//   })
// }
