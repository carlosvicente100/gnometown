import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import renderer from 'react-test-renderer'

import NameFilter from '../NameFilter'

const dummyProps = {
  current: 'Dummy Name',
  onChange: jest.fn()
}

describe('NameFilter Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<NameFilter {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('NameFilter Structure', () => {
  test('Should have an input for each list item - current', () => {
    const { getByTestId } = render(<NameFilter {...dummyProps} />)
    const nameInput = getByTestId('filter-name-input')

    expect(nameInput.getAttribute('value')).toEqual(dummyProps.current)
    expect(nameInput.getAttribute('placeholder')).toEqual('Gnome Name')
  })
})
describe('NameFilter Structure', () => {
  test('Should call onChange when change content - onChange', () => {
    const newInputValue = 'Kent C. Dodds'
    const { getByTestId } = render(<NameFilter {...dummyProps} />)
    const nameInput = getByTestId('filter-name-input')

    fireEvent.change(nameInput, { target: { value: newInputValue } })

    expect(dummyProps.onChange).toHaveBeenCalledTimes(1)
  })
})
