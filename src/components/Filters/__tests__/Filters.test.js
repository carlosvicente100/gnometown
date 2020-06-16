import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render as rtlRender, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

import { initialState as initialStateGnomes } from '../../../redux/reducers/gnomes'
import { initialState as initialStateFilters } from '../../../redux/reducers/filters'
import reducer from '../../../redux/reducers'

import GnomesDummyList from '../../../fixtures/gnomes'

import Filters from '../Filters'

beforeEach(() => {
  jest.clearAllMocks()
})

const initialReducerState = {
  gnomesReducer: initialStateGnomes,
  filtersReducer: initialStateFilters
}

const profesionListNotEmpty = ['Metalworker', 'Woodcarver']
const nameFilterNotEmpty = 'Tobus'

function render(ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe('Filters Component Suite', () => {
  test('Snapshot check', () => {
    expect(render(<Filters />, { initialReducerState }).baseElement).toMatchSnapshot()
  })
})

describe('Filters Structure', () => {
  test('Should have a button for each filter - without active filters', () => {
    const dummyCityName = 'FunkyTown'
    const store = createStore(() => ({
      filtersReducer: {
        jobList: [],
        name: ''
      },
      gnomesReducer: {
        townName: dummyCityName,
        pending: false,
        error: null,
        gnomes: GnomesDummyList[0]
      }
    }))
    const { getByTestId } = render(<Filters />, { store })

    const jobButton = getByTestId('job-filter-button')
    expect(jobButton).toHaveClass('fa-hammer')
    expect(jobButton).not.toHaveClass('open')
    expect(jobButton).not.toHaveClass('active')

    const nameButton = getByTestId('name-filter-button')
    expect(nameButton).toHaveClass('fa-user')
    expect(nameButton).not.toHaveClass('active')
    expect(nameButton).not.toHaveClass('open')

    const filterContainer = getByTestId('filter-container')
    expect(filterContainer.children.length).toBe(0)
  })

  test('Should have Buttons with prop active  - with active filters', () => {
    const dummyCityName = 'FunkyTown'
    const store = createStore(() => ({
      filtersReducer: {
        jobList: profesionListNotEmpty,
        name: nameFilterNotEmpty
      },
      gnomesReducer: {
        townName: dummyCityName,
        pending: false,
        error: null,
        gnomes: GnomesDummyList[0]
      }
    }))
    const { getByTestId } = render(<Filters />, { store })
    const jobButton = getByTestId('job-filter-button')
    const nameButton = getByTestId('name-filter-button')
    expect(jobButton).not.toHaveClass('open')
    expect(nameButton).not.toHaveClass('open')

    expect(jobButton).toHaveClass('active')
    expect(nameButton).toHaveClass('active')

    fireEvent.click(jobButton)
    fireEvent.click(nameButton)
    expect(jobButton).toHaveClass('open')
    expect(nameButton).toHaveClass('open')
  })
})
