import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationContainer = styled.div`
  background-color: #2e8acc;
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const PaginationList = styled.ul`
  color: white;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  overflow: hidden;
  li {
    cursor: pointer;
    padding: 5px;
  }
  li:hover {
    background-color: #2980b9;
  }
  li.active {
    background-color: #2980b9;
  }
`
const PaginationButton = styled.button`
  background-color: #2980b9;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    color: black;
    background-color: #7f8c8d;
    cursor: not-allowed;
  }
`

const Pagination = ({ setCurrentPage, totalPagination, current }) => {
  const changePage = (event) => {
    if (event.target.value !== current) {
      setCurrentPage(event.target.value)
    }
  }
  const decreasePage = () => {
    setCurrentPage(current - 1)
  }
  const increasePage = () => {
    setCurrentPage(current + 1)
  }

  const makeList = totalPagination.map((number, index) => (
    <li key={index} className={`${current === index ? 'active' : ''} `} onClick={changePage} value={index}>
      {index + 1}
    </li>
  ))

  return (
    <PaginationContainer className="Pagination">
      <PaginationButton disabled={current !== 0 ? false : true} onClick={decreasePage}>{`<`}</PaginationButton>
      <PaginationList>{makeList}</PaginationList>
      <PaginationButton
        disabled={current !== totalPagination.length - 1 ? false : true}
        onClick={increasePage}
      >{`>`}</PaginationButton>
    </PaginationContainer>
  )
}
Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  totalPagination: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired
}

Pagination.defaultProps = {}

export default Pagination
