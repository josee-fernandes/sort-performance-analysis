/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Martini } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cocktailSort } from '@/utils/sort'

interface CocktailSortCardProps {
  data: any[]
  sortBy: 'numeric' | 'alphabetical' | 'id'
}

export const CocktailSortCard: React.FC<CocktailSortCardProps> = ({
  data,
  sortBy,
}) => {
  const [isSorting, setIsSorting] = useState(false)

  const [time, setTime] = useState(0)

  const sortAndMeasureTime = useCallback(
    (arr: any[]) => {
      console.log('by', sortBy)

      setIsSorting(true)

      const startCocktailSort = performance.now()
      cocktailSort(arr)
      const endCocktailSort = performance.now()
      const cocktailSortTimeSpend = endCocktailSort - startCocktailSort

      setIsSorting(false)

      return cocktailSortTimeSpend
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length) {
      setTime(sortAndMeasureTime(data))
    }
  }, [data, sortAndMeasureTime])

  return (
    <SortCard
      name="Cocktail Sort"
      time={time}
      count={data?.length}
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
