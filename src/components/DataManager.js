import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Error = styled.div`
  margin-top: 50px;
  background-color: red;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-family: Helvetica;
    color: #ffffff;
    font-size: 15px;
  }
`
const DataManager = ({ children }) => {
  const { error, pending } = useSelector((state) => state.gnomesReducer)
  return (
    <>
      {pending && (
        <Loader>
          <img alt="loading" src="https://createwebsite.net/wp-content/uploads/2015/09/Display-Loading.gif" />
        </Loader>
      )}
      {!pending && error && (
        <Error>
          <label>We're having problems Searching Gnomes, try it in a few minutes</label>
        </Error>
      )}
      {!pending && !error && <>{children}</>}
    </>
  )
}

export default DataManager
