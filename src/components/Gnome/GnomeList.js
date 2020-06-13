import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Card from './Gnome'

const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  margin: auto;
  column-gap: 20px;
  row-gap: 20px;
  margin-inline-start: 20px;
  margin-inline-end: 20px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    width: fit-content;
    margin: auto;
  }

  @media (min-width: 688px) {
    grid-template-columns: auto auto;
  }
  @media (min-width: 900px) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 1201px) {
    grid-template-columns: auto auto auto auto;
  }
  @media (min-width: 1501px) {
    grid-template-columns: auto auto auto auto auto;
  }
`

const ItemList = ({ items }) => {
  return (
    <ItemListContainer className="ItemList">
      {items.length > 0 ? items.map((item) => <Card key={item.id} {...item} />) : <div>no gnomes founded :(</div>}
    </ItemListContainer>
  )
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired
}
ItemList.defaultProps = {}

export default ItemList
