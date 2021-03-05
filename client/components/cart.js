import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: {}
    }
  }

  componentDidMount() {}

  componentDidUpdate() {}

  orderTotal = () => {}

  redener() {}

  // const mapStateToProps = state => ({

  //   cartItems: state.cart.items

  // })

  // export default connect(mapStateToProps,removeFromCart)(Cart)

  //   const {cartItems} = this.props
  //     return (
  //       <div>
  //         <div>
  //           {cartItems.length === 0 ? (
  //             'Cart is empty'
  //           ) : (
  //             <h2> You Have {cartItems.length} products in your cart.</h2>
  //           )}
  //         </div>
  //         <div>
  //           {cartItems.map(item => {
  //             return (
  //               <div key={item.id}>
  //                 <div>
  //                   <h3>Category: {item.category}</h3>
  //                   <h4>Description: {item.description}</h4>
  //                   <h4>Price: {item.price}</h4>
  //                   <img src={`${item.image}`} />
  //                 </div>
  //                 <button
  //                   type="button"
  //                   onClick={() => this.props.removeFromCart(this.props.cartItems, item)}> Remove Item 7 </button>
  //               </div>
  //             )
  //           })}
  //         </div>
  //       </div>
  //     )
}
