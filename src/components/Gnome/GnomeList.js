import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Gnome from './Gnome'
import GnomePagination from './GnomePagination'

const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  margin: auto;
  column-gap: 20px;
  row-gap: 5px;
  margin: 20px;

  a {
    text-decoration: none;
    width: fit-content;
    margin: auto;

    margin: 0;
    width: 100%;
  }

  @media (min-width: 688px) {
  }
  @media (min-width: 900px) {
  }
  @media (min-width: 1201px) {
    row-gap: 20px;
    grid-template-columns: auto auto auto auto;
    a {
      width: fit-content;
      margin: auto;
    }
  }
  @media (min-width: 1501px) {
    grid-template-columns: auto auto auto auto auto;
  }
`

const GnomeList = ({ gnomes, gnomesPerPage = 5 }) => {
  const [page, setPage] = useState(1)

  const loadMoreUsers = () => {
    setPage(page + 1)
  }

  const moreUsers = gnomesPerPage * page >= gnomes.length ? false : true

  console.log('/// gnomes', gnomes)
  console.log('/// gnomesPerPage', gnomesPerPage)

  return (
    <>
      <ItemListContainer className="GnomeList">
        {gnomes.length > 0 ? (
          gnomes.filter((a, index) => index < gnomesPerPage * page).map((gnome) => <Gnome key={gnome.id} {...gnome} />)
        ) : (
          //  gnomes.map((gnome) => <Gnome key={gnome.id} {...gnome} />)
          <div>no gnomes founded :(</div>
        )}
      </ItemListContainer>
      {moreUsers && <GnomePagination onClick={loadMoreUsers} />}
    </>
  )
}

GnomeList.propTypes = {
  gnomes: PropTypes.array.isRequired
}
GnomeList.defaultProps = {}

export default GnomeList
