import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {allUsers} from '../store/user'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.allUsers()
  }
  render() {
    const Users = this.props.users
    return (
      <div>
        <h1>All Users</h1>
        {Users.map(user => {
          return (
            <div key={user.id}>
              <h2>
                <NavLink to={`/users/${user.id}`}>
                  {user.firstName} {user.lastName}
                </NavLink>
                <img src={`${user.image}`} />
              </h2>
              <h2>{user.address}</h2>
              <h2>{user.email}</h2>
              <h3>{user.password}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    allUsers: () => dispatch(allUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
