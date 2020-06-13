import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSetJobList } from '../../redux/types'

import JobsFilter from './JobsFilter'
import { getJobsByUsers, JOBS } from '../../utils/filters'

//some filters
//by name
//by age
//by height
//by weight
//by hairColor ?

const Filters = ({ updateFilters }) => {
  const dispatch = useDispatch()
  const { gnomes } = useSelector((state) => state.gnomesReducer)
  const { jobList } = useSelector((state) => state.filtersReducer)
  const currentJobList = gnomes.length > 0 ? getJobsByUsers(gnomes) : [] //all jobs posibles
  const [filteredJobs, setFilteredJobs] = useState(jobList)
  const [jobVisible, setJobVisible] = useState(true)

  const toggleJobFilter = () => {
    setJobVisible(!jobVisible)
  }

  const updateJobList = (job, active = false) => {
    if (active) {
      setFilteredJobs(filteredJobs.filter((element) => element !== job))
    } else {
      setFilteredJobs([...filteredJobs, job])
    }
  }

  const resetFilter = (filter) => {
    switch (filter) {
      case JOBS:
        console.log('reset job filters!')
        setFilteredJobs([])
        break
      default:
        break
    }
  }

  useEffect(() => {
    console.log('useEffect Called')
    setJobList()
  }, [filteredJobs])

  const setJobList = () => {
    console.log('------------, filteredJobs', filteredJobs)
    //  updateFilters()
    dispatch({
      type: fetchSetJobList,
      data: {
        jobs: filteredJobs
      }
    })
  }
  return (
    <div>
      Filters go Here!
      <button onClick={toggleJobFilter}>
        <i class="fas fa-hammer"></i>
      </button>
      {jobVisible && (
        <JobsFilter list={currentJobList} activeList={jobList} onSelect={updateJobList} onClear={resetFilter} />
      )}
    </div>
  )
}

Filters.propTypes = {}

export default Filters
