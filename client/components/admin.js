import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchAllUsers} from '../store/user'
import {fetchAllCats} from '../store/cat'

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      current: []
    }
    this.renderUserState = this.renderUserState.bind(this)
    this.renderCatState = this.renderCatState.bind(this)
  }
  componentDidMount() {
    this.props.getAllUsers()
    this.props.getAllCats()
  }

  renderUserState() {
    this.setState({current: this.props.allUsers})
    this.forceUpdate()
  }

  renderCatState() {
    this.setState({current: this.props.allCats})
    this.forceUpdate()
  }

  render() {
    if (this.state.current.length < 1) {
      return (
        <div>
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => {
              this.renderUserState()
            }}
          >
            Users
          </button>{' '}
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => {
              this.renderCatState()
            }}
          >
            Cats
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={() => {
                this.renderUserState()
              }}
            >
              Users
            </button>{' '}
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={() => {
                this.renderCatState()
              }}
            >
              Cats
            </button>{' '}
            <NavLink to="/newcat">
              <button className="btn btn-primary btn-lg" type="button">
                Add Cat
              </button>
            </NavLink>
          </div>
          <br />
          <div className="productsContainer">
            {this.state.current.map(user => {
              return (
                <div className="products" key={user.id}>
                  <img className="rounded-circle" src={`${user.image}`} />
                  <div>
                    <h1>
                      {user.firstName} {user.lastName}
                    </h1>
                    <h2>{user.email}</h2>
                    <NavLink to={`/cats/${user.id}/update`}>
                      <button className="btn btn-primary btn-lg" type="button">
                        Edit
                      </button>
                    </NavLink>{' '}
                    <NavLink to={`/cats/${user.id}/remove`}>
                      <button className="btn btn-primary btn-lg" type="button">
                        Delete
                      </button>
                    </NavLink>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    allUsers: state.user.allUsers,
    allCats: state.cats
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(fetchAllUsers()),
    getAllCats: () => dispatch(fetchAllCats())
  }
}

export default connect(mapState, mapDispatch)(Admin)
