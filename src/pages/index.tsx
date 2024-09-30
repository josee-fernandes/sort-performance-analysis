import { SortCard } from '@/components/sort-card'
import { ThemeToggle } from '@/components/theme-toggle'
import { getPhotos } from '@/services/placeholder-api'
import { bubbleSort, cocktailSort, quickSort } from '@/utils/sort'
import { Circle, Martini, Zap } from 'lucide-react'
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
    <div className="bg-background min-h-screen">
      <div className="border-b ">
        <div className="flex h-16 items-center px-8 justify-between space-y-2">
          <p className="text-xl font-bold tracking-tight">APS</p>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sorting</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SortCard
            name="Quick Sort"
            time={quickSortTime}
            icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          />
          <SortCard
            name="Bubble Sort"
            time={bubbleSortTime}
            icon={<Circle className="h-4 w-4 text-muted-foreground" />}
          />
          <SortCard
            name="Cocktail Sort"
            time={cocktailSortTime}
            icon={<Martini className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
