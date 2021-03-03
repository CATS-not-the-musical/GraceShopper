import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchAllProducts} from '../store/product'

class AllProducts extends React.Component {
  componentDidMount() {
    console.log('allproducts did mount')
    this.props.allProducts()
  }
  render() {
    console.log('render----allproducts')
    //suggest looking into loading state-change loading to true in component will unmount
    if (!this.props.products) {
      return <h1>Loading...</h1>
    } else {
      const Products = this.props.products
      console.log('Render All Products')
      return (
        <div>
          <h1>Products-Travis Integrated</h1>
          {Products.map((product) => {
            return (
              <div key={product.id}>
                <h2>
                  <NavLink to={`/products/${product.id}`}>
                    {product.name}
                  </NavLink>
                </h2>
                <h3>Category: {product.category}</h3>
                <h4>Description: {product.description}</h4>
                <h4>Price: {product.price}</h4>
                <img src={`${product.image}`} />
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    loading: state.loading,
  }
}

const mapDispatch = (dispatch) => {
  return {
    allProducts: () => dispatch(fetchAllProducts()),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)