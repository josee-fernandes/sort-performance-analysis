import { SortCard } from '@/components/sort-card'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { getPhotos } from '@/services/placeholder-api'
import { bubbleSort, cocktailSort, quickSort } from '@/utils/sort'
import { useQuery } from '@tanstack/react-query'
import { Circle, Martini, Zap } from 'lucide-react'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'

const HomePage: NextPage = () => {
  const [isQuickSorting, setIsQuickSorting] = useState(false)
  const [isBubbleSorting, setIsBubbleSorting] = useState(false)
  const [isCocktailSorting, setIsCocktailSorting] = useState(false)

  const [quickSortTime, setQuickSortTime] = useState(0)
  const [bubbleSortTime, setBubbleSortTime] = useState(0)
  const [cocktailSortTime, setCocktailSortTime] = useState(0)

  const {
    data: photos,
    isLoading: isLoadingPhotos,
    error: photosError,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: () => getPhotos(),
    staleTime: Infinity,
  })

  const measureQuickSort = (arr: Array<object>) => {
    setIsQuickSorting(true)

    console.log('non sorted', arr.slice(0, 50))

    const startQuickSort = performance.now()
    quickSort(arr, 0, arr.length - 1)
    const endQuickSort = performance.now()
    const quickSortTimeSpend = endQuickSort - startQuickSort

    setIsQuickSorting(false)

    return quickSortTimeSpend
  }

  const measureBubbleSort = (arr: Array<object>) => {
    setIsBubbleSorting(true)

    const startBubbleSort = performance.now()
    bubbleSort(arr)
    const endBubbleSort = performance.now()
    const bubbleSortTimeSpend = endBubbleSort - startBubbleSort

    setIsBubbleSorting(false)

    return bubbleSortTimeSpend
  }

  const measureCocktailSort = (arr: Array<object>) => {
    setIsCocktailSorting(true)

    const startCocktailSort = performance.now()
    cocktailSort(arr)
    const endCocktailSort = performance.now()
    const cocktailSortTimeSpend = endCocktailSort - startCocktailSort

    setIsCocktailSorting(false)

    return cocktailSortTimeSpend
  }

  useEffect(() => {
    if (photos?.length) {
      console.log(photos.length)
      setQuickSortTime(measureQuickSort(photos))
      setBubbleSortTime(measureBubbleSort(photos))
      setCocktailSortTime(measureCocktailSort(photos))
    }
  }, [photos])

  if (photosError) return <div>Error loading photos</div>

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
            icon={
              <Zap
                className={cn(
                  'h-4 w-4 text-muted-foreground',
                  isQuickSorting && 'animate-spin',
                )}
              />
            }
          />
          <SortCard
            name="Bubble Sort"
            time={bubbleSortTime}
            icon={
              <Circle
                className={cn(
                  'h-4 w-4 text-muted-foreground',
                  isBubbleSorting && 'animate-spin',
                )}
              />
            }
          />
          <SortCard
            name="Cocktail Sort"
            time={cocktailSortTime}
            icon={
              <Martini
                className={cn(
                  'h-4 w-4 text-muted-foreground',
                  isCocktailSorting && 'animate-spin',
                )}
              />
            }
          />
        </div>
        {isLoadingPhotos && <div>Loading photos...</div>}
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
