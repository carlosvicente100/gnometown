import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import GnomePagination from '../GnomePagination'

const dummyProps = {
  text: 'multiply Gnomes',
  onClick: jest.fn()
}

describe('GnomePagination Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<GnomePagination {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Should have the properly text -  text', () => {
    const { getByText } = render(<GnomePagination {...dummyProps} />)
    expect(getByText(dummyProps.text)).toBeTruthy()
  })

  test('Should call onClick when clicks it -  onClick', () => {
    const { getByText } = render(<GnomePagination {...dummyProps} />)
    expect(dummyProps.onClick).toBeCalledTimes(0)

    fireEvent.click(getByText(dummyProps.text))

    expect(dummyProps.onClick).toBeCalledTimes(1)
  })
})
