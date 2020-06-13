import { fetchPendingGnomes, fetchSucceededGnomes, fetchFailedGnomes } from '../types'

export const initialState = {
  pending: false,
  error: null,
  townName: '',
  gnomes: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchPendingGnomes:
      return {
        ...state,
        pending: true
      }
    case fetchSucceededGnomes:
      const townName = Object.keys(action.data)[0]
      return {
        ...state,
        pending: false,
        townName,
        gnomes: action.data[townName]
      }
    case fetchFailedGnomes:
      return {
        ...state,
        pending: false,
        error: true
      }
    default:
      return {
        ...state
      }
  }
}
