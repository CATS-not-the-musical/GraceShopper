import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  removeFromCartThunk,
  updateQtyCartThunk
} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  handleRemove() {}
  handleIncreaseQty() {}
  handleDecreaseQty() {}
  render() {
    console.log('this is props', this.props)
    if (!this.props.cart[0]) {
      return <h1>Loading....</h1>
    } else {
      const items = this.props.cart[0].cats
      return (
        <div>
          <div>
            {items.length === 0 ? (
              'Cart is empty'
            ) : (
              <h2> You Have {items.length} products in your cart.</h2>
            )}
          </div>
          <div>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <div>
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
                  <button
                    type="button"
                    onClick={() => this.props.remove(item.productOrder.catId)}
                  >
                    Remove Item
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.increase(
                        item.productOrder.catId,
                        item.productOrder.quantity
                      )
                    }
                  >
                    Increase Qty
                  </button>
                  <button
                    type="button"
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
      dispatch(updateQtyCartThunk(itemid, quantity - 1))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
