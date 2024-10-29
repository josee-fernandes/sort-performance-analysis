/* eslint-disable @typescript-eslint/no-explicit-any */
const partition = (arr: any[], low: number, high: number, sortBy: SortBy) => {
  const pivot =
    sortBy === 'id'
      ? arr[high]?.id
      : sortBy === 'name'
        ? arr[high]?.name
        : arr[high]?.number // Ensure correct attribute for 'number'

  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    const current =
      sortBy === 'id'
        ? arr[j]?.id
        : sortBy === 'name'
          ? arr[j]?.name
          : arr[j]?.number

    // Use `<=` to ensure comparison and handle all attributes safely
    if (current !== undefined && current < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1
}

export const quickSort = (
  arr: any[],
  low: number,
  high: number,
  sortBy: SortBy,
) => {
  if (low < high) {
    const pi = partition(arr, low, high, sortBy)

    quickSort(arr, low, pi - 1, sortBy)
    quickSort(arr, pi + 1, high, sortBy)
  }

  return arr
}

export const iterativeQuickSort = (arr: any[], sortBy: SortBy) => {
  const stack = [{ low: 0, high: arr.length - 1 }]

  while (stack.length > 0) {
    const { low, high } = stack.pop()!
    if (low < high) {
      const pi = partition(arr, low, high, sortBy)

      stack.push({ low, high: pi - 1 })
      stack.push({ low: pi + 1, high })
    }
  }
  return arr
}

export const bubbleSort = (array: any[], sortBy: SortBy) => {
  const arr = Array.from(array) // avoid side effects
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      const current =
        sortBy === 'id' ? arr[j]?.id : sortBy === 'name' ? arr[j]?.name : arr[j]
      const next =
        sortBy === 'id'
          ? arr[j + 1]?.id
          : sortBy === 'name'
            ? arr[j + 1]?.name
            : arr[j + 1]

      if (current > next) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

export const cocktailSort = async (array: any[], sortBy: SortBy) => {
  const a = array.slice()
  let swapped = true
  let start = 0
  let end = a.length

  while (swapped === true) {
    swapped = false

    for (let i = start; i < end - 1; ++i) {
      const current =
        sortBy === 'id' ? a[i]?.id : sortBy === 'name' ? a[i]?.name : a[i]
      const next =
        sortBy === 'id'
          ? a[i + 1]?.id
          : sortBy === 'name'
            ? a[i + 1]?.name
            : a[i + 1]

      if (current > next) {
        const temp = a[i]
        a[i] = a[i + 1]
        a[i + 1] = temp
        swapped = true
      }
    }

    if (swapped === false) break

    swapped = false

    end = end - 1

    for (let i = end - 1; i >= start; i--) {
      const current =
        sortBy === 'id' ? a[i]?.id : sortBy === 'name' ? a[i]?.name : a[i]
      const next =
        sortBy === 'id'
          ? a[i + 1]?.id
          : sortBy === 'name'
            ? a[i + 1]?.name
            : a[i + 1]

      if (current > next) {
        const temp = a[i]
        a[i] = a[i + 1]
        a[i + 1] = temp
        swapped = true
      }
    }

    start = start + 1
  }

  return a
}

export const insertionSort = (arr: any[], sortBy: SortBy) => {
  for (let i = 1, l = arr.length; i < l; i++) {
    const pointer =
      sortBy === 'id' ? arr[i]?.id : sortBy === 'name' ? arr[i]?.name : arr[i]

    let j = 0

    for (j = i - 1; j >= 0; j--) {
      const current =
        sortBy === 'id' ? arr[j]?.id : sortBy === 'name' ? arr[j]?.name : arr[j]

      if (current <= pointer) break

      arr[j + 1] = arr[j]
    }

    arr[j + 1] = pointer
  }

  return arr
}

const merge = (left: any[], right: any[], sortBy: SortBy) => {
  const result = []
  let li = 0
  let ri = 0

  while (li < left.length || ri < right.length) {
    if (li < left.length && ri < right.length) {
      const currentLeft =
        sortBy === 'id'
          ? left[li]?.id
          : sortBy === 'name'
            ? left[li]?.name
            : left[li]
      const currentRight =
        sortBy === 'id'
          ? right[ri]?.id
          : sortBy === 'name'
            ? right[ri]?.name
            : right[ri]

      if (currentLeft <= currentRight) {
        result.push(left[li])
        li++
      } else {
        result.push(right[ri])
        ri++
      }
    } else if (li < left.length) {
      result.push(left[li])
      li++
    } else if (ri < right.length) {
      result.push(right[ri])
      ri++
    }
  }

  return result
}

export const mergeSort = (arr: any[], sortBy: SortBy): any[] => {
  if (arr.length <= 1) {
    return arr
  }

  const m = arr.length >> 1

  const left = arr.slice(0, m)
  const right = arr.slice(m)

  return merge(mergeSort(left, sortBy), mergeSort(right, sortBy), sortBy)
}

export const selectionSort = (arr: any[], sortBy: SortBy) => {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let minimumIndex = i

    const pointer =
      sortBy === 'id'
        ? arr[minimumIndex]?.id
        : sortBy === 'name'
          ? arr[minimumIndex]?.name
          : arr[minimumIndex]

    for (let j = i + 1; j < n; j++) {
      const current =
        sortBy === 'id' ? arr[j]?.id : sortBy === 'name' ? arr[j]?.name : arr[j]
      if (current < pointer) {
        minimumIndex = j
      }
    }

    if (minimumIndex !== i) {
      const temp = arr[i]
      arr[i] = arr[minimumIndex]
      arr[minimumIndex] = temp
    }
  }
}

const swap = (arr: any[], a: number, b: number) => {
  const t = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

const shiftDown = (arr: any[], start: number, end: number, sortBy: SortBy) => {
  let root = start
  let child
  let s

  while (root * 2 + 1 <= end) {
    child = root * 2 + 1
    s = root

    const current =
      sortBy === 'id' ? arr[s]?.id : sortBy === 'name' ? arr[s]?.name : arr[s]
    const currentChild =
      sortBy === 'id'
        ? arr[child]?.id
        : sortBy === 'name'
          ? arr[child]?.name
          : arr[child]
    const next =
      sortBy === 'id'
        ? arr[child + 1]?.id
        : sortBy === 'name'
          ? arr[child + 1]?.name
          : arr[child + 1]

    if (current < currentChild) {
      s = child
    }

    if (child + 1 <= end && current < next) {
      s = child + 1
    }

    if (s !== root) {
      swap(arr, root, s)
      root = s
    } else {
      return
    }
  }
}

const heapify = (arr: any[], sortBy: SortBy) => {
  for (let start = (arr.length >> 1) - 1; start >= 0; start--) {
    shiftDown(arr, start, arr.length - 1, sortBy)
  }
}

export const heapSort = (arr: any[], sortBy: SortBy) => {
  heapify(arr, sortBy)

  for (let end = arr.length - 1; end > 0; end--) {
    swap(arr, end, 0)
    shiftDown(arr, 0, end - 1, sortBy)
  }

  return arr
}

export const nativeSort = (arr: any[], sortBy: SortBy) => {
  return arr.sort((a, b) => {
    const currentA = sortBy === 'id' ? a?.id : sortBy === 'name' ? a?.name : a
    const currentB = sortBy === 'id' ? b?.id : sortBy === 'name' ? b?.name : b

    if (currentA < currentB) {
      return -1
    }

    if (currentA > currentB) {
      return 1
    }

    return 0
  })
}
