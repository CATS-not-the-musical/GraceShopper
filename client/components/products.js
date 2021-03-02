import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchAllProducts} from '../store/product'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.allProducts()
  }
  render() {
    const Products = this.props.products
    return (
      <div>
        <h1>Products</h1>
        {Products.map((products) => {
          return (
            <div key={product.id}>
              <h2>
                <NavLink to={`/products/${product.id}`}>{Product.name}</NavLink>
              </h2>
              <h3>Category: {product.category}</h3>
              <h4>Description: {product.description}</h4>
              <h4>Price: {product.price}</h4>
              <h4>Image: {product.image}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  }
}

const mapDispatch = (dispatch) => {
  return {
    allProducts: () => dispatch(fetchAllProducts()),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
