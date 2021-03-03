import React from 'react'
import {connect} from 'react-redux'
import {fetchAllCats} from '../store/cat'

class AllCats extends React.Component {
  componentDidMount() {
    this.props.allCats()
  }
  render() {
    if (!this.props.cats) {
      return <h1>Loading...</h1>
    } else {
      const Cats = this.props.cats
      return (
        <div>
          <h1>Cats</h1>
          {Cats.map(cat => {
            return (
              <div key={cat.id}>
                <h2>
                  <NavLink to={`/cats/${cat.id}`}>{cat.name}</NavLink>
                </h2>
                <h3>Category: {cat.category}</h3>
                <h4>Description: {cat.description}</h4>
                <h4>Price: {cat.price}</h4>
                <img src={`${cat.image}`} />
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
    cats: state.cats
  }
}

const mapDispatch = dispatch => {
  return {
    allCats: () => dispatch(fetchAllCats())
  }
}

export default connect(mapState, mapDispatch)(AllCats)
