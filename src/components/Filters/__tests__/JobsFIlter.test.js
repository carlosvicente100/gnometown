import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import renderer from 'react-test-renderer'

import JobsFilter from '../JobsFilter'

const dummyProps = {
  list: ['Carpenter', 'Farmer', 'Stonecarver', 'Brewer', 'Tax inspector', 'Prospector'],
  activeList: ['Carpenter'],
  onSelect: jest.fn(),
  onClear: jest.fn()
}

describe('JobsFilter Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<JobsFilter {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('JobsFilter Structure', () => {
  test('Should have a checkbox for each list item - prop list, activeList', () => {
    const { getAllByTestId, getByTestId } = render(<JobsFilter {...dummyProps} />)
    const jobList = getAllByTestId('job-option')
    expect(jobList.length).toBe(dummyProps.list.length)
    expect(jobList[0].children[0].checked).toEqual(true)

    const resetButton = getByTestId('job-reset')
    expect(resetButton).toBeTruthy()
  })

  test('Should have a button to reset active filters -  onClear', () => {
    const { getAllByTestId, getByTestId } = render(<JobsFilter {...dummyProps} />)
    const jobList = getAllByTestId('job-option')
    const resetButton = getByTestId('job-reset')

    expect(jobList[0].children[0].checked).toEqual(true)

    fireEvent.click(resetButton)

    expect(dummyProps.onClear).toHaveBeenCalledTimes(1)
  })

  test('Should can active more filters -  onSelect', () => {
    const { getAllByTestId } = render(<JobsFilter {...dummyProps} />)
    const jobList = getAllByTestId('job-option')

    fireEvent.click(jobList[4].children[0])

    expect(dummyProps.onSelect).toHaveBeenCalledTimes(1)
  })
})
