import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import GnomeDetail from '../GnomeDetail'

import GnomeFixtureList from '../../../fixtures/gnomes'

const dummyProps = {
  name: 'dummy Name',
  thumbnail: 'http://placekitten.com/200/300',
  age: 1337,
  weight: 12.12345,
  height: 123.45678,
  hair_color: 'Red',
  professions: ['Carpenter', 'Farmer', 'Stonecarver', 'Brewer', 'Tax inspector', 'Prospector'],
  friends: GnomeFixtureList[0]['Brastlewark']
}

describe('Gnome Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<GnomeDetail {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test('Should use simply props correcty - name, age, height, weight', () => {
  const { getByText, getByTestId } = render(<GnomeDetail {...dummyProps} />)
  const propSection = getByTestId('detail-properties')
  expect(getByText(dummyProps.name)).toBeInTheDocument()
  expect(getByText(`${dummyProps.age} years`)).toBeInTheDocument()
  expect(getByText(`${parseFloat(dummyProps.height).toFixed(2)} cm`)).toBeInTheDocument()
  expect(getByText(`${parseFloat(dummyProps.weight).toFixed(2)} kg`)).toBeInTheDocument()
})

test('Should use image prop correcty', () => {
  const { getByTestId } = render(<GnomeDetail {...dummyProps} />)
  const gnomeImage = getByTestId('detail-image')
  expect(gnomeImage.getAttribute('src')).toBe(dummyProps.thumbnail)
})

test('Should list professions prop correcty, only 3, limited size', () => {
  const { getByTestId } = render(<GnomeDetail {...dummyProps} />)
  const professions = getByTestId('detail-professions')
  expect(professions.querySelector('h3').innerHTML).toBe('Professions')

  const professionList = professions.children[1]

  expect(professionList.children.length).toBe(dummyProps.professions.length)
})

test('Should list friends prop correcty', () => {
  const { getByTestId } = render(<GnomeDetail {...dummyProps} />)
  const friends = getByTestId('detail-friends')
  expect(friends.querySelector('h3').innerHTML).toBe('Friends')

  const friendList = friends.children[1]

  expect(friendList.children.length).toBe(dummyProps.friends.length)
})

describe('Gnome Component Suite - exceptions', () => {
  test('Should render without friends ', () => {
    const { queryByTestId } = render(<GnomeDetail {...dummyProps} friends={[]} />)
    expect(queryByTestId('detail-friends')).toBeNull()
  })

  test('Should render without professions ', () => {
    const { queryByTestId } = render(<GnomeDetail {...dummyProps} professions={[]} />)
    expect(queryByTestId('detail-professions')).toBeNull()
  })
})
