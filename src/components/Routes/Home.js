import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { makePagination, filterByJob, filterByName } from '../../utils/filters'
import Banner from '../Banner/Banner'
import GnomeList from '../Gnome/GnomeList'
import Filters from '../Filters/Filters'
import DataManager from '../DataManager.js'

const HomeContainer = styled.div`
  text-align: center;
  font-family: Helvetica;
  .NoResults {
    display: flex;
    justify-content: center;
    align-items: center;
    width 100%;
    height:300px;
    grid-area: NoResults;
  }
`
//at the moment, not used
const HomeContainer2 = styled.div`
  font-family: verdana;
  height: -webkit-fill-available;
  height: 98vh;
  background-color: #2c2c54;
  display: grid;
  grid-template-columns: auto 500px auto;
  row-gap: 20px;
  grid-template-areas:
    ". Filters ."
    "ItemList ItemList ItemList"
    "NoResults NoResults NoResults"
    ". Pagination .";

  div.Filters {
    grid-area: Filters;
  }
  div.ItemList {
    grid-area: ItemList;
  }
  div.NoResults {
    background:#2980b9;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    width 100%;
    height:300px;
    grid-area: NoResults;
  }
  div.Pagination {
    grid-area: Pagination;
  }
`

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const { gnomes = [], error } = useSelector((state) => state.gnomesReducer)
  const { jobList, name, endDate } = useSelector((state) => state.filtersReducer)
  let gnomesFiltered = gnomes

  //filter
  if (gnomes.length > 0) {
    gnomesFiltered = filterByJob(jobList, gnomesFiltered)
    if (name !== '') {
      gnomesFiltered = filterByName(name, gnomesFiltered)
    }
  }

  return (
    <HomeContainer>
      <Banner isHome={true}></Banner>
      <Filters></Filters>
      <div className="gnomes-length">{`Current Gnomes: ${gnomesFiltered.length}`}</div>
      <DataManager>
        <GnomeList gnomes={gnomesFiltered} gnomesPerPage={20}></GnomeList>
      </DataManager>
    </HomeContainer>
  )
}

Home.propTypes = {}

export default Home
