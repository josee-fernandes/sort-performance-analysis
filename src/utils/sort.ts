/* eslint-disable @typescript-eslint/no-explicit-any */
const partition = (arr: any[], low: number, high: number, sortBy: SortBy) => {
  const pivot =
    sortBy === 'id'
      ? arr[high]?.id
      : sortBy === 'name'
        ? arr[high]?.name
        : arr[high]
  let i = low - 1

  for (let j = low; j <= high - 1; j++) {
    const current =
      sortBy === 'id' ? arr[j]?.id : sortBy === 'name' ? arr[j]?.name : arr[j]

    if (current < pivot) {
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
  if (low >= high) return arr
  const pi = partition(arr, low, high, sortBy)

  quickSort(arr, low, pi - 1, sortBy)
  quickSort(arr, pi + 1, high, sortBy)

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
      if (a[i] > a[i + 1]) {
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

// function swap(ary, a, b) {
//   const t = ary[a]
//   ary[a] = ary[b]
//   ary[b] = t
// }

// // Built-in with comparison function (default sorting is "dictionary-style")
// function builtin_sort(ary) {
//   return ary.sort(function (a, b) {
//     return a - b
//   })
// }

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

// // Naive (but understandable) quicksort (memory hog)
// function naive_quicksort(ary) {
//   if (ary.length <= 1) {
//     return ary
//   }

//   let less = []
//   let greater = []
//   const pivot = ary.pop()

//   for (let i = 0; i < ary.length; i++) {
//     if (ary[i] < pivot) {
//       less.push(ary[i])
//     } else {
//       greater.push(ary[i])
//     }
//   }

//   less = naive_quicksort(less)
//   greater = naive_quicksort(greater)

//   return less.concat(pivot, greater)
// }

// // In place quicksort
// function inplace_quicksort_partition(ary, start, end, pivotIndex) {
//   let i = start
//   let j = end
//   const pivot = ary[pivotIndex]

//   while (true) {
//     while (ary[i] < pivot) {
//       i++
//     }
//     j--
//     while (pivot < ary[j]) {
//       j--
//     }
//     if (!(i < j)) {
//       return i
//     }
//     swap(ary, i, j)
//     i++
//   }
// }

// function inplace_quicksort(ary, start, end) {
//   if (start < end - 1) {
//     let pivotIndex = Math.round((start + end) / 2)

//     pivotIndex = inplace_quicksort_partition(ary, start, end, pivotIndex)

//     inplace_quicksort(ary, start, pivotIndex - 1)
//     inplace_quicksort(ary, pivotIndex + 1, end)
//   }

//   return ary
// }

// // Heap sort
// function heapSort(ary) {
//   heapify(ary)

//   for (let end = ary.length - 1; end > 0; end--) {
//     swap(ary, end, 0)
//     shiftDown(ary, 0, end - 1)
//   }

//   return ary
// }

// function heapify(ary) {
//   for (let start = (ary.length >> 1) - 1; start >= 0; start--) {
//     shiftDown(ary, start, ary.length - 1)
//   }
// }

// function shiftDown(ary, start, end) {
//   let root = start
//   let child
//   let s

//   s

//   while (root * 2 + 1 <= end) {
//     child = root * 2 + 1
//     s = root

//     if (ary[s] < ary[child]) {
//       s = child
//     }

//     if (child + 1 <= end && ary[s] < ary[child + 1]) {
//       s = child + 1
//     }

//     if (s !== root) {
//       swap(ary, root, s)
//       root = s
//     } else {
//       return
//     }
//   }
// }

// // Merge sort
// function merge_sort(ary) {
//   if (ary.length <= 1) {
//     return ary
//   }

//   const m = ary.length >> 1

//   const left = ary.slice(0, m)
//   const right = ary.slice(m)

//   return merge(merge_sort(left), merge_sort(right))
// }

// function merge(left, right) {
//   const result = []
//   let li = 0
//   let ri = 0

//   while (li < left.length || ri < right.length) {
//     if (li < left.length && ri < right.length) {
//       if (left[li] <= right[ri]) {
//         result.push(left[li])
//         li++
//       } else {
//         result.push(right[ri])
//         ri++
//       }
//     } else if (li < left.length) {
//       result.push(left[li])
//       li++
//     } else if (ri < right.length) {
//       result.push(right[ri])
//       ri++
//     }
//   }

//   return result
// }

// // Shell sort
// function shell_sort(ary) {
//   let inc = Math.round(ary.length / 2)
//   let i
//   let j
//   let t

//   while (inc > 0) {
//     for (i = inc; i < ary.length; i++) {
//       t = ary[i]
//       j = i
//       while (j >= inc && ary[j - inc] > t) {
//         ary[j] = ary[j - inc]
//         j -= inc
//       }
//       ary[j] = t
//     }
//     inc = Math.round(inc / 2.2)
//   }

//   return ary
// }
// // Comb Sort (Basically bubblesort with a small modification, but heaps faster)
// function comb_sort(ary) {
//   let gap = ary.length
//   while (true) {
//     gap = newgap(gap)
//     let swapped = false
//     for (let i = 0, l = ary.length; i < l; i++) {
//       const j = i + gap
//       if (ary[i] < ary[j]) {
//         swap(ary, i, j)
//         swapped = true
//       }
//     }
//     if (gap == 1 && !swapped) break
//   }
//   return ary
// }
// function newgap(gap) {
//   gap = ((gap * 10) / 13) | 0
//   if (gap == 9 || gap == 10) gap = 11
//   if (gap < 1) gap = 1
//   return gap
// }
// // faster quicksort using a stack to eliminate recursion, sorting inplace to reduce memory usage, and using insertion sort for small partition sizes
// function fast_quicksort(ary) {
//   const stack = []
//   let entry = [
//     0,
//     ary.length,
//     2 * Math.floor(Math.log(ary.length) / Math.log(2)),
//   ]
//   stack.push(entry)
//   while (stack.length > 0) {
//     entry = stack.pop()
//     const start = entry[0]
//     const end = entry[1]
//     let depth = entry[2]
//     if (depth == 0) {
//       ary = shell_sort_bound(ary, start, end)
//       continue
//     }
//     depth--
//     const pivot = Math.round((start + end) / 2)

//     const pivotNewIndex = inplace_quicksort_partition(ary, start, end, pivot)
//     if (end - pivotNewIndex > 16) {
//       entry = [pivotNewIndex, end, depth]
//       stack.push(entry)
//     }
//     if (pivotNewIndex - start > 16) {
//       entry = [start, pivotNewIndex, depth]
//       stack.push(entry)
//     }
//   }
//   ary = insertion_sort(ary)
//   return ary
// }
// function shell_sort_bound(ary, start, end) {
//   let inc = Math.round((start + end) / 2)
//   let i
//   let j
//   let t

//   while (inc >= start) {
//     for (i = inc; i < end; i++) {
//       t = ary[i]
//       j = i
//       while (j >= inc && ary[j - inc] > t) {
//         ary[j] = ary[j - inc]
//         j -= inc
//       }
//       ary[j] = t
//     }
//     inc = Math.round(inc / 2.2)
//   }

//   return ary
// }

// function mSort(list) {
//   if (list.length < 14) {
//     return insertion_sort(list)
//   }

//   const half = Math.floor(list.length / 2)
//   const a = mSort(list.slice(0, half))
//   const b = mSort(list.slice(half, list.length))
//   let aCount = 0
//   let bCount = 0
//   let returnList = []

//   while (true) {
//     if (a[aCount] <= b[bCount]) {
//       returnList.push(a[aCount])
//       aCount++
//       if (aCount === a.length) {
//         returnList = returnList.concat(b.slice(bCount, b.length))
//         break
//       }
//     } else {
//       returnList.push(b[bCount])
//       bCount++
//       if (bCount === b.length) {
//         returnList = returnList.concat(a.slice(aCount, a.length))
//         break
//       }
//     }
//   }
//   return returnList
// }

// function radixBucketSort(arr) {
//   let idx1, idx2, idx3, len1, len2, radix, radixKey
//   const radices = {}
//   let buckets = {}
//   let num
//   let curr
//   let currLen, radixStr, currBucket

//   len1 = arr.length
//   len2 = 10 // radix sort uses ten buckets

//   // find the relevant radices to process for efficiency
//   for (idx1 = 0; idx1 < len1; idx1++) {
//     radices[arr[idx1].toString().length] = 0
//   }

//   // loop for each radix. For each radix we put all the items
//   // in buckets, and then pull them out of the buckets.
//   for (radix in radices) {
//     // put each array item in a bucket based on its radix value
//     len1 = arr.length
//     for (idx1 = 0; idx1 < len1; idx1++) {
//       curr = arr[idx1]
//       // item length is used to find its current radix value
//       currLen = curr.toString().length
//       // only put the item in a radix bucket if the item
//       // key is as long as the radix
//       if (currLen >= radix) {
//         // radix starts from beginning of key, so need to
//         // adjust to get redix values from start of stringified key
//         radixKey = curr.toString()[currLen - radix]
//         // create the bucket if it does not already exist
//         if (!buckets.hasOwnProperty(radixKey)) {
//           buckets[radixKey] = []
//         }
//         // put the array value in the bucket
//         buckets[radixKey].push(curr)
//       } else {
//         if (!buckets.hasOwnProperty('0')) {
//           buckets['0'] = []
//         }
//         buckets['0'].push(curr)
//       }
//     }
//     // for current radix, items are in buckets, now put them
//     // back in the array based on their buckets
//     // this index moves us through the array as we insert items
//     idx1 = 0
//     // go through all the buckets
//     for (idx2 = 0; idx2 < len2; idx2++) {
//       // only process buckets with items
//       if (buckets[idx2] != null) {
//         currBucket = buckets[idx2]
//         // insert all bucket items into array
//         len1 = currBucket.length
//         for (idx3 = 0; idx3 < len1; idx3++) {
//           arr[idx1++] = currBucket[idx3]
//         }
//       }
//     }
//     buckets = {}
//   }
// }
