import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

const CardContainer = styled.div`
  font-family: Helvetica;
  background-color: #edeff6;
  color: black;
  border-radius: 25px;
  overflow: hidden;
  img {
    border: 1px solid black;
    grid-area: image;
  }
  ul,
  h3 {
    margin: 2px;
    text-align: left;
  }
  .name {
    grid-area: gnome-name;
    text-align: center;
    margin: auto;
  }
  .properties {
    display: block;
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
  .professions {
    display: block;
    grid-area: jobs;
    font-size: 14px;
  }
  .friends {
    display: block;
    grid-area: friends;
    font-size: 14px;
  }
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
  //margin: 20px;
  


  @media (max-width: 1201px) {
    font-size: 13px;
    width: 100%;
    height: 80px;
    grid-template-columns: auto 80px auto auto auto;
    grid-template-rows: auto;
    .name{
        font-size: 10px;
        margin-left: 5px;
        text-align: justify;
      }
    }
    .properties,
    .professions,
    .friends {
      display: none;
    }

    .properties-small{
      width: fit-content;
    text-align: center;
    }

    .properties-small,
    .professions-small,
    .friends-small {
      margin: auto 5px;
      display: inline-flex;
      i{
        margin: 0px 10px;
      }
    }
    grid-template-areas: 'image gnome-name properties jobs friends';
    display: inline-grid;
    img {
      width: 40px;
      height: 40px;
      margin-left: 5px;
    }
  }
  @media (min-width: 1201px) {
    .properties-small,
    .professions-small,
    .friends-small {
      margin: auto;
      display: none;
    }

    img {
      margin: auto;
      width: 90px;
      height: 90px;
    }

    .name {
      font-size: 14px;
    }
    .professions, .friends, .properties {
      display: block;
      ul{

        list-style: none;
      }
    }
    
    grid-template-areas:
      '. image .'
      '. gnome-name .'
      '. properties .'
      '. jobs .'
      '. friends .';
  }
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
        return <li key={index}>and more...</li>
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
        <div className="properties-small">
          <div className="age">
            <i className="fas fa-birthday-cake"></i>
            <span>{` ${age} `}</span>
          </div>
          <div className="height">
            <i className="fas fa-arrows-alt-v"></i>
            <span>{`${parseFloat(height).toFixed(2)}`}</span>
          </div>
          <div className="weight">
            <i className="fas fa-weight-hanging"></i>
            <span>{` ${parseFloat(weight).toFixed(2)} `}</span>
          </div>
        </div>
        <div className="professions">
          <h3>Professions</h3>
          {professions.length > 0 ? <ul>{ReduceList(professions)}</ul> : <span>¯\_(ツ)_/¯</span>}
        </div>
        <div className="professions-small">
          <i className="fas fa-hammer"></i>
          <span>{professions.length > 0 ? professions.length : 0} </span>
        </div>
        <div className="friends">
          <h3>Friends</h3>
          {friends.length > 0 ? <ul>{ReduceList(friends)}</ul> : <span>¯\_(ツ)_/¯</span>}
        </div>
        <div className="friends-small">
          <i className="fas fa-users"></i>
          <span>{friends.length > 0 ? friends.length : 0} </span>
        </div>
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
