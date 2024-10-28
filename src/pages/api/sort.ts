import { NextApiRequest, NextApiResponse } from 'next'

import {
  bubbleSort,
  cocktailSort,
  heapSort,
  insertionSort,
  mergeSort,
  nativeSort,
  quickSort,
  selectionSort,
} from '@/utils/sort'
import { shuffle } from '@/utils/array'

import sample from '@/services/sample.json'
import { getPhotos } from '@/services/placeholder-api'

const numbers = shuffle(Array.from({ length: 20000 }, (_, i) => i))
const shuffledSample = shuffle(sample as Sample)

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    if (request.method === 'POST') {
      const { sortBy, algorithm, source } = request.body

      let data = []

      if (source === 'placeholderApi') {
        data = await getPhotos()
      } else if (source === 'sample') {
        data = shuffledSample
      } else {
        data = numbers
      }

      let result = 0

      switch (algorithm) {
        case 'bubble':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(bubbleSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'cocktail':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(cocktailSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'heap':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(heapSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'insertion':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(insertionSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'merge':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(mergeSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'native':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(nativeSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        case 'quick':
          {
            const start = performance.now()
            await new Promise((resolve) =>
              resolve(quickSort(data, 0, data.length - 1, sortBy)),
            )
            const end = performance.now()
            result = end - start
          }
          break
        case 'selection':
          {
            const start = performance.now()
            await new Promise((resolve) => resolve(selectionSort(data, sortBy)))
            const end = performance.now()
            result = end - start
          }
          break
        default:
          result = 0
      }

      response.status(200).json({ result })
    }

    response.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    response.status(500).json({ error })
  }
}

export const config = {
  maxDuration: 20,
}

export default handler
