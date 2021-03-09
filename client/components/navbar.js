import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, role}) => (
  <div>
    <h1>CatShopper</h1>
    <h5>Brought to you by:</h5>
    <h2>Cats! (not the musical) </h2>
    <nav>
      {role === 'admin' ? (
        <div>
          {/* The navbar will show these links after you log in if you are an admin*/}
          <Link to="/home">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/cart">Cardboard Box</Link>
          <Link to="/orderhistory/users/:id">Order History</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cart">Cardboard Box</Link>
          <Link to="/orderhistory/users/:id">Order History</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cats">Cats</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
