import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {fetchUpdatedUser} from '../store/user'

const initialState = {
  address: '',
  email: '',
  firstName: '',
  image: '',
  lastName: '',
  role: ''
}

class Account extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      address: this.props.user.address,
      email: this.props.user.email,
      firstName: this.props.user.firstName,
      image: this.props.user.image,
      lastName: this.props.user.lastName,
      role: this.props.user.role
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
    toast.info('Account information has been updated')
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <div className="title">
          <h1>Edit Account</h1>
          <h2>
            {this.props.user.firstName} {this.props.user.lastName}
          </h2>
        </div>

        <div>
          <form onSubmit={this.handleSubmit} className="form-group">
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <input
                name="role"
                value={this.state.role}
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (user, value) => {
      dispatch(fetchUpdatedUser(user, value))
    }
  }
}

export default connect(mapState, mapDispatch)(Account)
