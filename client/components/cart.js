import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  removeFromCartThunk,
  updateQtyCartThunk,
  checkoutThunk
} from '../store/cart'
import Checkout from '../../Checkout'

class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleCheckout() {
    //axios call
    this.props.checkout()
    this.props.getCart()
    window.alert('your cats will arrive in a cardboardbox in 1 day')
  }

  render() {
    if (!this.props.cart[0]) {
      return <h1>Empty Cart</h1>
    } else {
      const items = this.props.cart[0].cats
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
                      onClick={() => this.props.remove(item.productOrder.catId)}
                    >
                      Remove Item
                    </button>{' '}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        this.props.increase(
                          item.productOrder.catId,
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
                          : this.props.decrease(
                              item.productOrder.catId,
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
  cart: state.cart
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
