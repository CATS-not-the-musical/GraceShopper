import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './navbar'
import getAllUsers from '../store/user'

class Admin extends React.Component {
  componentDidMount() {
    this.props.allUsers()
  }

  render() {
    const users = this.props.allUsers
    console.log(users)
    return (
      <div>
        <Navbar />
        <button>Add</button>
        <button>Edit</button>
        <button>Delete</button>
        {users.map(user => {
          return (
            <div key={user.id}>
              <img src={`${user.image}`} />
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <h2>{user.email}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    allUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapState, mapDispatch)(Admin)
