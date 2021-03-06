import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllCats} from '../store/cat'

class AllCats extends React.Component {
  componentDidMount() {
    this.props.allCats()
  }
  render() {
    const Cats = this.props.cats
    if (!Cats) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <h1>Cats</h1>
          {Cats.map(cat => {
            return (
              <div className="container" key={cat.id}>
                <img src={`${cat.image}`} />
                <h2>
                  <NavLink to={`/cats/${cat.id}`}>
                    {cat.firstName} {cat.lastName}
                  </NavLink>
                </h2>
                <h3>Age: {cat.age}</h3>
                <h3>Adoption Status: {cat.adoptionStatus}</h3>
                <h3>Adoption Fee: {cat.adoptionFee}</h3>
                <button type="button" className="btn btn-primary btn-sm">
                  Adopt Me
                </button>
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
