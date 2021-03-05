import React from 'react'
import {connect} from 'react-redux'
import {updateCat, fetchUpdateCat} from '../store/singleCat'

class UpdateCat extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      image: this.props.image,
      ownerId: this.props.ownerId
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input
              name="breed"
              value={this.props.breed}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              value={this.props.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              value={this.props.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              name="image"
              value={this.props.image}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              name="age"
              value={this.props.age}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="adoptionStatus">Adoption Status:</label>
            <input
              name="adoptionStatus"
              value={this.props.adoptionStatus}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="adoptionFee">Adoption Fee:</label>
            <input
              name="adoptionFee"
              value={this.props.adoptionFee}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              name="description"
              value={this.props.description}
              onChange={this.handleChange}
            />
            <div>
              <label htmlFor="ownerId">Owner ID:</label>
              <input
                name="ownerId"
                value={this.props.ownerId}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  console.log('this is the state for Update', state)
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
    updateCampusThunk: (id, updatedCat) => {
      dispatch(fetchUpdateCat(id, updatedCat))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateCat)
