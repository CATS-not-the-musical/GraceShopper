import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orders: []}
    this.loading = true
  }
  async componentDidMount() {
    const {data} = await axios
      .get(`/api/orderhistory/users/${this.props.user.userId}`)
      .then((this.loading = false))
    this.setState({orders: data})
  }

  render() {
    const UserOrders = this.state.orders
    console.log(UserOrders)
    if (this.loading) {
      return <h1>Loading....</h1>
    } else {
      return (
        <div>
          <h1>Order History</h1>
          {UserOrders.map(order => {
            return (
              <div key={order.id}>
                <h1>Order Number{order.id}</h1>
                {order.cats.map(cat => {
                  return <div key={cat.id}>Cat No.{cat.id}</div>
                })}
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
