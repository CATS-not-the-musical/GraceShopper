import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Cats from './Cats'
import {getCartThunk, addToCartThunk} from '../store/cart'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.getCart()
    const guestCart = JSON.parse(window.localStorage.getItem('cart'))
    //push guest cart into current cart.
    let cart = this.props.cart[0]
    //check if cart exists
    //only run if guestCart exists
    if (guestCart) {
      //if cart does not exist, create a cart first them push guest items into the cart
      if (!cart) {
        //express route to add a cat automatically creates a cart if there isn't one
        //add catId's and quantities to cart
        for (let i = 0; i < guestCart.length; i++) {
          await this.props.addToCart(
            guestCart[i].id,
            guestCart[i].productOrder.quantity
          )
        }
      } else {
        //if cart exists,create push guest items into the cart
        //reconcile what's already in the cart with what you are adding
        let inCartAlready = false
        for (let i = 0; i < guestCart.length; i++) {
          inCartAlready = false
          //check if in cart already by looping through props cart
          for (let j = 0; j < this.props.cart.length; j++) {
            if (guestCart[i].id === this.props.cart[j].id) {
              inCartAlready = true
              break
            }
          }
          if (!inCartAlready) {
            await this.props.addToCart(
              guestCart[i].id,
              guestCart[i].productOrder.quantity
            )
          }
        }
      }
    }
    //empty guest cart
    window.localStorage.removeItem('cart')
    //check history and maybe redirect them to cart if coming from guest cart
  }
  render() {
    const {email} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Cats />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
  return {
    getCart: () => dispatch(getCartThunk()),
    addToCart: (catId, quantity) => dispatch(addToCartThunk(catId, quantity))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
