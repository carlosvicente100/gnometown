import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { JOBS } from '../../utils/filters'

const JobList = styled.div`
font-family:Helvetica;
display: flex;
flex-wrap: wrap;
background-color:#8395a7;
color:white;
}
`
const JobOption = styled.div`
  margin: 5px 15px;
`

const JobsFilter = ({ list, activeList, onSelect, onClear }) => {
  const handleClick = (event) => {
    onSelect(event.target.value, activeList.includes(event.target.value))
  }
  const handleReset = () => {
    onClear(JOBS)
  }

  const OptionList = () => {
    return list.map((option, key) => {
      // console.log('active', activeList.includes(option))
      return (
        <JobOption key={key}>
          <input
            type="checkbox"
            id={option}
            value={option}
            checked={activeList.includes(option)}
            onChange={handleClick}
          ></input>
          <label htmlFor={option}> {option}</label>
        </JobOption>
      )
    })
  }

  return (
    <div>
      {list.length > 0 && (
        <JobList>
          <OptionList></OptionList>
          <button onClick={handleReset}>Reset Filter</button>
        </JobList>
      )}
    </div>
  )
}

JobsFilter.propTypes = {}

export default JobsFilter