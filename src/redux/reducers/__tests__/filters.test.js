import filtersReducer from '../filters'
import { fetchSetJobList, fetchSetName, fetchResetFilters } from './../../types'

describe('filters reducer', () => {
  test('should return the initial state', () => {
    expect(filtersReducer(undefined, {})).toEqual({ jobList: [], name: '' })
  })
  test('should return job list updated', () => {
    const newJobList = ['Metalworker', 'Woodcarver']
    expect(
      filtersReducer(undefined, {
        type: fetchSetJobList,
        data: {
          jobs: newJobList
        }
      })
    ).toEqual({ jobList: newJobList, name: '' })
  })

  test('should return user name  updated', () => {
    const dummyName = 'Tobus'
    expect(
      filtersReducer(undefined, {
        type: fetchSetName,
        data: {
          name: dummyName
        }
      })
    ).toEqual({ jobList: [], name: dummyName })
  })
  test('should return the state  with default value ', () => {
    expect(
      filtersReducer(undefined, {
        type: fetchResetFilters,
        data: {}
      })
    ).toEqual({ jobList: [], name: '' })
  })
})
