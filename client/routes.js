import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import Cats from './components/Cats'
import SingleCat from './components/SingleCat'
import RemoveCat from './components/RemoveCat'
import Admin from './components/admin'
import UpdateCat from './components/UpdateCat'
import Cart from './components/cart'
import NewCat from './components/NewCat'
import OrderHistory from './components/OrderHistory'
import Account from './components/Account'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cats" component={Cats} />
        <Route exact path="/cats/:id/remove" component={RemoveCat} />
        <Route exact path="/cats/:id/update" component={UpdateCat} />
        <Route path="/cats/:id" component={SingleCat} />
        <Route exact path="/newcat" component={NewCat} />
        <Route exact path="/orderhistory/users/:id" component={OrderHistory} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/cart" component={Cart} />
            <Route path="/home" component={UserHome} />
            <Route path="/admin" component={Admin} />
            <Route path="/account" component={Account} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
