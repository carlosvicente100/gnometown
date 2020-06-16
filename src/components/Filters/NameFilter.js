import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputName = styled.input`
  width: -webkit-fill-available;
  height: 40px;
  font-size: 28px;
  margin: 20px;
`

const NameFilter = ({ onChange, current }) => {
  const handleChange = (event) => {
    event.preventDefault()
    onChange(event.target.value)
  }
  return (
    <div>
      <InputName
        data-testid="filter-name-input"
        type="text"
        onChange={handleChange}
        value={current}
        placeholder="Gnome Name"
      />
    </div>
  )
}

NameFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired
}

export default NameFilter
