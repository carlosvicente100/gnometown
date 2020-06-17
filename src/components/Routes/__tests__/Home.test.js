import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { initialState as initialStateGnomes } from '../../../redux/reducers/gnomes'
import { initialState as initialStateFilters } from '../../../redux/reducers/filters'
import reducer from '../../../redux/reducers'

import Home from '../Home'

import GnomeFixtureList from '../../../fixtures/gnomes'

const initialReducerState = {
  gnomesReducer: initialStateGnomes,
  filtersReducer: initialStateFilters
}

function render(ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Home Route Component', () => {
  test('Home Route Snapshot', () => {
    expect(render(<Home />, { initialReducerState }).baseElement).toMatchSnapshot()
  })

  test('Should Show Current Gnome List lenght - gnomesReducer', () => {
    const gnomeList = GnomeFixtureList[0]['Brastlewark']
    const store = createStore(() => ({
      filtersReducer: {
        jobList: [],
        name: ''
      },
      gnomesReducer: {
        townName: 'Rivendel',
        pending: false,
        error: null,
        gnomes: gnomeList
      }
    }))

    const { getByText, findByText } = render(<Home />, { store })
    expect(getByText(/Current Gnomes:/i)).toBeTruthy()

    expect(findByText(/Current Gnomes: #[3-5]/)).toBeTruthy()
  })
})
