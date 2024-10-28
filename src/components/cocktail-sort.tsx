/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Martini } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface CocktailSortCardProps {
  sortBy: SortBy
  source: Source
}

export const CocktailSortCard: React.FC<CocktailSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiCocktailTime,
    setSampleCocktailTime,
    setNumbersCocktailTime,
  } = useChartData()

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

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiCocktailTime(response.data.result)
          break
        case 'sample':
          setSampleCocktailTime(response.data.result)
          break
        case 'numbers':
          setNumbersCocktailTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Cocktail sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersCocktailTime,
    setPlaceholderApiCocktailTime,
    setSampleCocktailTime,
    sortBy,
    source,
  ])

  useEffect(() => {
    if (time === 0) {
      sortAndMeasureTime()
    }
  }, [sortAndMeasureTime, time])

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
