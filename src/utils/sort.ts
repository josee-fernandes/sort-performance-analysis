const partition = (arr: Array<object>, low: number, high: number) => {
  // @ts-expect-error array could have id and be objects instead of numbers
  const pivot = arr[high]?.id ?? arr[high]
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    // @ts-expect-error array could have id and be objects instead of numbers
    if (arr[j].id < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1
}

export const quickSort = (arr: Array<object>, low: number, high: number) => {
  if (low >= high) return arr
  const pi = partition(arr, low, high)

  quickSort(arr, low, pi - 1)
  quickSort(arr, pi + 1, high)

  return arr
}

export const bubbleSort = (array: Array<object>) => {
  const arr = Array.from(array) // avoid side effects
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      // @ts-expect-error array could have id and be objects instead of numbers
      if (arr[j].id > arr[j + 1].id) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

export const cocktailSort = (array: Array<object>) => {
  const a = array.slice()

  let swapped = true
  let start = 0
  let end = a.length

  while (swapped === true) {
    // reset the swapped flag on entering the
    // loop, because it might be true from a
    // previous iteration.
    swapped = false

    // loop from bottom to top same as
    // the bubble sort
    for (let i = start; i < end - 1; ++i) {
      if (a[i] > a[i + 1]) {
        const temp = a[i]
        a[i] = a[i + 1]
        a[i + 1] = temp
        swapped = true
      }
    }

    // if nothing moved, then array is sorted.
    if (swapped === false) break

    // otherwise, reset the swapped flag so that it
    // can be used in the next stage
    swapped = false

    // move the end point back by one, because
    // item at the end is in its rightful spot
    end = end - 1

    // from top to bottom, doing the
    // same comparison as in the previous stage
    for (let i = end - 1; i >= start; i--) {
      if (a[i] > a[i + 1]) {
        const temp = a[i]
        a[i] = a[i + 1]
        a[i + 1] = temp
        swapped = true
      }
    }

    // increase the starting point, because
    // the last stage would have moved the next
    // smallest number to its rightful spot.
    start = start + 1
  }

  return a
}
