import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Gnome from '../Gnome'

const dummyProps = {
  id: 1337,
  name: 'dummy Name',
  thumbnail: 'http://placekitten.com/200/300',
  age: 240,
  weight: 40.97596,
  height: 127.88554,
  hair_color: 'Red',
  professions: ['Carpenter', 'Farmer', 'Stonecarver', 'Brewer', 'Tax inspector', 'Prospector'],
  friends: ['Sarabink Tinkbuster', 'Tinadette Wrongslicer']
}

describe('Gnome Component Suite', () => {
  test('Snapshot check', () => {
    const component = renderer.create(<Gnome {...dummyProps} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Should have Link - prop id', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} />)
    const gnomeLink = getByTestId('gnome-url')
    expect(gnomeLink.getAttribute('href')).toBe(`/profile/${dummyProps.id}`)
  })

  test('Should use simply props correcty - name, age, height, weight', () => {
    const { getByText } = render(<Gnome {...dummyProps} />)
    expect(getByText(dummyProps.name)).toBeInTheDocument()
    expect(getByText(`${dummyProps.age} years`)).toBeInTheDocument()
    expect(getByText(`${parseFloat(dummyProps.height).toFixed(2)} cm`)).toBeInTheDocument()
    expect(getByText(`${parseFloat(dummyProps.weight).toFixed(2)} kg`)).toBeInTheDocument()
  })
  test('Should use image prop correcty', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} />)
    const gnomeImage = getByTestId('gnome-image')
    expect(gnomeImage.getAttribute('src')).toBe(dummyProps.thumbnail)
  })

  test('Should list professions prop correcty, only 3, limited size', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} />)
    const professions = getByTestId('gnome-professions')
    expect(professions.querySelector('h3').innerHTML).toBe('Professions')

    const professionList = professions.children[1]

    expect(professionList.children.length).toBe(4)
    expect(professionList.children[0].className === 'job-element')
    expect(professionList.children[0].innerHTML).toBe(dummyProps.professions[0])
    expect(professionList.children[1].innerHTML).toBe(dummyProps.professions[1])
    expect(professionList.children[2].innerHTML).toBe(dummyProps.professions[2])
    expect(professionList.children[3].innerHTML).toBe('and more...')
  })

  test('Should list friends prop correcty', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} />)
    const friends = getByTestId('gnome-friends')
    expect(friends.querySelector('h3').innerHTML).toBe('Friends')

    const friendList = friends.children[1]

    expect(friendList.children.length).toBe(2)
    expect(friendList.children[0].className === 'friend-element')
    expect(friendList.children[0].innerHTML).toBe(dummyProps.friends[0])
    expect(friendList.children[1].innerHTML).toBe(dummyProps.friends[1])
  })
})

describe('Gnome Component Suite - exceptions', () => {
  test('Should render without friends ', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} friends={[]} />)
    const friends = getByTestId('gnome-friends')
    expect(friends.querySelector('span').innerHTML).toBe('¯\\_(ツ)_/¯')
  })

  test('Should render without professions ', () => {
    const { getByTestId } = render(<Gnome {...dummyProps} professions={[]} />)
    const friends = getByTestId('gnome-professions')
    expect(friends.querySelector('span').innerHTML).toBe('¯\\_(ツ)_/¯')
  })
})
