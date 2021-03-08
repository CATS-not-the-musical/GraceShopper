import React from 'react'
import Cats from './components/Cats'
import {Navbar} from './components'
import Routes from './routes'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = () => toast('Wow so easy !')

const App = () => {
  return (
    <div>
      <div />
      <Navbar />
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
