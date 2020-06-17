import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import DataManager from '../DataManager'

import { initialState as initialStateGnomes } from '../../redux/reducers/gnomes'
import { initialState as initialStateFilters } from '../../redux/reducers/filters'
import reducer from '../../redux/reducers'

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

describe('DataManager Component', () => {
  test('DataManager Snapshot', () => {
    expect(
      render(
        <DataManager>
          <h1>correct data</h1>
        </DataManager>,
        {
          initialState: { gnomesReducer: { pending: false, error: false } }
        }
      ).baseElement
    ).toMatchSnapshot()

    expect(
      render(
        <DataManager>
          <h1>data correct</h1>
        </DataManager>,
        {
          initialState: { gnomesReducer: { pending: true, error: false } }
        }
      ).baseElement
    ).toMatchSnapshot()

    expect(
      render(
        <DataManager>
          <h1>data correct</h1>
        </DataManager>,
        {
          initialState: { gnomesReducer: { pending: false, error: true } }
        }
      ).baseElement
    ).toMatchSnapshot()
  })

  test('DataManager should show loader if there is pending', () => {
    const { container } = render(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { gnomesReducer: { pending: true, error: false } }
      }
    )
    const loadingImg = container.querySelector('img')
    expect(loadingImg.getAttribute('alt')).toBe('loading')
    expect(loadingImg.getAttribute('src')).toBe(
      'https://createwebsite.net/wp-content/uploads/2015/09/Display-Loading.gif'
    )
  })

  test('DataManager should show children if is not pending and there is no error', () => {
    const { container } = render(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { gnomesReducer: { pending: false, error: false } }
      }
    )
    expect(container.querySelector('h1').innerHTML).toBe('data correct')
  })

  test('DataManager should show error message if there is error', () => {
    const { container } = render(
      <DataManager>
        <h1>data correct</h1>
      </DataManager>,
      {
        initialState: { gnomesReducer: { pending: false, error: true } }
      }
    )
    expect(container.querySelector('label').innerHTML).toBe(
      "We're having problems Searching Gnomes, try it in a few minutes"
    )
  })
})
