import { getPhotos } from '@/services/placeholder-api'
import { bubbleSort, cocktailSort, quickSort } from '@/utils/sort'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'

const HomePage: NextPage = () => {
  const [quickSortTime, setQuickSortTime] = useState(0)
  const [bubbleSortTime, setBubbleSortTime] = useState(0)
  const [cocktailSortTime, setCocktailSortTime] = useState(0)

  const loadData = useCallback(async () => {
    try {
      const photos = await getPhotos()

      setQuickSortTime(measureQuickSort(photos))
      setBubbleSortTime(measureBubbleSort(photos))
      setCocktailSortTime(measureCocktailSort(photos))
    } catch (error) {
      console.error(error)
    }
  }, [])

  const measureQuickSort = (arr: Array<object>) => {
    const startQuickSort = performance.now()
    quickSort(arr, 0, arr.length - 1)
    const endQuickSort = performance.now()
    const quickSortTimeSpend = endQuickSort - startQuickSort
    return quickSortTimeSpend
    console.log({ quickSortTimeSpend: quickSortTimeSpend / 1000 })
  }

  const measureBubbleSort = (arr: Array<object>) => {
    const startBubbleSort = performance.now()
    bubbleSort(arr)
    const endBubbleSort = performance.now()
    const bubbleSortTimeSpend = endBubbleSort - startBubbleSort
    return bubbleSortTimeSpend
  }

  const measureCocktailSort = (arr: Array<object>) => {
    const startCocktailSort = performance.now()
    cocktailSort(arr)
    const endCocktailSort = performance.now()
    const cocktailSortTimeSpend = endCocktailSort - startCocktailSort
    return cocktailSortTimeSpend
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div>
      <div>
        <p>Quick Sort: {quickSortTime}ms</p>
        <p>Bubble Sort: {bubbleSortTime}ms</p>
        <p>Cocktail Sort: {cocktailSortTime}ms</p>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
