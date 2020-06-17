import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRequested, fetchPendingGnomes, fetchSucceededGnomes, fetchFailedGnomes } from '../../types'
import fetchDataFromUrl, { fetchData } from '../fetch'
//import { fetchDataGeneric } from '../../../utils'

import * as GenericFetch from '../../../utils/fetch'
// import * as GenericFetch from '../../../utils/fetch'

const values = {
  url: 'https://api.punkapi.com/v2/beers',
  fetchSucceeded: fetchSucceededGnomes,
  fetchPending: fetchPendingGnomes,
  fetchFailed: fetchFailedGnomes
}

import { runSaga } from 'redux-saga'

import gnomeList from '../../../fixtures/gnomes'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetch Test Suite', () => {
  describe('fetchDataFromUrl function', () => {
    const fetchDataFromUrlTest = fetchDataFromUrl(values)
    test('should call fetchData and finish', () => {
      //first
      expect(fetchDataFromUrlTest.next().value).toEqual(takeEvery(fetchRequested, fetchData))
      //second
      expect(fetchDataFromUrlTest.next().value).toEqual(undefined)
      expect(fetchDataFromUrlTest.next().done).toEqual(true)
    })
  })

  //reference from https://redux-saga.js.org/docs/advanced/Testing.html

  describe('fetchData function', () => {
    test('fetchData returns fetchSucceededGnomes', async () => {
      const mockFetchPromise = Promise.resolve({
        gnomeList
      })
      const fetchGenericMock = jest.spyOn(GenericFetch, 'fetchGeneric').mockImplementation(() => mockFetchPromise)

      const dispatched = []

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchData,
        values
      ).toPromise()

      expect(fetchGenericMock).toHaveBeenCalledTimes(1)
      expect(dispatched[0]).toEqual({
        type: fetchPendingGnomes
      })
      expect(dispatched[1]).toEqual({
        type: fetchSucceededGnomes,
        data: { gnomeList }
      })
    })

    test('fetchData returns fetchFailedGnomes', async () => {
      const fetchGenericMock = jest.spyOn(GenericFetch, 'fetchGeneric').mockImplementation(() => Promise.reject())

      const dispatched = []

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action)
        },
        fetchData,
        values
      ).toPromise()

      expect(fetchGenericMock).toHaveBeenCalledTimes(1)
      expect(dispatched[0]).toEqual({
        type: fetchPendingGnomes
      })
      expect(dispatched[1]).toEqual({
        type: fetchFailedGnomes
      })
    })
  })
})
