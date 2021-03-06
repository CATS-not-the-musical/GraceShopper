//Action types
import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const CLEAR_CART = 'CLEAR_CART'
// const DECREASE_QTY = 'DECREASE_QTY'
// const INCREASE_QTY = 'INCREASE_QTY'

//action creators

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
})

export const updateQty = (item, quantity) => ({
  type: UPDATE_QTY,
  item,
  quantity
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const getCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeFromCartThunk = catid => {
  return async dispatch => {
    try {
      const {data} = await axios.delete('/api/cart', {data: {catid: catid}})
      dispatch(getCartThunk())
    } catch (error) {
      console.log(error)
    }
  }
}
//put to update post to create
export const addToCartThunk = (catId, quantity = 1) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', {
        catId: catId,
        quantity: quantity
      })
      dispatch(getCartThunk())
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutThunk = () => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/checkout', {})
      dispatch(getCartThunk())
    } catch (err) {
      console.log(err)
    }
  }
}

//put to update post to create
//put route to update quantity ??
export const updateQtyCartThunk = (itemid, quantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', {id: itemid, quantity})
      //dispatch(updateQty(item, quantity))
      dispatch(getCartThunk())
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    //cases below not used yet.
    case ADD_TO_CART:
      return [...state, action.item]
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.filter(item => item.id !== action.itemid)
      }
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
// old code to modify state
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

// export const decreaseQtyCartThunk = (item, history) => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.delete('/api/cart')
//       dispatch(decreaseQty(data))
//       history.push('/')
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const increaseQtyCartThunk = (item, history) => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.put('/api/cart')
//       dispatch(increaseQty(data))
//       history.push('/')
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
// export const increaseQty = item => ({
//   type: INCREASE_QTY,
//   item
// })
// export const decreaseQty = item => ({
//   type: DECREASE_QTY,
//   item
// })

//  case UPDATE_QTY:
//       return {...state, cartItem: action.item}
//     case DECREASE_QTY:
//       return {...state, cartItem: action.item}
