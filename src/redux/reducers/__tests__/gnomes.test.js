import gnomesReducer from '../gnomes'
import {
  fetchRequested,
  fetchRequestedGnomes,
  fetchPendingGnomes,
  fetchSucceededGnomes,
  fetchFailedGnomes
} from './../../types'

import GnomeFixtureList from '../../../fixtures/gnomes'

const initialState = {
  pending: false,
  error: null,
  townName: '',
  gnomes: []
}

describe('gnomes reducer', () => {
  test('should return the initial state', () => {
    expect(gnomesReducer(undefined, {})).toEqual(initialState)
  })
  test('should return status pending ', () => {
    expect(
      gnomesReducer(undefined, {
        type: fetchPendingGnomes
      })
    ).toEqual({ ...initialState, pending: true })
  })

  test('should return city name and Gnomes List', () => {
    const cityName = Object.keys(GnomeFixtureList[0])[0]
    expect(
      gnomesReducer(undefined, {
        type: fetchSucceededGnomes,
        data: GnomeFixtureList[0]
      })
    ).toEqual({
      ...initialState,
      townName: cityName,
      gnomes: GnomeFixtureList[0]['Brastlewark']
    })
  })
  test('should return error trying to get Gnomes List ', () => {
    expect(
      gnomesReducer(undefined, {
        type: fetchFailedGnomes,
        data: {}
      })
    ).toEqual({ ...initialState, pending: false, error: true })
  })
})
