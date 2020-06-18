import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const GnomePaginationContainer = styled.button`
  margin: 0;
  border: 0;
  width: 100%;
  background-color: #f8f8f8;
  height: 60px;
  cursor: pointer;
  padding: 10px 30px 10px 10px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e3e3e3;
  align-items: center;
  &:hover {
    background-color: #f6e58d;
  }
  label {
    font-family: Helvetica;
    color: #707070;
    font-size: 16px;
  }
`

const GnomePagination = ({ text, onClick }) => {
  const onClickContainer = () => {
    onClick()
  }
  return (
    <GnomePaginationContainer onClick={onClickContainer}>
      <label data-testid="more-gnomes">{text}</label>
    </GnomePaginationContainer>
  )
}

GnomePagination.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

GnomePagination.defaultProps = {
  text: 'Load more gnomes',
  onClick: () => {}
}

export default GnomePagination
