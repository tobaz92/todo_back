function reorder(originalArray, newElement) {
  const newArray = [...originalArray]

  const existingIndex = newArray.findIndex(
    (item) => item._id === newElement._id
  )

  if (existingIndex !== -1) {
    newArray.splice(existingIndex, 1)
  }

  newArray.splice(newElement.order, 0, newElement)

  newArray.forEach((item, index) => {
    item.order = index
  })

  return newArray
}

module.exports = reorder
