import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import GnomeList from '../GnomeList'

import GnomeFixtureList from '../../../fixtures/gnomes'

const dummyProps = {
  gnomes: [...GnomeFixtureList[0]['Brastlewark']],
  gnomesPerPage: 2
}

describe('Gnome Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<GnomeList {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Should a list with a maximum of gnomes - gnomesPerPage, gnomes', () => {
    const { getByTestId, queryByText, getByText } = render(<GnomeList {...dummyProps} />)
    const gnomeListContainer = getByTestId('gnome-list-container')

    expect(gnomeListContainer.children.length).toBe(2)
    expect(queryByText(/no gnomes founded/i)).toBeNull()

    expect(queryByText(/Load more gnomes/i)).toBeTruthy()
    const moreButton = getByText('Load more gnomes')

    fireEvent.click(moreButton)
    expect(gnomeListContainer.children.length).toBe(4)
  })

  test('Should not have  a list with gnomes - gnomes', () => {
    const { getByTestId, queryByText } = render(<GnomeList {...dummyProps} gnomes={[]} />)
    const gnomeListContainer = getByTestId('gnome-list-container')

    expect(gnomeListContainer.children.length).toBe(1)
    expect(queryByText(/no gnomes founded/i)).toBeTruthy()
    expect(queryByText(/Load more gnomes/i)).toBeNull()
  })
})
