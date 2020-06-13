import { fetchSetAgeFromTo, fetchSetJobList } from '../types'

export const initialState = {
  jobList: [],
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
