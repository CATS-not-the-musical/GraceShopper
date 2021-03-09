import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.loading = true
  }
  async componentDidMount() {
    const {data} = await axios.get(
      `/api/orderhistory/users/${this.props.user.userId}`
    )
    console.log(data)
    this.setState(data)
  }

  render() {
    console.log('This is the state', this.state)
    const UserOrders = this.state
    console.log('This is userOrders', this.state.cats)
    if (this.loading) {
      return <h1>Loading....</h1>
    } else {
      return (
        <div>
          <h1>Order History</h1>
          {UserOrders.map(user => {
            return (
              <div key={user}>
                <h3>Quantity: {user}</h3>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(OrderHistory)
