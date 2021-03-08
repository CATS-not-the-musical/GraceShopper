import React from 'react'
import {connect} from 'react-redux'
import {updateCat, fetchUpdateCat, fetchSingleCat} from '../store/singleCat'
import {Link} from 'react-router-dom'

class UpdateCat extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleCat(this.props.match.params.id)
  }

  handleChange(event) {
    this.props.updateCat(event.target.name, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchUpdateCat(this.props.match.params.id, {
      breed: this.props.breed,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      age: this.props.age,
      adoptionStatus: this.props.adoptionStatus,
      adoptionFee: this.props.adoptionFee,
      description: this.props.description,
      image: this.props.image
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div>
            <label htmlFor="breed">Breed:</label>
            <input
              name="breed"
              defaultValue={this.props.breed}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              defaultValue={this.props.firstName}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              defaultValue={this.props.lastName}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              name="image"
              defaultValue={this.props.image}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              name="age"
              defaultValue={this.props.age}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="adoptionStatus">Adoption Status:</label>
            <input
              name="adoptionStatus"
              defaultValue={this.props.adoptionStatus}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="adoptionFee">Adoption Fee:</label>
            <input
              name="adoptionFee"
              defaultValue={this.props.adoptionFee}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              name="description"
              defaultValue={this.props.description}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
          <Link to="/cats"> Cancel</Link>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    breed: state.singleCat.breed,
    firstName: state.singleCat.firstName,
    lastName: state.singleCat.lastName,
    age: state.singleCat.age,
    adoptionStatus: state.singleCat.adoptionStatus,
    adoptionFee: state.singleCat.adoptionFee,
    description: state.singleCat.description,
    image: state.singleCat.image,
    ownerId: state.singleCat.ownerId
  }
}

const mapDispatch = dispatch => {
  return {
    updateCat: (data, value) => {
      dispatch(updateCat(data, value))
    },
    fetchUpdateCat: (id, updatedCat) => {
      dispatch(fetchUpdateCat(id, updatedCat))
    },
    fetchSingleCat: id => {
      dispatch(fetchSingleCat(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateCat)
