import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Pagination from '../Pagination'
import fixtureItemList from '../../../fixtures/gnomes'

const dummyProps = {
  setCurrentPage: jest.fn(),
  totalPagination: [[fixtureItemList], [fixtureItemList]],
  current: 1 //second position
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Pagination Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<Pagination {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('Pagination Structure', () => {
    test('Should contain some elements - two buttons and a list of pages with current active ', () => {
      const { getByText } = render(<Pagination {...dummyProps} />)
      expect(getByText('<')).toBeInTheDocument()
      expect(getByText('>')).toBeInTheDocument()
      expect(getByText('1')).toBeInTheDocument()
      expect(getByText('2')).toBeInTheDocument()
      expect(getByText('2')).toHaveClass('active') //second position
    })
  })
  describe('Pagination Functionallity', () => {
    test("Shouldn't call setCurrentPage on click next Page from Last Page", () => {
      const { getByText } = render(<Pagination {...dummyProps} />)

      expect(getByText('>')).toHaveAttribute('disabled')
      fireEvent.click(getByText('>'))

      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(0)
    })

    test('Should call setCurrentPage on click prev Page from Last Page', () => {
      const { getByText } = render(<Pagination {...dummyProps} />)

      expect(getByText('<')).not.toHaveAttribute('disabled')
      fireEvent.click(getByText('<'))

      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(1)
      expect(dummyProps.setCurrentPage).toHaveBeenCalledWith(dummyProps.current - 1)
    })

    test('Should call setCurrentPage on click different page value from current', () => {
      const { getByText } = render(<Pagination {...dummyProps} />)
      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(0)

      expect(getByText('1')).not.toHaveClass('active')
      fireEvent.click(getByText('1'))
      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(1)
      expect(dummyProps.setCurrentPage).toHaveBeenCalledWith(dummyProps.current - 1)
    })

    test("Shouldn't call setCurrentPage on click same page value from current", () => {
      const { getByText } = render(<Pagination {...dummyProps} />)
      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(0)

      expect(getByText('2')).toHaveClass('active')
      fireEvent.click(getByText('2'))
      expect(dummyProps.setCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})
