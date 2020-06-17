import { fetchSetJobList, fetchSetName, fetchResetFilters } from '../types'

export const initialState = {
  jobList: [],
  name: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchSetJobList:
      return {
        ...state,
        jobList: action.data.jobs
      }
    case fetchSetName:
      return {
        ...state,
        name: action.data.name
      }
    case fetchResetFilters:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}
