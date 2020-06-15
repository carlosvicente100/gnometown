import { fetchSetAgeFromTo, fetchSetJobList, fetchSetName, fetchResetFilters } from '../types'

export const initialState = {
  jobList: [],
  name: '',
  ageTo: {
    years: 0
  },
  ageFrom: {
    years: 0
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case fetchSetJobList:
      console.log(' +-+-+-+-+- action with jobs', action.data.jobs)
      return {
        ...state,
        jobList: action.data.jobs
      }
    case fetchSetName:
      console.log('filter by name', action.data.name)
      return {
        ...state,
        name: action.data.name
      }
    case fetchResetFilters:
      console.log('reset Filters')
      return {
        initialState
      }
    case fetchSetAgeFromTo:
      return {
        ...state,
        ageFrom: action.age.from,
        ageTo: action.age.to
      }
    default:
      return {
        ...state
      }
  }
}
