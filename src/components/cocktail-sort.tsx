/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Martini } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'

interface CocktailSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const CocktailSortCard: React.FC<CocktailSortCardProps> = ({
  data,
  sortBy,
}) => {
  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🍸 Cocktail by', sortBy)

      try {
        setIsSorting(true)

        const response = await appApi.post('/sort', {
          data: arr,
          sortBy,
          algorithm: 'cocktail',
        })

        setTime(response.data.result)
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
    if (data?.length) {
      sortAndMeasureTime(data)
    }
  }, [data, sortAndMeasureTime])

  return (
    <SortCard
      name="Cocktail Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={isSorting}
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
