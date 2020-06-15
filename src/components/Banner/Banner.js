import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

export const BannerContainer = styled.div`
  position: relative;
  background: white;
  width: 100%;
  height: 72px;
  display: grid;
  grid-template-columns: 15% 35% 35% 15%;
  grid-template-areas: '. m-town-name m-town-name m-filter';
  margin-bottom: 20px;

  label {
    text-align: center;
    grid-area: m-town-name;
    font-family: 'Helvetica';
    font-weight: 300;
    font-size: 34px;
    align-self: center;
    justify-self: center;
  }
`

const Banner = ({ isHome = false }) => {
  const { townName } = useSelector((state) => state.gnomesReducer)
  return (
    <BannerContainer>
      {!isHome && (
        <Link to={`/`}>
          <i className="fas fa-home"></i>
        </Link>
      )}
      <label>{`${townName} citizens`}</label>
    </BannerContainer>
  )
}

Banner.propTypes = {}

export default Banner
