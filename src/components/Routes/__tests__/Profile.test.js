import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { Router } from '@reach/router'
import { createHistory, createMemorySource, LocationProvider } from '@reach/router'

import { initialState as initialStateGnomes } from '../../../redux/reducers/gnomes'
import reducer from '../../../redux/reducers'

import Profile from '../Profile'

import GnomeFixtureList from '../../../fixtures/gnomes'

export function renderRouteRedux(
  ui,
  {
    route = '/',
    history = createHistory(createMemorySource(route)),
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <LocationProvider history={history}>{children}</LocationProvider>
      </Provider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const initialReducerState = {
  gnomesReducer: initialStateGnomes
}

function render(ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Proflie Route Component', () => {
  it('Proflie Route Snapshot', () => {
    expect(
      renderRouteRedux(
        <Router>
          <Profile path="/profile/:id" />
        </Router>,
        {
          route: '/profile/0',
          initialState: { gnomesReducer: { gnomes: GnomeFixtureList[0]['Brastlewark'] } }
        }
      ).baseElement
    ).toMatchSnapshot()
  })
})
