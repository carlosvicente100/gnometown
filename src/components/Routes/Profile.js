import React from 'react'
import { useParams } from '@reach/router'
import { useSelector } from 'react-redux'
import Banner from '../Banner/Banner'
import GnomeDetail from '../Gnome/GnomeDetail'

const Profile = () => {
  let { id } = useParams()
  id = parseInt(id)
  console.log('id!', id)
  const { gnomes = [] } = useSelector((state) => state.gnomesReducer)
  const gnome = gnomes.find((gnome) => gnome.id === id)
  const friends = gnomes.filter(({ name } = u) => gnome.friends.includes(name))

  return (
    <>
      <Banner />
      {gnome && <GnomeDetail {...gnome} friends={friends} />}
    </>
  )
}

export default Profile
