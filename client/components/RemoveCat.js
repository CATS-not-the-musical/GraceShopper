import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {removeCatThunk} from '../store/cat'

class RemoveCat extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete() {
    this.props.removeCatThunk(this.props.match.params.id)
  }

  render() {
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
