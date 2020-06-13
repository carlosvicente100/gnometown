import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

const CardContainer = styled.div`
  font-family: Helvetica;
  background-color: #706fd3;
  color: black;
  border-radius: 25px;
  overflow: hidden;
  height: 200px;
  img {
    grid-area: image;
  }
  ul,
  h3 {
    margin: 2px;
    text-align: left;
  }
  h2.name {
    height: auto;
    grid-area: gnome-name;
    font-size: 14px;
    margin: auto;
  }
  .properties {
    grid-area: properties;
    font-size: 14px;
    text-align: left;
    span {
      font-weight: bold;
    }
    p {
      margin: auto;
    }
  }
  .gnome-professions {
    grid-area: jobs;
    font-size: 14px;
  }
  .gnome-friends {
    grid-area: friends;
    font-size: 14px;
  }
  padding: 20px;
  display: grid;
  height: 400px;
  grid-template-areas:
    '. image .'
    '. gnome-name .'
    '. properties .'
    '. jobs .'
    '. friends .';
  width: 230px;
  margin: auto;
`

const CardImage = styled.img`
  height: 90px;
  margin: auto;
  width: 90px;
  border-radius: 100px;
`

const Card = ({ name, age, thumbnail, height, weight, friends, professions, id }) => {
  const ReduceList = (list, maxElements = 3) => {
    const newList = list.map((element, index) => {
      if (index < maxElements) {
        return <li key={index}>{element}</li>
      } else if (index === maxElements) {
        return <li key={index}>...</li>
      }
    })
    return newList
  }

  return (
    <Link to={`/profile/${id}`}>
      <CardContainer>
        <CardImage src={thumbnail}></CardImage>
        <h2 className="name">{name}</h2>
        <div className="properties">
          <p>
            <span>Age:</span>
            {` ${age} years`}
          </p>
          <p>
            <span>Height:</span>
            {`${parseFloat(height).toFixed(2)} cm`}
          </p>
          <p>
            <span>Weight:</span>
            {` ${parseFloat(weight).toFixed(2)} kg`}
          </p>
        </div>
        {professions.length > 0 && (
          <div className="gnome-professions">
            <h3>Professions</h3>
            <ul>{ReduceList(professions)}</ul>
          </div>
        )}
        {friends.length > 0 && (
          <div className="gnome-friends">
            <h3>Friends</h3>
            <ul>{ReduceList(friends)}</ul>
          </div>
        )}
      </CardContainer>
    </Link>
  )
}
Card.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  friends: PropTypes.array,
  professions: PropTypes.array
}

Card.defaultProps = {}

export default Card
