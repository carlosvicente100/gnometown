import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ItemList from '../Gnome/GnomeList'

const CardContainer = styled.div`
  background-color: #7f8fa6;
  font-family: 'Helvetica';
  color: black;
  border-radius: 25px;
  overflow: hidden;
  height: 100%;
  display: grid;
  column-gap: 10px;
  grid-template-areas:
    'image title title'
    'image properties jobs'
    'friends friends friends';
    '. . .';
  img {
    grid-area: image;
  }
  ul,
  h3 {
    margin: 2px;
  }
  h2 {
    height: auto;
    grid-area: title;
    font-size: 16px;
    text-transform: uppercase;
  }
  .gnome-professions {
    grid-area: jobs;
    font-size: 14px;
  }
  .gnome-friends {
    grid-area: friends;
    text-align:center;
    font-size: 14px;
    .ItemList{
      margin:0px;
    }

    // .friends-list{
    //     width:100%;
    //     //display: inline-flex;
    //     justify-content: space-between;
    //     a{
    //         text-decoration: none;
    //         margin: auto;
    
    //     }
    //     display: grid;
    //     row-gap: 20px;
    //     justify-content: center;
    //     @media (min-width: 688px) {
    //      // grid-template-columns: auto auto;
    //       //justify-content: space-evenly;
    //     }
    //     @media (min-width: 900px) {
    //     //  grid-template-columns: auto auto auto;
    //     }
    //     @media (min-width: 1201px) {
    //       justify-content: space-evenly;
    //       grid-template-columns: auto auto auto auto;
    //     }
    //     @media (min-width: 1501px) {
    //       grid-template-columns: auto auto auto auto auto;
    //     }
    // }
  }
  .properties {
    grid-area: properties;
    font-size: 14px;
    span{
      font-weight:bold;
    }
  }
  padding: 20px;
  margin: auto;
`

const CardImage = styled.img`
  height: 200px;
  margin: auto;
  width: 200px;
  border-radius: 25px;
`

const GnomeDetail = ({ name, age, thumbnail, height, weight, friends, professions, hair_color }) => {
  console.log('friends!!!!!!', friends)

  const HairContainer = styled.div`
    display: inline-flex;
    .dummy {
      margin: auto;
      margin-left: 5px;
      background-color: ${hair_color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid black;
    }
  `
  return (
    <CardContainer>
      <CardImage src={thumbnail}></CardImage>
      <h2>{name}</h2>
      <div className="properties">
        <p>
          <span>Age:</span>
          {`${age} years`}
        </p>
        <p>
          <span>Height:</span>
          {`${parseFloat(height).toFixed(2)} cm`}
        </p>
        <p>
          <span>Weight:</span>
          {` ${parseFloat(weight).toFixed(2)} kg`}
        </p>
        <HairContainer>
          <p>Hair Color: </p>
          <div className="dummy" />
        </HairContainer>
      </div>

      {professions.length > 0 && (
        <div className="gnome-professions">
          <h3>Professions</h3>
          <ul>
            {professions.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      )}
      {friends.length > 0 && (
        <div className="gnome-friends">
          <h3>Friends</h3>
          <ItemList items={friends}></ItemList>
        </div>
      )}
    </CardContainer>
  )
}
GnomeDetail.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  friends: PropTypes.array,
  professions: PropTypes.array
}

GnomeDetail.defaultProps = {}

export default GnomeDetail
