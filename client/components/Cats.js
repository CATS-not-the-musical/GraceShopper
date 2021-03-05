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
    console.log(Cats)
    return (
      <div>
        <h1>Cats-Travis Integrated</h1>
        {Cats.map((cat) => {
          return (
            <div key={cat.id}>
              <h2>
                <NavLink to={`/cats/${cat.id}`}>
                  {cat.firstName} + ' ' + {cat.lastName}
                </NavLink>
              </h2>
              <h2>{cat.breed}</h2>
              <img src={`${cat.image}`} />
              <h3>Age: {cat.age}</h3>
              <h3>Adoption Status: {cat.adoptionStatus}</h3>
              <h3>Adoption Fee: {cat.adoptionFee}</h3>
              <h3>Description: {cat.description}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cats: state.cats,
  }
}

const mapDispatch = (dispatch) => {
  return {
    allCats: () => dispatch(fetchAllCats()),
  }
}

export default connect(mapState, mapDispatch)(AllCats)
