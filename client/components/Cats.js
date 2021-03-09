import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchAllCats} from '../store/cat'
import {toast} from 'react-toastify'
import {addToCartThunk, updateQtyCartThunk, getCartThunk} from '../store/cart'
import {addToGuestCart} from './guestCartFxns'

class AllCats extends React.Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.allCats()
    this.props.getCart()
  }

  handleAdd(id) {
    let addedCat = this.props.cats[id - 1]
    //conditional to determine if user is logged in.
    if (this.props.isLoggedIn) {
      //for adding cats to logged in user cart.
      this.props.addToCart(id)
      toast.info(
        `${addedCat.firstName} ${addedCat.lastName} added to cardboard box!`
      )
    } else {
      //adding to guest cart
      let catData = {...addedCat, productOrder: {quantity: 1}}
      addToGuestCart(id, catData)
    }
  }

  render() {
    const Cats = this.props.cats
    if (!Cats) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <h1>Cats</h1>
          <div className="productsContainer">
            {Cats.map(cat => {
              return (
                <div className="products" key={cat.id}>
                  <img className="rounded-circle" src={`${cat.image}`} />
                  <div>
                    <NavLink to={`/cats/${cat.id}`}>
                      {cat.firstName} {cat.lastName}
                    </NavLink>
                    <h3>Age: {cat.age}</h3>
                    <h3>Adoption Status: {cat.adoptionStatus}</h3>
                    <h3>Adoption Fee: {cat.adoptionFee}</h3>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => this.handleAdd(cat.id)}
                    >
                      Adopt Me
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

const mapState = state => {
  return {
    cats: state.cats,
    cart: state.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    allCats: () => dispatch(fetchAllCats()),
    addToCart: catId => dispatch(addToCartThunk(catId)),
    increaseQty: (itemId, quantity) =>
      dispatch(updateQtyCartThunk(itemId, quantity)),
    getCart: () => dispatch(getCartThunk())
  }
}

export default connect(mapState, mapDispatch)(AllCats)

//PROP TYPES
AllCats.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
