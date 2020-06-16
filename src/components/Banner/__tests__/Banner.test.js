import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { initialState as initialStateGnomes } from '../../../redux/reducers/gnomes'
import reducer from '../../../redux/reducers'

import Banner from '../Banner'

beforeEach(() => {
  jest.clearAllMocks()
})

const initialReducerState = {
  gnomesReducer: initialStateGnomes
}

function render(ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

const dummyProps = {
  isHome: true
}

describe('Banner Component Suite', () => {
  test('Snapshot check', () => {
    expect(render(<Banner />, { initialReducerState }).baseElement).toMatchSnapshot()
  })
})

describe('Banner Structure', () => {
  test('Should have a Label - townName by redux', () => {
    const dummyCityName = 'FunkyTown'
    const store = createStore(() => ({
      gnomesReducer: {
        townName: dummyCityName,
        pending: false,
        error: null,
        gnomes: []
      }
    }))
    const { getByTestId } = render(<Banner {...dummyProps} />, { store }) //banner-town-name
    const townName = getByTestId('banner-town-name')
    expect(townName.innerHTML).toBe(`${dummyCityName} citizens`)
  })

  test('Should have an icon to go Back - isHome prop', () => {
    const dummyCityName = 'FunkyTown'
    const store = createStore(() => ({
      gnomesReducer: {
        townName: dummyCityName,
        pending: false,
        error: null,
        gnomes: []
      }
    }))
    const { getByTestId } = render(<Banner isHome={false} />, { store }) //banner-town-name
    const backDiv = getByTestId('banner-go-home')
    const HomeLink = backDiv.children[0]
    expect(HomeLink.getAttribute('href')).toBe('/')
    expect(HomeLink.children[0].getAttribute('class')).toBe('fas fa-home')
  })
})
