/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Martini } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'

interface CocktailSortCardProps {
  sortBy: SortBy
  source: Source
}

export const CocktailSortCard: React.FC<CocktailSortCardProps> = ({
  sortBy,
  source,
}) => {
  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('🍸 Cocktail by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'cocktail',
        source,
      })

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Cocktail sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [sortBy, source])

  useEffect(() => {
    sortAndMeasureTime()
  }, [sortAndMeasureTime])

  return (
    <SortCard
      name="Cocktail Sort"
      time={time}
      count={SourceLength[source]}
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
