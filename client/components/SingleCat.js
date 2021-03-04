import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCat} from '../store/singleCat'

export class SingleCat extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCat(this.props.params.match.id)
  }
  render() {
    const cat = this.props.singleCat
    return (
      <div>
        <h1>{cat.name}</h1>
        <img src={`${cat.image}`} />
        <h3>Description: {cat.description}</h3>
        <h3>Category: {cat.category}</h3>
        <h3>Price: {cat.price}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleCat: state.singleCat
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCat: id => {
      dispatch(fetchSingleCat(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCat)
