import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {removeCatThunk} from '../store/cat'
import {SingleCat} from './SingleCat'

class RemoveCat extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete() {
    this.props.removeCatThunk(this.props.match.params.id)
  }

  render() {
    const cat = SingleCat
    return (
      <div>
        <div>Remove Cat: Are you sure?</div>
        <div>
          <button
            type="submit"
            onClick={() => this.handleDelete(this.props.match.params.id)}
          >
            Yes
          </button>
          <NavLink to={`/cats/${this.props.match.params.id}`}>
            <button type="submit">No</button>
          </NavLink>
        </div>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    removeCat: id => dispatch(removeCatThunk(id, ownProps.history))
  }
}

export default connect(null, mapDispatch)(RemoveCat)
