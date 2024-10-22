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

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    if (request.method === 'POST') {
      const { data, sortBy, algorithm } = request.body

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
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}

export default handler
