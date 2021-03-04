//Action types
import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (items, product) => dispatch => {
  const cartItems = items.splice()
  let productAllreadyInCart = false
  cartItems.forEach(item => {
    if (item.id === product.id) {
      productAllreadyInCart = true
      item.count++
    }
  })
  if (!productAlreadyInCart) {
    cartItems.push({...product, count: 1})
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  return dispatch({
    type: ADD_TO_CART,
    payload: {
      cartItems: cartItems
    }
  })
}

export const removeFromCart = (items, product) => dispatch => {
  const cartItems = items.splice().filter(elm => elm.id !== product.id)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  dispatch({
    action: REMOVE_FROM_CART,
    payload: {
      cartItems: cartItems
    }
  })
}

const initialState = {items: []}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        items: action.payload.cartItems
      }
    case REMOVE_FROM_CART:
      return action.data
    default:
      return state
  }
}
