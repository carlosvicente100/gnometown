export const DEFAULT_VALUE = ''

export const makePagination = (itemsFiltered) => {
  return itemsFiltered.reduce((result, value, index) => {
    //if (index % 5 !== 0) {
    if (index % 40 !== 0) {
      result[result.length - 1].push(value)
    } else {
      result.push([value])
    }
    return result
  }, [])
}
