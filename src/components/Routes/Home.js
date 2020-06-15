import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { makePagination, filterByJob, filterByName } from '../../utils/filters'
import Banner from '../Banner/Banner'
import ItemList from '../Gnome/gnomeList'
import Pagination from '../Pagination/Pagination'
import Filters from '../Filters/Filters'

const HomeContainer = styled.div`
  text-align: center;
  font-family: Helvetica;
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
  let gnomesFiltered = gnomes // []

  //filter
  if (gnomes.length > 0) {
    gnomesFiltered = filterByJob(jobList, gnomesFiltered)
    if (name !== '') {
      gnomesFiltered = filterByName(name, gnomesFiltered)
    }
  }

  let paginatedGnomes = makePagination(gnomesFiltered)

  const updateFilters = () => {
    setCurrentPage(0)
  }

  return (
    <HomeContainer>
      <Banner isHome={true}></Banner>
      <Filters updateFilters={updateFilters}></Filters>
      <div className="gnomes-length">{`Current Gnomes: ${gnomesFiltered.length}`}</div>
      {paginatedGnomes.length > 0 ? (
        <>
          <ItemList items={paginatedGnomes[currentPage]}></ItemList>
          <Pagination
            setCurrentPage={setCurrentPage}
            totalPagination={paginatedGnomes}
            current={currentPage}
          ></Pagination>
        </>
      ) : (
        <div className="NoResults">
          <p>
            {error ? "We're having problems Searching Gnomes, try it in a few minutes" : "no gnomes, don't be exigent "}
          </p>
        </div>
      )}
    </HomeContainer>
  )
}

Home.propTypes = {}

export default Home
