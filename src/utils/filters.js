export const getJobsByUsers = (users) => {
  //   console.log('getJobsByUsers', users)
  if (users.length > 0) {
    const profesionList = users
      .map((user) => user.professions)
      .reduce((firstArray, secondArray) => [...firstArray, ...secondArray], [])
    return profesionList.filter((job, index) => profesionList.indexOf(job) === index)
  } else {
    return []
  }
}

export const DEFAULT_VALUE = ''
export const JOBS = 'Jobs'

export const makePagination = (itemsFiltered) => {
  return itemsFiltered.reduce((result, value, index) => {
    if (index % 40 !== 0) {
      result[result.length - 1].push(value)
    } else {
      result.push([value])
    }
    return result
  }, [])
}

export const filterByJob = (jobs, users) => {
  let gnomesWithJobs = users.filter((user) => {
    if (jobs.every((job) => user.professions.includes(job))) {
      return user
    } else {
      return false
    }
  })
  return gnomesWithJobs
}
