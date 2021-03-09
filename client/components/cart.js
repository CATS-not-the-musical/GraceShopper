import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  getCartThunk,
  removeFromCartThunk,
  updateQtyCartThunk,
  checkoutThunk
} from '../store/cart'
import {toast} from 'react-toastify'
import {
  guestCartIncrease,
  guestCartDecrease,
  guestCartRemove
} from './guestCartFxns'

class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
    this.state = {cart: []}
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.removeCat = this.removeCat.bind(this)
  }

  componentDidUpdate(prevProps) {
    //gets cart after isloggedIn is updated on props
    if (this.props.isLoggedIn !== prevProps.isLoggedIn)
      if (this.props.isLoggedIn) {
        this.props.getCart()
      }
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCart()
    } else {
      const guestCartCatsArr = JSON.parse(window.localStorage.getItem('cart'))
      this.setState({cart: guestCartCatsArr})
    }
  }

  handleCheckout() {
    //axios call
    if (this.props.isLoggedIn) {
      this.props.checkout()
      this.props.getCart()
      toast.info('your cats will arrive in a cardboardbox in 1 day', {
        autoClose: 7000
      })
    } else {
      toast.info(
        'Please login or signup first before checking out.\nYour cart items have been saved',
        {
          autoClose: 12000
        }
      )
      //send the guest to the login screen if they want to checkout.
      this.props.history.push('/login')
    }
  }

  increaseQuantity(catId, quantity) {
    if (this.props.isLoggedIn) {
      this.props.increase(catId, quantity)
    } else {
      const catArr = guestCartIncrease(catId, quantity)
      this.setState({cart: catArr})
    }
  }
  decreaseQuantity(catId, quantity) {
    if (this.props.isLoggedIn) {
      this.props.decrease(catId, quantity)
    } else {
      const catArr = guestCartDecrease(catId, quantity)
      this.setState({cart: catArr})
    }
  }
  removeCat(id) {
    if (this.props.isLoggedIn) {
      this.props.remove(id)
    } else {
      let catArr = guestCartRemove(id)
      this.setState({cart: catArr})
    }
  }

  render() {
    //conditionals for checking initial render
    let cart
    if (this.props.isLoggedIn) {
      //set logged in user state cart
      cart = this.props.cart[0]
    } else {
      //set guest cart
      cart = JSON.parse(window.localStorage.getItem('cart'))
    }
    if (!cart) {
      return <h1>Empty Cart</h1>
    } else {
      let items = []
      //sets items to the actual array of cat objects
      if (this.props.isLoggedIn) {
        items = cart.cats
      } else {
        items = cart
      }
      return (
        <div>
          <div className="cart">
            {items.length === 0 ? (
              'Cart is empty'
            ) : (
              <div>
                <h2>
                  {' '}
                  You have {items.length} types of cats in your cardboard box!
                </h2>
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={() => {
                    //change this user's order  filfilled status from false to true
                    this.handleCheckout()
                  }}
                >
                  Check Out
                </button>
              </div>
            )}
          </div>
          <div>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <div className="cart">
                    <h3>
                      {' '}
                      Name: {item.firstName} {item.lastName}
                    </h3>
                    <h4>Description: {item.description}</h4>
                    <h4>Unit Adoption Fee: {item.adoptionFee}</h4>
                    <h4>Quantity:{item.productOrder.quantity}</h4>
                    <h4>
                      Total: {item.productOrder.quantity * item.adoptionFee}
                    </h4>
                    <img src={`${item.image}`} />
                  </div>
                  <div className="cart">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => this.removeCat(item.id)}
                    >
                      Remove Item
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        this.increaseQuantity(
                          item.id,
                          item.productOrder.quantity
                        )
                      }
                    >
                      Increase Qty
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        return item.productOrder.quantity === 1
                          ? {}
                          : this.decreaseQuantity(
                              item.id,
                              item.productOrder.quantity
                            )
                      }}
                    >
                      Decrease Qty
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCartThunk()),
    remove: catid => dispatch(removeFromCartThunk(catid)),
    increase: (itemid, quantity) =>
      dispatch(updateQtyCartThunk(itemid, quantity + 1)),
    decrease: (itemid, quantity) =>
      dispatch(updateQtyCartThunk(itemid, quantity - 1)),
    checkout: () => dispatch(checkoutThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

Cart.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
