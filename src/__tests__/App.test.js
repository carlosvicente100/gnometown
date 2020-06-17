import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { createHistory, createMemorySource, LocationProvider } from '@reach/router'

import { initialState as initialStateGnomes } from '../redux/reducers/gnomes'
import { initialState as initialStateFilters } from '../redux/reducers/filters'
import reducer from '../redux/reducers'

const initialReducerState = {
  gnomesReducer: initialStateGnomes,
  filtersReducer: initialStateFilters
}

import App from '../App'

function renderReduxWithRouter(
  ui,
  {
    route = '/',
    history = createHistory(createMemorySource(route)),
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <LocationProvider history={history}>{ui}</LocationProvider>
      </Provider>
    ),
    history
  }
}

describe('App test', () => {
  test('full app rendering/navigating', async () => {
    const {
      history: { navigate },
      getByTestId
    } = renderReduxWithRouter(<App />, {
      initialState: initialReducerState
    })

    await act(() => navigate('/'))
    expect(getByTestId('Home-page')).toBeTruthy()

    await navigate('/profile/0')
    expect(getByTestId('Profile-page')).toBeTruthy()
  })

  test('landing on a bad page', () => {
    const { container } = renderReduxWithRouter(<App />, {
      initialState: initialReducerState,
      route: '/something-that-does-not-match'
    })
    expect(container.innerHTML).toMatch('<div></div>')
  })
})
