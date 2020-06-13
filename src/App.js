import React from 'react'
import { useDispatch } from 'react-redux'
import { Router } from '@reach/router'

import Home from './components/Routes/Home'
import Profile from './components/Routes/Profile'
import * as types from './redux/types'
// import DataManager from './components/DataManager';

const App = () => {
  const dispatch = useDispatch()
  dispatch({
    type: types.fetchRequested,
    url: 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json',
    fetchSucceeded: types.fetchSucceededGnomes,
    fetchPending: types.fetchPendingGnomes,
    fetchFailed: types.fetchFailedGnomes
  })

  return (
    <React.StrictMode>
      <Router>
        <Home path="/" />
        <Profile path="/profile/:id" />
        {/* <ProfessionsFinder path="/profession/:name" /> */}
      </Router>
    </React.StrictMode>
  )
}

export default App
