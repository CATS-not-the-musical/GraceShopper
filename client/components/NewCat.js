import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {newCatThunk} from '../store/cat'

export class NewCat extends Component {
  constructor() {
    super()
    this.state = {
      breed: '',
      firstName: '',
      lastName: '',
      age: '',
      adoptionStatus: '',
      adoptionFee: '',
      description: '',
      image: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    this.props.newCat(this.state)
  }

  render() {
    const {
      breed,
      firstName,
      lastName,
      age,
      adoptionStatus,
      adoptionFee,
      description,
      image
    } = this.state
    return (

      <form onSubmit={this.handleSubmit} className="form-group">
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            name="breed"
            value={breed}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            name="age"
            value={age}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="adoptionStatus">Adoption Status</label>
          <input
            name="adoptionStatus"
            value={adoptionStatus}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="adoptionFee">Adoption Fee</label>
          <input
            name="adoptionFee"
            value={adoptionFee}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            value={description}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="image">Image Link</label>
          <input
            name="image"
            value={image}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
        <Link to="/cats"> Cancel</Link>
      </form>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    newCat: cat => dispatch(newCatThunk(cat, ownProps.history))
  }
}

export default connect(null, mapDispatch)(NewCat)
