import { getJobsByUsers, filterByJob, filterByName } from '../common'

import gnomeList from '../../fixtures/gnomes'

const jobList = [
  'Metalworker',
  'Woodcarver',
  'Stonecarver',
  ' Tinker',
  'Tailor',
  'Potter',
  'Brewer',
  'Medic',
  'Prospector',
  'Gemcutter',
  'Mason',
  'Cook',
  'Baker',
  'Miner',
  'Carpenter',
  'Farmer',
  'Tax inspector'
]

describe('Common Functions Test', () => {
  describe('getJobsByUsers function', () => {
    test('Should return all the jobs on the gnome list provided', () => {
      expect(getJobsByUsers(gnomeList[0]['Brastlewark'])).toEqual(jobList)
    })
  })
  describe('filterByJob function', () => {
    test('Should find all the gnomes with provided jobs - 2 jobs filter 1 matches ', () => {
      expect(filterByJob([jobList[0], jobList[1]], gnomeList[0]['Brastlewark'])).toEqual([
        gnomeList[0]['Brastlewark'][0]
      ])
    })

    test('Should find multiple gnomes with provided job - 1 jobs filter 2 matches ', () => {
      expect(filterByJob([jobList[2]], gnomeList[0]['Brastlewark'])).toEqual([
        gnomeList[0]['Brastlewark'][0],
        gnomeList[0]['Brastlewark'][3]
      ])
    })

    test('Should not find gnomes with provided job list - 7 jobs filter 0 matches ', () => {
      expect(filterByJob(jobList, gnomeList[0]['Brastlewark'])).toEqual([])
    })
  })
  describe('filterByName function', () => {
    test('Should  find multiple gnomes with provided name - return 3 matches', () => {
      expect(filterByName('er', gnomeList[0]['Brastlewark'])).toEqual([
        gnomeList[0]['Brastlewark'][1],
        gnomeList[0]['Brastlewark'][2],
        gnomeList[0]['Brastlewark'][3]
      ])
    })

    test('Should find a gnome with provided name - return 1 matches', () => {
      expect(filterByName('Tobus', gnomeList[0]['Brastlewark'])).toEqual([gnomeList[0]['Brastlewark'][0]])
    })
    test('Should not find gnomes with provided name - return 0 matches', () => {
      expect(filterByName('Chuck Norris', gnomeList[0]['Brastlewark'])).toEqual([])
    })
  })
})
