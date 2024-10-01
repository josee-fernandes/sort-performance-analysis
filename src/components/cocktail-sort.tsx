/* eslint-disable @typescript-eslint/no-explicit-any */
import { use, useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Martini } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cocktailSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface CocktailSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const CocktailSortCard: React.FC<CocktailSortCardProps> = ({
  data,
  sortBy,
}) => {
  const { nowSorting, updateNowSorting } = useSortingState()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🍸 Cocktail by', sortBy)

      try {
        setIsSorting(true)

        const startCocktailSort = performance.now()
        await new Promise((resolve) => resolve(cocktailSort(arr, sortBy)))
        const endCocktailSort = performance.now()
        const cocktailSortTimeSpend = endCocktailSort - startCocktailSort
        setTime(cocktailSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Cocktail sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'cocktail') {
      sortAndMeasureTime(data).then(() => updateNowSorting('insertion'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="Cocktail Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'cocktail'}
      error={error}
      icon={
        <Martini
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

CocktailSortCard.displayName = 'CocktailSortCard'
