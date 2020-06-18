import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { filterByJob, filterByName } from '../../utils/common'
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
const Home = () => {
  const { gnomes = [] } = useSelector((state) => state.gnomesReducer)
  const { jobList, name } = useSelector((state) => state.filtersReducer)
  let gnomesFiltered = gnomes

  if (gnomes.length > 0) {
    gnomesFiltered = filterByJob(jobList, gnomesFiltered)
    if (name !== '') {
      gnomesFiltered = filterByName(name, gnomesFiltered)
    }
  }

  return (
    <HomeContainer data-testid="Home-page">
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
