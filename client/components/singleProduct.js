import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.params.match.id)
  }
  render() {
    const product = this.props.singleProduct
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={`${product.image}`}></img>
        <h3>Description: {product.description}</h3>
        <h3>Category: {product.category}</h3>
        <h3>Price: {product.price}</h3>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id))
    },
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
