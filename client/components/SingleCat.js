import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCat} from '../store/singleCat'

export class SingleCat extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCat(this.props.match.params.id)
    console.log('componentDidMount', this.props)
  }
  render() {
    const cat = this.props.singleCat
    if (!cat) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <h1>
            {cat.firstName} {cat.lastName}
          </h1>
          <h2>{cat.breed}</h2>
          <img src={`${cat.image}`} />
          <h3>Age: {cat.age}</h3>
          <h3>Adoption Status: {cat.adoptionStatus}</h3>
          <h3>Adoption Fee: {cat.adoptionFee}</h3>
          <h3>Description: {cat.description}</h3>
        </div>
      )
    }
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
