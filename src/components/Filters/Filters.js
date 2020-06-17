import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSetJobList, fetchSetName } from '../../redux/types'
import JobsFilter from './JobsFilter'
import NameFilter from './NameFilter'
import { getJobsByUsers, JOBS, ALL } from '../../utils/common'

//some filters
//by age
//by height
//by weight

const FilterList = styled.div`
  margin: auto;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  font-size: 28px;
  i {
    margin: 0 20px;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 1px 1px 5px 0px rgba(50, 50, 50, 0.75);
}

  }
  .open {
    color: #ffbe76;
  }
  .active {
    color: tomato;
  }
`

const Filters = () => {
  const dispatch = useDispatch()
  const { gnomes } = useSelector((state) => state.gnomesReducer)
  const { jobList, name } = useSelector((state) => state.filtersReducer)
  const currentJobList = gnomes.length > 0 ? getJobsByUsers(gnomes) : []
  const [filteredJobs, setFilteredJobs] = useState(jobList)
  const [jobVisible, setJobVisible] = useState(false)
  const [nameFilter, setNameFilter] = useState(name)
  const [nameVisible, setNameVisible] = useState(false)

  const haveJobs = () => jobList.length > 0

  const haveName = () => nameFilter !== ''

  const toggleJobFilter = (flag = !jobVisible) => {
    setJobVisible(flag)
  }
  const toggleNameFilter = (flag = !nameVisible) => {
    setNameVisible(flag)
  }

  const updateJobList = (job, active = false) => {
    if (active) {
      setFilteredJobs(filteredJobs.filter((element) => element !== job))
    } else {
      setFilteredJobs([...filteredJobs, job])
    }
  }

  const filterByName = (name) => {
    setNameFilter(name)
  }

  const removeFilters = () => {
    resetFilter(ALL)
  }

  const resetFilter = (filter) => {
    switch (filter) {
      case JOBS:
        setFilteredJobs([])
        break
      case ALL:
        setFilteredJobs([])
        setNameFilter('') //more filter reset
        break
      default:
        break
    }
  }

  useEffect(() => {
    setJobList()
  }, [filteredJobs])

  useEffect(() => {
    setName()
  }, [nameFilter])

  const setJobList = () => {
    dispatch({
      type: fetchSetJobList,
      data: {
        jobs: filteredJobs
      }
    })
  }
  const setName = () => {
    dispatch({
      type: fetchSetName,
      data: {
        name: nameFilter
      }
    })
  }
  return (
    <>
      <FilterList>
        <i
          data-testid="job-filter-button"
          className={`fas fa-hammer  ${jobVisible ? 'open' : ''} ${haveJobs() ? 'active' : ''} `}
          onClick={() => toggleJobFilter()}
        ></i>
        <i
          data-testid="name-filter-button"
          className={`fas fa-user ${nameVisible ? 'open' : ''} ${haveName() ? 'active' : ''} `}
          onClick={() => toggleNameFilter()}
        ></i>
        {(haveJobs() || haveName()) && (
          <i data-testid="reset-filter-button" className="fas fa-eraser" onClick={removeFilters}></i>
        )}
      </FilterList>
      <div data-testid="filter-container" className="filterActive">
        {jobVisible && (
          <JobsFilter list={currentJobList} activeList={jobList} onSelect={updateJobList} onClear={resetFilter} />
        )}
        {nameVisible && <NameFilter onChange={filterByName} current={nameFilter}></NameFilter>}
      </div>
    </>
  )
}

Filters.propTypes = {}

export default Filters
