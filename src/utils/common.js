export const DEFAULT_VALUE = ''
export const JOBS = 'Jobs'

export const getJobsByUsers = (users) => {
  if (users.length > 0) {
    const profesionList = users
      .map((user) => user.professions)
      .reduce((firstArray, secondArray) => [...firstArray, ...secondArray], [])
    return profesionList.filter((job, index) => profesionList.indexOf(job) === index)
  } else {
    return []
  }
}

export const filterByJob = (jobs, gnomes) => {
  const gnomesWithJobs = gnomes.filter((user) => {
    if (jobs.every((job) => user.professions.includes(job))) {
      return user
    } else {
      return false
    }
  })
  return gnomesWithJobs
}

export const filterByName = (name, gnomes) => {
  const gnomesWithName = gnomes.filter((gnome) => gnome.name.toLowerCase().includes(name.toLowerCase()))
  return gnomesWithName
}
