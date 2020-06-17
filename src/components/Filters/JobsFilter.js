import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { JOBS } from '../../utils/common'

const JobList = styled.div`
font-family:Helvetica;
display: flex;
flex-wrap: wrap;
background-color:#8395a7;
color:white;
text-align:center;
i{
  color:black;
  margin: 5px 0px;
}
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
      return (
        <JobOption key={key} data-testid="job-option">
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
          <i data-testid="job-reset" className="fas fa-eraser" onClick={handleReset}></i>
        </JobList>
      )}
    </div>
  )
}

JobsFilter.propTypes = {
  list: PropTypes.array.isRequired,
  activeList: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default JobsFilter
