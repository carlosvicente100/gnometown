import fetch from 'cross-fetch'

export function fetchGeneric(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        throw response.error
      }
      return response
    })
    .catch((error) => {
      return { error: true }
    })
}
